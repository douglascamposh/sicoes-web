import React, { useState } from "react";
import Filter from "./filterTable";
import FirstPageSharpIcon from "@mui/icons-material/FirstPageSharp";
import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import LastPageSharpIcon from "@mui/icons-material/LastPageSharp";
import Title from "./common/title";
import DescriptionContent from "./common/description";
import { getRowStyle } from "@/app/functions/utilities";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel
} from "@tanstack/react-table";

const Table = ({ 
  data, 
  columns, 
  handleNextPage, 
  handlePrevPage, 
  handleFirstPage,
  handleLastPage, 
  page, 
  totalPages, 
  totalElements, 
  handleAnyPage,
  handleAuction,
  currentFilter,
}) => {

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto max-w-full bg-gray-100 mt-2">
      <div className="p-4 ">
        <div className="h-4" />
        <table className="w-full bg-white border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-blue-800 text-white font-semibold border-b border-gray-300"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-2 py-2 text-left hover:bg-blue-700 cursor-pointer select-none border-r border-gray-300"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : <Title>
                        <h1 className="text-white">{flexRender(header.column.columnDef.header, header.getContext())}</h1>
                      </Title>}
                    {header.column.getCanFilter() && header.column.id === "auction" ? (
                      <div>
                        <Filter 
                          column={header.column}
                          handleAuction={handleAuction}
                          currentFilter={currentFilter}
                        />
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`group hover:bg-blue-200 transition-colors duration-200 ${getRowStyle(row.original.presentationDate)}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-xs text-gray-700 border-r border-gray-200"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-10" />
        <div className="flex items-center justify-between md:mr-5">
          <div className="flex items-center gap-2">
            <button
              className="bg-blue-700 text-white px-1 py-1 rounded hover:bg-blue-600 text-xs"
              onClick={handleFirstPage}
            >
              <FirstPageSharpIcon />
            </button>
            <button
              className="bg-blue-700 text-white px-1 py-1 rounded hover:bg-blue-600 text-xs"
              disabled={page === 0}
              onClick={handlePrevPage}
            >
              <NavigateBeforeSharpIcon />
            </button>
            <button
              className="bg-blue-700 text-white px-1 py-1 rounded hover:bg-blue-600 text-xs"
              disabled={page === (totalPages - 1)}
              onClick={handleNextPage}

            >
              <NavigateNextSharpIcon />
            </button>
            <button
              className="bg-blue-700 text-white px-1 py-1 rounded hover:bg-blue-600 text-xs"
              onClick={() => handleLastPage(totalPages - 1)}
            >
              <LastPageSharpIcon />
            </button>
          </div>
          <div className="flex items-center gap-1 md:ml-3">
            <span className="text-gray-700 text-xs ml-1">
              Página {page + 1} de{" "}
              {totalPages}
            </span>
            <span className="flex items-center gap-0.5 text-xs">
              | Ir a la página:
              <input
                type="number"
                defaultValue={1}
                className="border py-1 rounded w-16 text-xs"
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  handleAnyPage(page);
                }}
              />
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-row justify-between">
          <span className="text-xs">
            Mostrando {table.getRowModel().rows.length.toLocaleString()} de{" "}
            {totalElements} filas
          </span>
          <span className="text-xs">
            {totalElements} elementos encontrados
          </span>
        </div>
      </div>
    </div>
  );
};

export default Table;
