import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  firstItem: boolean;
}>`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacings.large};

  `}
`;

export const HiddenCheckBox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
`;

export const StyledCheckBox = styled.div<{
  checked: boolean;
  disabled: boolean;
}>`
 ${({ theme, checked, disabled }) => css`
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid ${theme.colors.gray3};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: ${theme.spacings.xsmall};

    ${
      checked &&
      css`
      background: ${theme.colors.primary};
      border-color: ${theme.colors.primary};

      &:after {
        content: '';
        width: 0.6rem;
        height: 0.6rem;
        background: ${theme.colors.white};
        border-radius: ${theme.spacings.xxsmall};
      }
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
    cursor: pointer;
  `}
`;
