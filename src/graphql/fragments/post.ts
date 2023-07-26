import { gql } from 'graphql-request';

export const GQL_FRAGMENT_POST = gql`
  fragment postEntityResponseCollection on PostEntityResponseCollection {
  data {
    ...postEntity
  }
}

fragment postEntity on PostEntity {
  id
  attributes {
    ...post
  }
}

fragment post on Post {
  title
  slug
  except
  createdAt
  content
  ...cover
  ...categories
  ...tags
  ...authorPost
}

fragment authorPost on Post {
  author {
    ...authorEntityResponse
  }
}

fragment tags on Post {
  tags {
    ...tagRelationResponseCollection
  }
}

fragment categories on Post {
  categories {
    ...categoryRelationResponseCollection
  }
}

fragment cover on Post {
  cover {
    ...imageEntityResponse
  }
}

fragment imageEntityResponse on UploadFileEntityResponse {
  data {
    id
    attributes {
      name
      url
      alternativeText
    }
  }
}

fragment categoryRelationResponseCollection on CategoryRelationResponseCollection {
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

fragment tagRelationResponseCollection on TagRelationResponseCollection {
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

export const GQL_FRAGMENT_POST_ENTITY_RESPONSE = gql`
  fragment postEntityResponse on PostEntityResponse {
  data{
    ...postEntity
  }
}
fragment postEntity on PostEntity {
  id
  attributes {
    ...post
  }
}
fragment post on Post {
  title
  slug
  except
  createdAt
  content
  ...cover
  ...categories
  ...tags
  ...authorPost
}

fragment authorPost on Post {
  author {
    ...authorEntityResponse
  }
}

fragment tags on Post {
  tags {
    ...tagRelationResponseCollection
  }
}

fragment categories on Post {
  categories {
    ...categoryRelationResponseCollection
  }
}

fragment cover on Post {
  cover {
    ...imageEntityResponse
  }
}

fragment imageEntityResponse on UploadFileEntityResponse {
  data {
    id
    attributes {
      name
      url
      alternativeText
    }
  }
}

fragment categoryRelationResponseCollection on CategoryRelationResponseCollection {
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

fragment tagRelationResponseCollection on TagRelationResponseCollection {
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
