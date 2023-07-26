import { gql } from 'graphql-request';

export const GQL_FRAGMENT_TAGS = gql`
fragment tagEntityResponseCollection on TagEntityResponseCollection	{
  data{
    ...tagEntity
  }
}

fragment tagEntity on TagEntity {
  id
  attributes {
    ...tag
  }
}

fragment tag on Tag {
  displayName
  slug
}
`;

export const GQL_FRAGMENT_TAG_ENTITY_RESPONSE = gql`
fragment tagEntityResponse on TagEntityResponse {
  data {
    ...tagEntity
  }
}
fragment tagEntity on TagEntity {
  id
  attributes {
    ...tag
  }
}

fragment tag on Tag {
  displayName
  slug
}
`;
