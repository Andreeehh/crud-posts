import React, { useState } from 'react';
import { Email } from '@styled-icons/material-outlined/Email';
import { Password } from '@styled-icons/material-outlined/Password';
import * as StyledButton from '../Button/styles';
import { TextInput } from '../TextInput';
import * as Styled from './styles';
import { Button } from '../Button';

export type FormLoginProps = {
  errorMessage?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
};

export const FormLogin = ({ errorMessage, onLogin }: FormLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    if (onLogin) {
      await onLogin(email, password);
    }

    setLoading(false);
  };

  const onClickVisitorButton = (event: React.MouseEvent) => {
    event.preventDefault();
    setEmail('visitor@email.com');
    setPassword('visitor@email.com');
  };

  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      <TextInput
        name="user-identifier"
        label="E-mail"
        onInputChange={(v) => setEmail(v)}
        value={email}
        icon={<Email />}
        type="email"
      />
      <TextInput
        name="user-password"
        label="Password"
        onInputChange={(v) => setPassword(v)}
        value={password}
        icon={<Password />}
        type="password"
      />

      {!!errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}

      <Styled.ButtonWrapper>
        <Button disabled={loading}>{loading ? 'Wait...' : 'Login'}</Button>
        <StyledButton.Button onClick={onClickVisitorButton} color="primary">
          Login as Visitor
        </StyledButton.Button>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};
