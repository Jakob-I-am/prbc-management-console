'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DeleteIcon, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

import { deleteMessage, updateStatus } from '@/actions/messageActions';

export interface Message {
  id: string;
  name: string;
  phoneNumber: string;
  message: string;
  messageStatus: 'pending' | 'processing' | 'complete';
}

export const columns: ColumnDef<Message>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: () => <></>,
    cell: () => <></>,
  },
  {
    accessorKey: 'messageStatus',
    header: () => (
      <div className='text-lg text-primary font-semibold w-36'>Status</div>
    ),
    cell: ({ row }) => (
      <div className='text-base text-primary w-36'>
        <Badge
          className={`
            ${row.getValue('messageStatus') === 'complete' && 'bg-green-500'} 
            ${row.getValue('messageStatus') === 'processing' && 'bg-blue-500'} 
            ${row.getValue('messageStatus') === 'pending' && 'bg-red-500'}`}
        >
          {row.getValue('messageStatus')}
        </Badge>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
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
    enableSorting: true,
    enableHiding: true,
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
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'message',
    header: () => (
      <div className='text-lg text-primary font-semibold w-full'>Message</div>
    ),
    cell: ({ row }) => (
      <Link href={`/dashboard/${row.getValue('id')}`}>
        <div className='text-base text-primary w-full'>
          <p>{row.getValue('message')}</p>
        </div>
      </Link>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                updateStatus({
                  id: row.getValue('id'),
                  messageStatus: 'processing',
                })
              }
            >
              Prosessing
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                updateStatus({
                  id: row.getValue('id'),
                  messageStatus: 'complete',
                })
              }
            >
              Complete
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href={`/dashboard/${row.getValue('id')}`}>
                View Message
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteMessage(row.getValue('id'))}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
