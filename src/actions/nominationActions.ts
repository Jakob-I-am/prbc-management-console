'use server';

import { GraphQLClient, gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';

export async function deleteNomination(id: string) {
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!}`,
    {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      },
    }
  );

  const mutation = gql`
    mutation deleteNominee($id: ID!) {
      deleteNominee(where: { id: $id }) {
        id
      }
    }
  `;

  if (!id) return null;

  try {
    await client.request(mutation, { id });
    revalidatePath('/nominations');
  } catch (error) {
    console.log(error);
  }
}

export async function deleteManyNominations(id_list: string[]) {
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!}`,
    {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      },
    }
  );

  const mutation = gql`
    mutation deleteNominees($id_list: [ID]!) {
      deleteManyNomineesConnection(where: { id_in: $id_list }) {
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
    revalidatePath('/nominations');
  } catch (error) {
    console.log(error);
  }
}
