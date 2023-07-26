import * as Styled from './styles';
import { useState } from 'react';
import { Input, InputWrapper, Label } from 'components/TextInput/styles';

export type ComboBoxProps = {
  label: string;
  name: string;
  errorMessage: string;
  options: string[];
  onSelectOption: (selectedOption: string) => void;
};

export const ComboBox = ({
  label,
  name,
  errorMessage = '',
  options = [],
  onSelectOption,
}: ComboBoxProps) => {
  const [inputValue, setInputValue] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOptionSelection = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    onSelectOption(option);
  };

  return (
    <Styled.ComboBoxWrapper>
      <InputWrapper>
        <Input
          id={name}
          placeholder={label}
          name={name}
          value={inputValue}
          errorMessage={errorMessage}
          onFocus={() => {
            setShowDropdown(true);
          }}
          onChange={handleInputChange}
          readOnly={true}
        />
        <Label htmlFor={name} element={'text-input'}>
          {label}
        </Label>
      </InputWrapper>
      {showDropdown && (
        <Styled.DropdownList>
          {options.map((option) => (
            <Styled.DropdownListItem
              key={option}
              onClick={() => {
                handleOptionSelection(option);
              }}
            >
              {option}
            </Styled.DropdownListItem>
          ))}
        </Styled.DropdownList>
      )}
    </Styled.ComboBoxWrapper>
  );
};
