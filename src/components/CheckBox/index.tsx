import * as Styled from './styles';
import React, { useRef } from 'react';

export type CheckboxProps = {
  label: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  firstItem: boolean;
};
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked = false,
  disabled = false,
  onCheckboxChange,
  firstItem,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    const isChecked = inputRef.current?.checked ?? false;

    if (onCheckboxChange) {
      onCheckboxChange(isChecked);
    }
  };

  return (
    <Styled.Wrapper firstItem={firstItem}>
      <Styled.HiddenCheckBox
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        disabled={disabled}
        ref={inputRef}
        onChange={handleChange}
      />
      <Styled.StyledCheckBox checked={checked} disabled={disabled}>
        {checked && <span>&#10003;</span>}
      </Styled.StyledCheckBox>
      <Styled.Label htmlFor={name}>{label}</Styled.Label>
    </Styled.Wrapper>
  );
};
