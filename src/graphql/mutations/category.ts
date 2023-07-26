import { gql } from 'graphql-request';
import { GQL_FRAGMENT_CATEGORY_ENTITY_RESPONSE } from '../fragments/categories';

export const GQL_MUTATION_CREATE_CATEGORY = gql`
  ${GQL_FRAGMENT_CATEGORY_ENTITY_RESPONSE}

  mutation CREATE_CATEGORY($displayName: String! $slug: String! $publishedAt: DateTime){
  createCategory(data: {displayName: $displayName, slug: $slug, publishedAt: $publishedAt }){
    ...categoryEntityResponse
  }
}
`;
