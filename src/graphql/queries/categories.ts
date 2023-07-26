import { gql } from 'graphql-request';
import { GQL_FRAGMENT_CATEGORIES } from '../fragments/categories';

export const GQL_QUERY_GET_CATEGORIES = gql`
  ${GQL_FRAGMENT_CATEGORIES}

  query GET_CATEGORIES($start: Int = 0){
  categories(pagination: { start: $start }) {
    ...categoryEntityResponseCollection
  }
}
`;
