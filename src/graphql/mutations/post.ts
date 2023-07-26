import { gql } from 'graphql-request';
import { GQL_FRAGMENT_POST_ENTITY_RESPONSE } from '../fragments/post';

export const GQL_MUTATION_UPDATE_POST = gql`
  ${GQL_FRAGMENT_POST_ENTITY_RESPONSE}

  mutation UPDATE_POST(
  $id: ID!
  $title: String!
  $content: String!
  $except: String!
  $slug: String!
  $authorId: ID!
  $categoriesId: [ID] = [1,2]
  $tagsId: [ID] = [1,2]
  $coverId: ID = 1
) {
  updatePost(
    id: $id,
    data: {
      title: $title
      content: $content
      except: $except
      slug: $slug
      author: $authorId
      categories: $categoriesId
      tags: $tagsId
      cover: $coverId
    }
  ) {
    ...postEntityResponse
  }
}

`;

export const GQL_MUTATION_CREATE_POST = gql`
  ${GQL_FRAGMENT_POST_ENTITY_RESPONSE}

  mutation CREATE_POST(
  $title: String!
  $content: String!
  $except: String!
  $slug: String!
  $authorId: ID!
  $categoriesId: [ID]
  $tagsId: [ID]
  $coverId: ID
  $publishedAt: DateTime!
) {
  createPost(
    data: {
      title: $title
      content: $content
      except: $except
      slug: $slug
      author: $authorId
      categories: $categoriesId
      tags: $tagsId
      cover: $coverId
      publishedAt: $publishedAt
    }
  ){
    ...postEntityResponse
  }
}
`;

export const GQL_MUTATION_DELETE_POST = gql`
  ${GQL_FRAGMENT_POST_ENTITY_RESPONSE}

  mutation DELETE_POST($id: ID!){
  deletePost(id: $id){
    ...postEntityResponse
  }
}
`;
