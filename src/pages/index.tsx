import { Wrapper } from 'components/Wrapper';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';

export default function Index() {
  const [session] = useSession();

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || ''}</h1>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
