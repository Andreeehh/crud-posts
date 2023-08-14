import { AuthorData } from './Author';
import { Categories } from './Categories';
import { StrapiImage } from './StrapiImage';
import { Tags } from './Tags';

export type StrapiPost = {
  id?: string;
  attributes: {
    title: string;
    slug: string;
    except: string;
    content: string;
    cover: StrapiImage;
    tags: Tags;
    createdAt?: string;
    categories: Categories;
    author: AuthorData;
  };
};
