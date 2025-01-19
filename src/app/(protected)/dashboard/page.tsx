import DataTable from '@/components/DataTable';
import { columns } from './Columns';

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

  return (
    <div className='w-full self-start m-5'>
      <DataTable
        columns={columns}
        data={contacts}
      />
    </div>
  );
}
