export type CreateStrapiPost = {
  id?: string;
  attributes: {
    title: string;
    slug: string;
    except: string;
    content: string;
    coverId: number;
    tagsId?: number[];
    createdAt?: string;
    categoriesId?: number[];
    authorId?: number;
  };
};
