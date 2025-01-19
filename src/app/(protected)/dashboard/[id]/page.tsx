import MessageCard from '@/components/MessageCard';

export default async function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const results = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query getContact($id: ID!) {
          contact(where: {id: $id}, stage: DRAFT) {
            id,
            name,
            phoneNumber,
            message,
            messageStatus
          }
        }
      `,
      variables: {
        id: id,
      },
    }),
  });

  const {
    data: { contact },
  } = await results.json();

  return <MessageCard contact={contact} />;
}
