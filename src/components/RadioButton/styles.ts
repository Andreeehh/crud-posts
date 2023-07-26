import styled, { css } from 'styled-components';

export const RadioButtonWrapper = styled.div<{
  firstItem: boolean;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacings.large};
  /* Apply margin-top to the first item */
  ${(props) => props.firstItem && 'margin-top: 1rem;'}
`;

export const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const StyledRadioButton = styled.div<{
  checked: boolean;
  disabled: boolean;
}>`
  ${({ theme, checked, disabled }) => css`
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid ${theme.colors.gray3};
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: ${theme.spacings.xsmall};
    cursor: pointer;

    ${
      checked &&
      css`
      background: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    `
    }

    ${
      disabled &&
      css`
      background: ${theme.colors.gray1};
      border-color: ${theme.colors.gray3};
      cursor: not-allowed;
    `
    }
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.normal};
    color: ${theme.colors.gray6};
  `}
`;
