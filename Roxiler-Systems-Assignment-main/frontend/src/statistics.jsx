// Statistics.jsx
import React, { useEffect, useState } from "react";

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          `https://roxiler-assignment-backend.vercel.app/api/statistics?month=${selectedMonth}`
        );
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div className="pb-5">
      <div className=" font-bold text-black text-4xl text-center m-5">
        Statistics - {selectedMonth}
      </div>
      <div className="flex justify-center m-5">
        <div className=" container max-w-max p-4 bg-[#f8df8c] rounded-xl">
          <div className="flex flex-row flex-wrap gap-5">
            <div>
              <h3 className=" font-bold">Total Sale Amount</h3>
              <h3 className=" font-bold">Total Sold Items</h3>
              <h3 className=" font-bold">Total Not Sold Items</h3>
            </div>
            <div>
              <h3 className=" font-bold">{statistics.totalSaleAmount}</h3>
              <h3 className=" font-bold">{statistics.totalSoldItems}</h3>
              <h3 className=" font-bold">{statistics.totalNotSoldItems}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
