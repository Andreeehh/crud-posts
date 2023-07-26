import { GetServerSideProps } from 'next';
import { PrivateComponent } from '../components/PrivateComponent';
import { UpdatePostTemplate } from '../templates/UpdatePost';
import { gqlClient } from '../graphql/client';
import { GQL_QUERY_GET_POST } from '../graphql/queries/post';
import { privateServerSideProps } from '../utils/private-server-side-props';
import { GQL_QUERY_GET_AUTHORS } from 'graphql/queries/authors';
import { GQL_QUERY_GET_CATEGORIES } from 'graphql/queries/categories';
import { GQL_QUERY_GET_TAGS } from 'graphql/queries/tags';
import { StrapiPost } from 'types/StrapiPost';
import { Categories } from 'types/Categories';
import { Tags } from 'types/Tags';
import { Authors } from 'types/Authors';

export type PostPageProps = {
  post: StrapiPost;
  authors: Authors;
  categories: Categories;
  tags: Tags;
};

export type PostResponse = {
  post: {
    data: StrapiPost;
  };
};

export type AuthorsResponse = {
  authors: Authors;
};

export type CategoriesResponse = {
  categories: Categories;
};

export type TagsResponse = {
  tags: Tags;
};

export default function PostPage({
  post,
  authors,
  categories,
  tags,
}: PostPageProps) {
  return (
    <PrivateComponent>
      <UpdatePostTemplate
        post={post}
        authors={authors}
        categories={categories}
        tags={tags}
      />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await privateServerSideProps(ctx, async (session) => {
    const { id } = ctx.params;

    try {
      const { post } = await gqlClient.request<PostResponse>(
        GQL_QUERY_GET_POST,
        {
          id,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
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
          post: post.data,
          authors,
          categories,
          tags,
        },
      };
    } catch (e) {
      return {
        props: {
          session,
        },
      };
    }
  });
};
