import React from "react";

const PerPage = ({ selectedPerPage, onChange }) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30];
  console.log(selectedPerPage);

  return (
    <div>
      Per Page:
      <select value={selectedPerPage} onChange={onChange}>
        {pages.map((page, index) => (
          <option key={index} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PerPage;
