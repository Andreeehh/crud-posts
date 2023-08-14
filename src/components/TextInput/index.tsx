import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import * as Styled from './styles';

export type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  onInputChange?: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string;
  value?: string;
  icon?: React.ReactNode;
  as?: 'input' | 'textarea';
  reference?: HTMLInputElement;
  hasFocus?: boolean;
  readonly?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = ({
  type = 'text',
  label,
  name,
  disabled = false,
  onInputChange,
  errorMessage = '',
  value = '',
  icon = '',
  as = 'input',
  reference = null,
  hasFocus = false,
  readOnly = false,
}: TextInputProps) => {
  const inputRef = useRef(reference);

  const handleChange = () => {
    const value = inputRef.current.value;

    if (onInputChange) {
      onInputChange(value);
    }
  };

  useEffect(() => {
    if (hasFocus && inputRef.current) {
      inputRef.current.focus(); // Set focus on the input element
    }
  }, [hasFocus]);

  return (
    <Styled.Wrapper>
      <Styled.InputWrapper errorMessage={errorMessage}>
        <Styled.Input
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          ref={inputRef}
          onChange={handleChange}
          placeholder={label}
          errorMessage={errorMessage}
          as={as}
          readOnly={readOnly}
          value={value}
        />

        <Styled.Label htmlFor={name} element={as}>
          {label}
        </Styled.Label>
        {!!icon && as !== 'textarea' && icon}
      </Styled.InputWrapper>

      {!!errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}
    </Styled.Wrapper>
  );
};
