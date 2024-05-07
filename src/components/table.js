import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';

const Table = ({ data, columns }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="p-4 bg-gray-100">
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
                  className="px-2 py-2 text-left hover:bg-blue-700 cursor-pointer select-none border-r border-gray-300 text-sm"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className=" group hover:bg-blue-200 transition-colors duration-200"
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
      <div className="h-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 text-xs">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount().toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-xs">
            | Ir a la página:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 text-xs"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border p-1 rounded text-xs"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-row justify-between">
        <span className="text-xs">
          Mostrando {table.getRowModel().rows.length.toLocaleString()} de{' '}
          {table.getRowCount().toLocaleString()} filas
        </span>
        <span className="text-xs">
          {table.getRowCount().toLocaleString()} elementos encontrados
        </span>
      </div>
    </div>
  );
};

export default Table;