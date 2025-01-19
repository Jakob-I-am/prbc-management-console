'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

import { deleteNomination } from '@/actions/nominationActions';

export type Nomination = {
  name: string;
  phoneNumber: string;
  selectOption:
    | 'Wednesday: 1pm'
    | 'Saturday: 1pm'
    | 'Services club power play pairs: Thursday: 6pm';
};

export const columns: ColumnDef<Nomination>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='w-10 flex justify-center items-center'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='w-10 flex justify-center items-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
  },
  {
    accessorKey: 'id',
    header: () => <></>,
    cell: () => <></>,
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className='text-lg text-primary font-semibold w-36'>Name</div>
    ),
    cell: ({ row }) => (
      <div className='text-base text-primary w-36'>
        <p>{row.getValue('name')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: () => (
      <div className='text-lg text-primary font-semibold w-44'>
        Phone Number
      </div>
    ),
    cell: ({ row }) => (
      <div className='text-base text-primary w-44'>
        <p>{row.getValue('phoneNumber')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'selectOption',
    header: () => (
      <div className='text-lg text-primary font-semibold w-44'>
        Selected Option
      </div>
    ),
    cell: ({ row }) => (
      <div className='text-base text-primary w-44'>
        <p>{row.getValue('selectOption')}</p>
      </div>
    ),
  },
  {
    id: 'delete',
    header: '',
    cell: ({ row }) => (
      <div>
        <Trash2
          className='cursor-pointer text-red-500 mr-3 border border-red-500 p-1 rounded hover:bg-red-500 hover:text-secondary'
          size='30'
          onClick={() => deleteNomination(row.getValue('id'))}
        />
      </div>
    ),
  },
];
