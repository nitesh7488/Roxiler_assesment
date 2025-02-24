import React from "react";
import "./App.css";
import PerPage from "./perPage";

const TransactionTable = ({
  transactions,
  onNextPage,
  onPrevPage,
  page,
  selectedPerPage,
  onChange,
}) => {
  return (
    <div className="m-5">
      <div class=" overflow-x-auto flex flex-col container max-w-max bg-[#f8df8c] rounded-xl my-10">
        <div class=" sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center">
                <thead class="border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      Sold
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr className="border-b" key={index}>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {transaction._id}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-normal">
                        {transaction.title}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-normal">
                        {transaction.description}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {transaction.price}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        NA
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        YES
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        Not Available
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination buttons */}
      <div className="flex flex-row justify-between font-bold mx-5 my-10">
        <div>Page No: {page}</div>
        <div className="space-x-3">
          <button onClick={onPrevPage}>Previous</button>
          <span>-</span>
          <button onClick={onNextPage}>Next</button>
        </div>
        <div>
          <PerPage selectedPerPage={selectedPerPage} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
