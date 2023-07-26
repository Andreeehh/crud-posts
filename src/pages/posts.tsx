import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { gqlClient } from '../graphql/client';
import { GQL_QUERY_GET_POSTS } from '../graphql/queries/post';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { PrivateComponent } from '../components/PrivateComponent';
import { PostsTemplate } from '../templates/Posts';
import { StrapiPost } from '../types/StrapiPost';
import React from 'react';

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export type PostsResponse = {
  posts: {
    data: StrapiPost[];
  };
};

export default function PostsPage({ posts = [] }: PostsPageProps) {
  return (
    <PrivateComponent>
      <PostsTemplate posts={posts} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const request = await gqlClient.request<PostsResponse>(
      GQL_QUERY_GET_POSTS,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );

    return {
      props: {
        session,
        posts: request.posts.data,
      },
    };
  } catch (e) {
    return serverSideRedirect(ctx);
  }
};
