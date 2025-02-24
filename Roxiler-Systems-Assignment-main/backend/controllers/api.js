const axios = require("axios");
const Transaction = require("../models/transaction");

// Function to initialize the database
const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;
    await Transaction.insertMany(transactions);
    res.json({ message: "Database initialized successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to list all transactions with search and pagination matching whole words
const listTransactions = async (req, res) => {
  try {
    let {
      month = "March",
      search = "",
      page = 1,
      perPage = 10,
      sortField = "dateOfSale",
      sortDirection = "asc",
    } = req.query;
    month = month || "March";
    const monthNumber = new Date(Date.parse(`${month} 1, 2000`)).getMonth() + 1;
    // Validating the month parameter
    if (!(monthNumber >= 1 && monthNumber <= 12)) {
      return res.status(400).json({
        error: "Invalid month parameter. Please provide a valid month.",
      });
    }

    // Validating pagination parameters
    if (page < 1 || perPage < 1) {
      return res.status(400).json({
        error: "Invalid pagination parameters. Please provide valid values.",
      });
    }

    const isNumericSearch = /^[0-9.]+$/.test(search);

    const filter = {
      $expr: {
        $eq: [
          {
            $month: {
              $dateFromString: {
                dateString: { $toString: "$dateOfSale" },
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
              },
            },
          },
          monthNumber,
        ],
      },
      ...(search !== "" && {
        $or: [
          ...(isNumericSearch
            ? [{ price: parseFloat(search) }]
            : [
                { title: { $regex: new RegExp(`\\b${search}\\b`, "i") } },
                { description: { $regex: new RegExp(`\\b${search}\\b`, "i") } },
              ]),
        ],
      }),
    };

    // Counting total documents for pagination details
    const totalCount = await Transaction.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / perPage);

    // Sort options
    const sortOptions = {};
    sortOptions[sortField] = sortDirection === "asc" ? 1 : -1;

    const transactions = await Transaction.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.json({
      transactions,
      totalCount,
      totalPages,
      currentPage: page,
      sortField,
      sortDirection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function for statistics
const statistics = async (req, res) => {
  try {
    let { month } = req.query;
    month = month || "March";

    // Assuming month is a string like 'March'
    const monthNumber = new Date(Date.parse(`${month} 1, 2000`)).getMonth() + 1;

    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              {
                $month: {
                  $dateFromString: {
                    dateString: { $toString: "$dateOfSale" },
                    format: "%Y-%m-%dT%H:%M:%S.%LZ",
                  },
                },
              },
              monthNumber,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      $expr: {
        $eq: [
          {
            $month: {
              $dateFromString: {
                dateString: { $toString: "$dateOfSale" },
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
              },
            },
          },
          monthNumber,
        ],
      },
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      $expr: {
        $eq: [
          {
            $month: {
              $dateFromString: {
                dateString: { $toString: "$dateOfSale" },
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
              },
            },
          },
          monthNumber,
        ],
      },
      price: { $exists: false },
    });

    res.json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function for bar chart
const barChart = async (req, res) => {
  try {
    let { month } = req.query;
    month = month || "March";

    // Validating the month parameter
    const monthNumber = new Date(Date.parse(`${month} 1, 2000`)).getMonth() + 1;
    if (!(monthNumber >= 1 && monthNumber <= 12)) {
      return res.status(400).json({
        error: "Invalid month parameter. Please provide a valid month.",
      });
    }

    // Defining price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }, // For items with a price above 900
    ];

    // Creating an array to store the count for each price range
    const priceRangeCounts = new Array(priceRanges.length).fill(0);

    // Total using Aggregate and count items in each price range
    const aggregationResult = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              {
                $month: {
                  $dateFromString: {
                    dateString: { $toString: "$dateOfSale" },
                    format: "%Y-%m-%dT%H:%M:%S.%LZ",
                  },
                },
              },
              monthNumber,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          prices: { $push: "$price" },
        },
      },
    ]);

    // Extracting prices from aggregation result
    const prices =
      aggregationResult.length > 0 ? aggregationResult[0].prices : [];

    // Counting items in each price range
    prices.forEach((price) => {
      for (let i = 0; i < priceRanges.length; i++) {
        if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
          priceRangeCounts[i]++;
          break;
        }
      }
    });

    // Preparing the response
    const response = priceRanges.map((range, index) => ({
      range: `${range.min} - ${range.max === Infinity ? "above" : range.max}`,
      count: priceRangeCounts[index],
    }));

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function for pie chart
const pieChart = async (req, res) => {
  try {
    const { month } = req.query;

    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, "i") },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({ pieChartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function for combined response
const combinedResponse = async (req, res) => {
  try {
    const { month } = req.query;

    // Fetching data from all the APIs
    const transactions = await listTransactions(req);
    const stats = await statistics(req);
    const barChartData = await barChart(req);
    const pieChartData = await pieChart(req);

    res.json({
      transactions,
      statistics: stats,
      barChartData,
      pieChartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  initializeDatabase,
  listTransactions,
  statistics,
  barChart,
  pieChart,
  combinedResponse,
};
