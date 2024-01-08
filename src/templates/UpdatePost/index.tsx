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
    data: Author;
  };
};

export type ResponseCategory = {
  createCategory: {
    data: Category;
  };
};

export type ResponseTag = {
  createTag: {
    data: Tag;
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
    attributes: {
      title,
      content,
      except,
      slug,
      authorId,
      categoriesId,
      tagsId,
      coverId,
    },
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
          categoriesId,
          tagsId,
          coverId,
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

  const handleImageUpload = async (file) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${session?.accessToken}`, // if authentication is required
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result) && result.length > 0) {
          const uploadResult = result[0]; // Get the first element of the array
          if (uploadResult.id) {
            return {
              id: uploadResult.id as number,
              url: uploadResult.url as string,
            };
          } else {
            console.error('Upload result does not contain an id.');
            return null;
          }
        } else {
          console.error('Upload result is not in the expected format.');
          return null;
        }
      } else {
        console.error('Upload failed');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  return (
    <Wrapper>
      <FormPost
        onSave={handleSave}
        post={post}
        authors={authors}
        categories={categories}
        tags={tags}
        onCreateMetadata={handleSaveNewMetaData}
        onCreateNewImage={handleImageUpload}
      />
    </Wrapper>
  );
}
