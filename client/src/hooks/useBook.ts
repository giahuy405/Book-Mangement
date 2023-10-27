import toast from "react-hot-toast";
import axiosClient from "../services/axiosClient";
import useBookStore from "../stores/bookStore";
import { BookType, PostBookType } from "../types/book";

export const useBook = () => {
  const { allBook, setAllBook, selectedBook, setSelectedBook } = useBookStore();

  const fetchBooks = async () => {
    const res = await axiosClient.get("/books");
    setAllBook(res.data);
  };
  const addBook = async (book: PostBookType) => {
    try {
      const res = await axiosClient.post("/books", book);
      fetchBooks();
      toast.success("Successfully created!");
    } catch (err) {
      toast.error("No");
    }
  };
  const editBook = async (id: string, book: Omit<BookType, "id">) => {
    try {
      const res = await axiosClient.patch(`/books/${id}`, book);
      fetchBooks();
      toast.success("Successfully updated!");
    } catch (err) {
      toast.error("No");
    }
  };
  const deleteBook = async (id: string) => {
    try {
      const res = await axiosClient.delete(`/books/${id}`);
      fetchBooks();
      toast.success("Successfully !");
    } catch (err) {
      toast.error("No");
    }
  };

  return {
    allBook,
    setAllBook,
    fetchBooks,
    addBook,
    deleteBook,
    editBook,
    selectedBook,
    setSelectedBook,
  };
};
