import { useSession } from 'next-auth/client';
import { Wrapper } from '../components/Wrapper';

export default function OpenRoutePage() {
  const [session] = useSession();

  return (
    <Wrapper>
      <h1>Essa rota é aberta</h1>

      {session?.user?.name ? (
        <p>Hello {session.user.name}.</p>
      ) : (
        <p>Hello, você ainda não fez login.</p>
      )}
    </Wrapper>
  );
}
