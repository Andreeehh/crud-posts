import styled, { css } from 'styled-components';
import { PlusOne } from '@styled-icons/material-outlined';

export const AddButton = styled.button`
${({ theme }) => css`
    margin-left: 1rem; /* Add some spacing between the label and the button */
    background-color: ${theme.colors.info};
    border: 0.1rem solid ${theme.colors.primary};
    padding: 0.5rem;
    border-radius: 50%;
    max-height:3rem;
    cursor: pointer;
`}
`;

export const PlusIcon = styled(PlusOne)`
width: 1.5rem;
height: 1.5rem;
`;
