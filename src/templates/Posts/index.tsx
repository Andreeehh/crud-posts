import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../components/Wrapper';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_DELETE_POST } from '../../graphql/mutations/post';
import { StrapiPost } from 'types/StrapiPost';

export type PostsTemplateProps = {
  posts?: StrapiPost[];
};

export function PostsTemplate({ posts = [] }: PostsTemplateProps) {
  const [session] = useSession();
  const [statePosts, setStatePosts] = useState(posts);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStatePosts(posts);
  }, [posts]);

  const handleDelete = async (id: string) => {
    setDeleting(true);

    try {
      await gqlClient.request(
        GQL_MUTATION_DELETE_POST,
        {
          id,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );

      setStatePosts((s) => s.filter((p) => p.id !== id));
    } catch (e) {
      alert('Não foi possível delete este post');
    }

    setDeleting(false);
  };

  return (
    <Wrapper>
      <h1>Hello {session?.user?.name || 'ninguém'}</h1>

      {statePosts.map((p) => (
        <p key={'post-' + p.id}>
          <Link href={`/${p.id}`}>
            <a>{p.attributes.title}</a>
          </Link>{' '}
          |{' '}
          <button
            onClick={() => handleDelete(p.id)}
            disabled={deleting || session?.user?.name == 'Visitor'}
          >
            Delete
          </button>
        </p>
      ))}
    </Wrapper>
  );
}
