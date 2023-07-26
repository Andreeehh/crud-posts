import { gql } from 'graphql-request';
import {
  GQL_FRAGMENT_POST,
  GQL_FRAGMENT_POST_ENTITY_RESPONSE,
} from '../fragments/post';

export const GQL_QUERY_GET_POSTS = gql`
  ${GQL_FRAGMENT_POST}

  query GET_POSTS(
  $start: Int = 0
  $sort: [String] = ["createdAt:desc"]
) {
  posts(pagination: { start: $start }, sort: $sort) {
    ...postEntityResponseCollection
  }
}
`;

export const GQL_QUERY_GET_POST = gql`
  ${GQL_FRAGMENT_POST_ENTITY_RESPONSE}

  query GET_POST($id: ID!) {
    post(id: $id) {
      ...postEntityResponse
    }
  }
`;
