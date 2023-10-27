import { TagType } from "./tag";

export type BookType = {
  id: string;
  name: string;
  description: string;
  price: number;
  publicationDate: string;
  author: string;
  tags: TagType[];
};


export type PostBookType = {
  name: string;
  description: string;
  price: number;
  publicationDate: string;
  author: string;
  tags: string[];
};