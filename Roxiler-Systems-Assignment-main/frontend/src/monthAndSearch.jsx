import React from "react";

const MonthAndSearch = ({
  selectedMonth,
  onSearchChange,
  value,
  onMonthChange,
  onClear,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="flex justify-between m-5">
      {/* Search Box */}
      <div className="bg-[#f8df8c] font-semibold rounded-xl">
        <input
          className=" bg-[#f8df8c] rounded-xl p-3 focus:outline-none"
          type="text"
          value={value}
          onChange={onSearchChange}
          placeholder="Search transactions..."
        />
        <button className=" bg-red-500 rounded-xl p-3" onClick={onClear}>
          Clear
        </button>
      </div>

      {/* Month Changer */}
      <div className="container max-w-max bg-[#ebb840] rounded-xl px-2">
        <select
          className="bg-[#ebb840] font-semibold rounded-xl p-3 focus:outline-none"
          value={selectedMonth}
          onChange={onMonthChange}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthAndSearch;
