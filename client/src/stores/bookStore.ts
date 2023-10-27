import { create } from "zustand";
import { BookType } from "../types/book";

type BookStoreState = {
  allBook: BookType[];
  selectedBook: BookType | null;
};

type BookStoreActions = {
  setAllBook: (book: BookType[]) => void;
  setSelectedBook: (book: BookType) => void;
};

const useBookStore = create<BookStoreState & BookStoreActions>((set) => ({
  selectedBook: null,
  allBook: [],
  setAllBook: (book: BookType[]) => {
    set({ allBook: book });
  },
  setSelectedBook: (book: BookType) => {
    set({ selectedBook: book });
  },
}));

export default useBookStore;
