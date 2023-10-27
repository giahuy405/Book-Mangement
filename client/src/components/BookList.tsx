import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useBook } from "../hooks/useBook";
import { useEffect } from "react";
import BookItem from "./BookItem";

const widthSkeleton = [
  { id: 1, w: "90px" },
  { id: 2, w: "70px" },
  { id: 3, w: "110px" },
  { id: 4, w: "100px" },
  { id: 5, w: "80px" },
];

const BookListSkeleton = () => {
  return (
    <div className="bg-white rounded p-5 mb-3 shadow-lg border">
      {widthSkeleton.map((item) => (
        <div className={`w-[${item.w}]`} key={item.id}>
          <Skeleton />
        </div>
      ))}
      <div className="flex gap-2">
        {widthSkeleton.map((item) => (
          <div className={`w-[60px]`} key={item.id}>
            <Skeleton />
          </div>
        ))}
      </div>
    </div>
  );
};
const BookList = () => {
  const { fetchBooks, allBook, setAllBook } = useBook();
  useEffect(() => { 
    fetchBooks();
  }, []);

  return (
    <div>
      {allBook.length > 0 ? (
        allBook?.map((item) => <BookItem key={item.id} item={item} />)
      ) : (
      <>
        <BookListSkeleton />
        <BookListSkeleton />
        <BookListSkeleton />
      </>
      )}
    </div>
  );
};

export default BookList;
