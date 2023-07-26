import styled, { css } from 'styled-components';

export const Grid = styled.div`
  ${({ theme }) => css`
    max-width: 120rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: ${theme.spacings.large};
    padding: ${theme.spacings.large};

    @media ${theme.media.lteOrEqSmallest} {
      grid-template-columns: 1fr;
    }
  `}
`;

export const GridContent = styled.div`
    width: 100%;
`;

export const GridHeader = styled.div`
    margin-bottom: 2rem;
`;

export const ButtonDiv = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const ButtonComboBoxDiv = styled.div`
  width: 50%;
  display: flex; /* Add flex display to the container */
  justify-content: flex-end;
`;

export const ComboBoxDiv = styled.div`
${({ theme }) => css`
  width: 100%;
  display: flex; /* Add flex display to the container */
  justify-content: space-between; /* Add this to create space between the components */
  align-items: center;
  margin-bottom: 2rem;
  @media ${theme.media.lteOrEqSmall} {
    font-size: ${theme.font.sizes.small};
    }`}
`;

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    background: ${theme.colors.warning};
    color: ${theme.colors.white};
    padding: ${theme.spacings.xsmall} ${theme.spacings.small};
  `}
`;
