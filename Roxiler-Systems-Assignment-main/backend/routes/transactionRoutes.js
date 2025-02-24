const router = require("express").Router();
const {
  initializeDatabase,
  listTransactions,
  statistics,
  barChart,
  pieChart,
  combinedResponse,
} = require("../controllers/api");

router.get("/api/initDatabase", initializeDatabase);
router.get("/api/transactions", listTransactions);
router.get("/api/statistics", statistics);
router.get("/api/barChart", barChart);
router.get("/api/pieChart", pieChart);
router.get("/api/combinedResponse", combinedResponse);

module.exports = router;
