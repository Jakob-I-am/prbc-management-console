import DataTable from '@/components/DataTable';
import { columns } from './Columns';

export default async function NominationsPage() {
  const results = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query getNominees() {
          nominees(stage: DRAFT) {
            id,
            name,
            phoneNumber,
            selectOption
          }
        }
      `,
    }),
  });
  const {
    data: { nominees },
  } = await results.json();

  return (
    <div className='w-full self-start m-5'>
      <DataTable
        columns={columns}
        data={nominees}
      />
    </div>
  );
}
