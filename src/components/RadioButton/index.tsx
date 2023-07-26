import * as Styled from './styles';
import React, { useRef } from 'react';

export type RadioButtonProps = {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onRadioButtonChange?: (value: string) => void;
  firstItem: boolean;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  onRadioButtonChange,
  firstItem,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (inputRef.current && inputRef.current.checked && onRadioButtonChange) {
      onRadioButtonChange(value);
    }
  };

  return (
    <Styled.RadioButtonWrapper firstItem={firstItem}>
      <Styled.HiddenRadioButton
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        ref={inputRef}
        onChange={handleChange}
      />
      <Styled.StyledRadioButton checked={checked} disabled={disabled}>
        {checked && <span>&#9679;</span>}
      </Styled.StyledRadioButton>
      <Styled.Label htmlFor={name}>{label}</Styled.Label>
    </Styled.RadioButtonWrapper>
  );
};
