import { useSession } from 'next-auth/client';
import { Wrapper } from '../../components/Wrapper';

export const HomeTemplate = () => {
  const [session] = useSession();

  return (
    <Wrapper>
      <h1>Hello {session?.user?.name || 'ninguém'}</h1>
    </Wrapper>
  );
};
