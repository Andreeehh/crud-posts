import { gql } from 'graphql-request';
import { GQL_FRAGMENT_TAGS } from '../fragments/tags';

export const GQL_QUERY_GET_TAGS = gql`
  ${GQL_FRAGMENT_TAGS}

  query GET_TAGS($start: Int = 0){
  tags(pagination: { start: $start }) {
    ...tagEntityResponseCollection
  }
}
`;
