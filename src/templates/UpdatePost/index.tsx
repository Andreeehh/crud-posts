import { useSession } from 'next-auth/client';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_UPDATE_POST } from '../../graphql/mutations/post';
import { FormPost, FormPostProps } from '../../components/FormPost';
import { Wrapper } from '../../components/Wrapper';
import { GQL_MUTATION_CREATE_AUTHOR } from '../../graphql/mutations/author';
import { GQL_MUTATION_CREATE_TAG } from '../../graphql/mutations/tag';
import { GQL_MUTATION_CREATE_CATEGORY } from '../../graphql/mutations/category';
import { StrapiPost } from '../../types/StrapiPost';
import { Author } from '../../types/Author';
import { Categories } from '../../types/Categories';
import { Tags } from '../../types/Tags';
import { CreateStrapiPost } from '../../types/CreateStrapiPost';
import { Authors } from '../../types/Authors';
import { Category } from '../../types/Category';
import { Tag } from '../../types/SingleTag';
import React from 'react';

export type UpdatePostTemplateProps = {
  post: StrapiPost;
  authors: Authors;
  categories: Categories;
  tags: Tags;
};

export type ResponsePost = {
  createPost: {
    data: {
      id: number;
    };
  };
};

export type ResponseAuthor = {
  createAuthor: {
    data: {
      author: Author;
    };
  };
};

export type ResponseCategory = {
  createCategory: {
    data: {
      category: Category;
    };
  };
};

export type ResponseTag = {
  createTag: {
    data: {
      tag: Tag;
    };
  };
};

export function UpdatePostTemplate({
  post,
  authors,
  categories,
  tags,
}: FormPostProps) {
  const [session] = useSession();

  const handleSave = async ({
    id,
    attributes: { title, content, except, slug, authorId },
  }: CreateStrapiPost) => {
    try {
      await gqlClient.request<ResponsePost>(
        GQL_MUTATION_UPDATE_POST,
        {
          id,
          title,
          content,
          except,
          slug,
          authorId,
        },
        {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      );
    } catch (e) {
      console.log(e);
      alert('Erro ao salvar o post');
    }
  };

  const handleSaveNewMetaData = async (
    newMetaDataName: string,
    type: number,
  ) => {
    try {
      const slug = newMetaDataName
        .replace(/ /g, '-')
        .replace(/[^0-9a-zA-Z-]+/g, '')
        .toLowerCase();
      const currentDate = new Date();
      const publishedAt = currentDate.toISOString();
      if (type == 1) {
        const response = await gqlClient.request<ResponseAuthor>(
          GQL_MUTATION_CREATE_AUTHOR,
          {
            displayName: newMetaDataName,
            slug,
            publishedAt,
          },
          {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        );
        return response.createAuthor.data;
      } else if (type == 2) {
        const response = await gqlClient.request<ResponseCategory>(
          GQL_MUTATION_CREATE_CATEGORY,
          {
            displayName: newMetaDataName,
            slug,
            publishedAt,
          },
          {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        );
        return response.createCategory.data;
      } else {
        const response = await gqlClient.request<ResponseTag>(
          GQL_MUTATION_CREATE_TAG,
          {
            displayName: newMetaDataName,
            slug,
            publishedAt,
          },
          {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        );
        return response.createTag.data;
      }
    } catch (e) {
      console.log(e);
      alert(
        'Erro ao criar ' +
          (type == 1 ? 'o post' : type == 2 ? 'a categoria' : 'a tag'),
      );
    }
    return null;
  };

  if (!post) {
    return (
      <Wrapper>
        <p>Post does not exist</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormPost
        onSave={handleSave}
        post={post}
        authors={authors}
        categories={categories}
        tags={tags}
        onCreateMetadata={handleSaveNewMetaData}
      />
    </Wrapper>
  );
}
