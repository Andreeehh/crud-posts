import { gql } from 'graphql-request';
import { GQL_FRAGMENT_AUTHOR } from '../fragments/authors';

export const GQL_QUERY_GET_AUTHORS = gql`
  ${GQL_FRAGMENT_AUTHOR}

  query GET_AUTHORS($start: Int = 0){
  authors(pagination: { start: $start }) {
    ...authorEntityResponseCollection
  }
}
`;
