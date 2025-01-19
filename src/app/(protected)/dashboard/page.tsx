/* eslint-disable @typescript-eslint/no-explicit-any */

import DataTable from '@/components/DataTable';
import { columns } from './Columns';
import { deleteManyMessages } from '@/actions/messageActions';

export default async function DashboardPage() {
  const results = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query getContacts {
          contacts(orderBy: createdAt_DESC, stage: DRAFT) {
            id,
            name,
            phoneNumber,
            message,
            messageStatus,
          }  
        }
      `,
    }),
  });
  const {
    data: { contacts },
  } = await results.json();

  const handleDeleteManyMessages = async (table: any) => {
    'use server';
    const idList = table.map((item: any) => item.id);

    await deleteManyMessages(idList);
  };

  return (
    <div className='w-full self-start m-5'>
      <DataTable
        columns={columns}
        data={contacts}
        deleteMany={handleDeleteManyMessages}
      />
    </div>
  );
}
