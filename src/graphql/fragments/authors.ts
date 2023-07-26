import { gql } from 'graphql-request';

export const GQL_FRAGMENT_AUTHOR = gql`
fragment authorEntityResponseCollection on AuthorEntityResponseCollection{
  data{
    ...authorEntity
  }
}

fragment authorEntity on AuthorEntity {
  id
  attributes {
    ...author
  }
}

fragment author on Author {
  displayName
  slug
}
`;

export const GQL_FRAGMENT_AUTHOR_ENTITY_RESPONSE = gql`
fragment authorEntityResponse on AuthorEntityResponse {
  data {
    ...authorEntity
  }
}
fragment authorEntity on AuthorEntity {
  id
  attributes {
    ...author
  }
}

fragment author on Author {
  displayName
  slug
}
`;
