import { FormLogin } from 'components/FormLogin';
import { Wrapper } from 'components/Wrapper';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setError('Preencha os campos corretamente');
      return;
    }
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!response.ok) {
      setError('Usuário ou senha inválidos');
      return;
    }

    const redirect = router.query?.redirect || '/';
    router.push(redirect as string);
  };
  return (
    <Wrapper>
      <FormLogin onLogin={handleLogin} errorMessage={error} />
    </Wrapper>
  );
}
