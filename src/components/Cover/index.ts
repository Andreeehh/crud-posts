import styled, { css } from 'styled-components';

export const Cover = styled.img`
${({ theme }) => css`
    max-width: 100%;
    display:block;
    margin-bottom: ${theme.spacings.medium}
`}
`;
