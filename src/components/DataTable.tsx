'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  deleteMany: (table: any) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  deleteMany,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      columnFilters,
    },
  });
  const path = usePathname();

  return (
    <div className='rounded-md border'>
      {path.includes('/nominations') && (
        <Input
          placeholder='Filter nominations...'
          value={
            (table.getColumn('selectOption')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('selectOption')?.setFilterValue(event.target.value)
          }
          className='max-w-full rounded-none border-none'
        />
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-24 text-center'
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='w-full flex items-center p-3 border-t'>
        <div>
          {table.getFilteredSelectedRowModel().rows.length > 0 ? (
            <Trash2
              className='cursor-pointer text-red-500 mr-3 border border-red-500 p-1 rounded hover:bg-red-500 hover:text-secondary'
              size='30'
              onClick={() =>
                deleteMany(
                  table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original)
                )
              }
            />
          ) : (
            ''
          )}
        </div>
        <div>
          <p className='text-base text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </p>
        </div>
      </div>
    </div>
  );
}
