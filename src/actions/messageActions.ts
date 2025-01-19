'use server';

import { GraphQLClient, gql } from 'graphql-request';
import { Message } from '../app/(protected)/dashboard/Columns';
import { revalidatePath } from 'next/cache';

export async function updateStatus({
  id,
  messageStatus,
}: Pick<Message, 'id' | 'messageStatus'>) {
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!}`,
    {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      },
    }
  );

  const mutation = gql`
    mutation updateContact($id: ID!, $messageStatus: MessageStatus!) {
      updateContact(
        where: { id: $id }
        data: { messageStatus: $messageStatus }
      ) {
        id
      }
    }
  `;

  if (!id || !messageStatus) return null;

  try {
    await client.request(mutation, { id, messageStatus });
    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMessage(id: string) {
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!}`,
    {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      },
    }
  );

  const mutation = gql`
    mutation deleteContact($id: ID!) {
      deleteContact(where: { id: $id }) {
        id
      }
    }
  `;

  if (!id) return null;

  try {
    await client.request(mutation, { id });
    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}

export async function deleteManyMessages(id_list: string[]) {
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!}`,
    {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      },
    }
  );

  const mutation = gql`
    mutation deleteContacts($id_list: [ID]) {
      deleteManyContactsConnection(where: { id_in: $id_list }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  if (!id_list) return null;

  try {
    await client.request(mutation, { id_list });
    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}
