import { useSession } from 'next-auth/client';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_CREATE_POST } from '../../graphql/mutations/post';
import { Wrapper } from '../../components/Wrapper';
import { useRouter } from 'next/dist/client/router';
import { GQL_MUTATION_CREATE_AUTHOR } from 'graphql/mutations/author';
import { GQL_MUTATION_CREATE_CATEGORY } from 'graphql/mutations/category';
import { GQL_MUTATION_CREATE_TAG } from 'graphql/mutations/tag';
import { Categories } from 'types/Categories';
import { Tags } from 'types/Tags';
import { CreateStrapiPost } from 'types/CreateStrapiPost';
import { FormPost } from 'components/FormPost';
import {
  ResponseAuthor,
  ResponseCategory,
  ResponsePost,
  ResponseTag,
} from 'templates/UpdatePost';
import { Authors } from 'types/Authors';

export type CreatePostTemplateProps = {
  authors: Authors;
  categories: Categories;
  tags: Tags;
};

export function CreatePostTemplate({
  authors,
  categories,
  tags,
}: CreatePostTemplateProps) {
  const router = useRouter();
  const [session] = useSession();

  const handleSave = async ({
    attributes: {
      title,
      content,
      except,
      authorId,
      categoriesId,
      tagsId,
      coverId,
    },
  }: CreateStrapiPost) => {
    const currentDate = new Date();
    const publishedAt = currentDate.toISOString();
    try {
      const slug = title
        .replace(/ /g, '-')
        .replace(/[^0-9a-zA-Z-]+/g, '')
        .toLowerCase();
      const response = await gqlClient.request<ResponsePost>(
        GQL_MUTATION_CREATE_POST,
        {
          title,
          content,
          except,
          slug,
          authorId,
          categoriesId,
          tagsId,
          coverId,
          publishedAt,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      const post = response.createPost;
      if (post) {
        router.push(`/${post.data.id}`);
      } else {
        throw new Error('Erro ao criar');
      }
    } catch (e) {
      console.log(e);
      alert('Erro ao criar o post');
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
            Authorization: `Bearer ${session.accessToken}`,
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
            Authorization: `Bearer ${session.accessToken}`,
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
            Authorization: `Bearer ${session.accessToken}`,
          },
        );
        return response.createTag.data;
      }
    } catch (e) {
      console.log(e);
      alert('Erro ao criar o post');
    }
    return null;
  };

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
            return null;
          }
        } else {
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
        authors={authors}
        categories={categories}
        tags={tags}
        onCreateMetadata={handleSaveNewMetaData}
        onCreateNewImage={handleImageUpload}
      />
    </Wrapper>
  );
}
