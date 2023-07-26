import { gql } from 'graphql-request';
import { GQL_FRAGMENT_TAG_ENTITY_RESPONSE } from '../fragments/tags';

export const GQL_MUTATION_CREATE_TAG = gql`
  ${GQL_FRAGMENT_TAG_ENTITY_RESPONSE}

  mutation CREATE_TAG($displayName: String! $slug: String! $publishedAt: DateTime){
  createTag(data: {displayName: $displayName, slug: $slug, publishedAt: $publishedAt }){
    ...tagEntityResponse
  }
}
`;
