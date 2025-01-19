'use client';

import { ColumnDef } from '@tanstack/react-table';

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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'selectOption',
    header: 'Selected session',
  },
];
