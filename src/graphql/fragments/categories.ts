import { gql } from 'graphql-request';

export const GQL_FRAGMENT_CATEGORIES = gql`
fragment categoryEntityResponseCollection on CategoryEntityResponseCollection {
  data {
    ...categoryEntity
  }
}

fragment categoryEntity on CategoryEntity {
  id
  attributes {
    ...category
  }
}

fragment category on Category {
  displayName
  slug
}
`;

export const GQL_FRAGMENT_CATEGORY_ENTITY_RESPONSE = gql`
fragment categoryEntityResponse on CategoryEntityResponse {
  data {
    ...categoryEntity
  }
}
fragment categoryEntity on CategoryEntity {
  id
  attributes {
    ...category
  }
}

fragment category on Category {
  displayName
  slug
}
`;
