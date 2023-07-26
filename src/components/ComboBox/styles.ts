import styled, { css } from 'styled-components';
import { Input } from '../TextInput/styles';
import { TextInputProps } from 'components/TextInput';

export type StyledInputType = Pick<
  TextInputProps,
  'errorMessage' | 'as' | 'type' | 'label'
>;

export const ComboBoxInput = styled(Input)<StyledInputType>`
  ${({ theme }) => css`
  border-radius: ${theme.spacings.tiny};
  `}
`;

export const ComboBoxWrapper = styled.div`
    position: relative;
    width: 45%;
`;

export const DropdownList = styled.ul`
/* Styles for the dropdown list */
/* You can add styles for positioning, background color, etc. here */
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure the dropdown is on top of other elements */
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const DropdownListItem = styled.li`
/* Styles for individual items in the dropdown list */
/* You can add padding, cursor, etc. here */
padding: 8px 16px;
cursor: pointer;

&:hover {
  background-color: #f2f2f2;
}
`;
