import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
${({ theme }) => css`
  padding: ${theme.spacings.small} 0;
  display: inline-block;
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border: none;
    color: ${theme.colors.deepBlack};
    font-size: ${theme.font.sizes.normal};
    padding: ${theme.spacings.xsmall} 0;
    cursor: pointer;
    border-radius: ${theme.spacings.tiny};
    transition: ${theme.transitions.fast};
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: none;
      box-shadow: 0 0 ${theme.spacings.tiny} ${theme.colors.primary};
      filter: brightness(110%);
    }

    &:hover {
      filter: brightness(90%);
    }

    &:disabled {
      background: ${theme.colors.gray4};
      color: ${theme.colors.gray1};
      cursor: not-allowed;

      &:hover {
        filter: none;
      }
    }

    > svg {
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
    }
  `}
`;
