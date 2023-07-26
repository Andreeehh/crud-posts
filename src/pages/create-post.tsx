import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { PrivateComponent } from '../components/PrivateComponent';
import { CreatePostTemplate } from '../templates/CreatePost';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { gqlClient } from 'graphql/client';
import { GQL_QUERY_GET_AUTHORS } from 'graphql/queries/authors';
import { GQL_QUERY_GET_CATEGORIES } from 'graphql/queries/categories';
import { GQL_QUERY_GET_TAGS } from 'graphql/queries/tags';
import { Authors } from 'types/Authors';
import { Categories } from 'types/Categories';
import { Tags } from 'types/Tags';
import { AuthorsResponse, CategoriesResponse, TagsResponse } from './[id]';

export type PostPageProps = {
  authors: Authors;
  categories: Categories;
  tags: Tags;
};

export default function PostPage({ authors, categories, tags }: PostPageProps) {
  return (
    <PrivateComponent>
      <CreatePostTemplate
        authors={authors}
        categories={categories}
        tags={tags}
      />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const { authors } = await gqlClient.request<AuthorsResponse>(
      GQL_QUERY_GET_AUTHORS,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );
    const { categories } = await gqlClient.request<CategoriesResponse>(
      GQL_QUERY_GET_CATEGORIES,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );
    const { tags } = await gqlClient.request<TagsResponse>(
      GQL_QUERY_GET_TAGS,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );
    return {
      props: {
        session,
        authors: authors.data,
        categories,
        tags,
      },
    };
  } catch (error) {
    return {
      props: {
        session,
      },
    };
  }
};
