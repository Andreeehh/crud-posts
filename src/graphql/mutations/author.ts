import { gql } from 'graphql-request';
import { GQL_FRAGMENT_AUTHOR_ENTITY_RESPONSE } from '../fragments/authors';

export const GQL_MUTATION_CREATE_AUTHOR = gql`
  ${GQL_FRAGMENT_AUTHOR_ENTITY_RESPONSE}

  mutation CREATE_AUTHOR($displayName: String! $slug: String! $publishedAt: DateTime){
  createAuthor(data: {displayName: $displayName, slug: $slug, publishedAt: $publishedAt }){
    ...authorEntityResponse
  }
}
`;
