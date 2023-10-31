import  { useEffect, useState } from "react";
import { BookType } from "../types/book";
import { Button, Chip, Spinner } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/alert";
import { EditIcon, GarbageIcon } from "./Icons";
import { useLoading } from "../hooks/useLoading";
import clsx from "clsx";
import { ModalConfirm } from "./ModalConfirm";
import useModalForm from "../stores/formModal";
import { useBook } from "../hooks/useBook";
interface Props {
  item: BookType;
}

const BookItem = ({ item }: Props) => {
  const [loading, {  }] = useLoading();
  const [openModal,setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(!openModal);
  const {form,setForm} = useModalForm();
  const {setSelectedBook} = useBook();

  const handleEdit = (item:BookType) =>{
    setForm('book')
    setSelectedBook(item)
  }
 
  return (
   <>
    <div className="bg-white rounded p-5 mb-4 shadow-md border relative">
      <p>Name : {item.name}</p>
      <p>Desc : {item.description}</p>
      <p>Price : {item.price}</p>
      <p>Author : {item.author}</p>
      <p>Publication years : {item.publicationDate}</p>
      <div className="flex gap-3">
        Tags :
        <div className="flex flex-wrap gap-2 ">
          {item.tags.map((item) => (
            <Chip color={item.color as color} value={item.name} key={item.id} />
          ))}
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <Button
          variant="text"
          size="sm"
          className="hover:bg-blue-50 hover:text-blue-500"
          onClick={()=>handleEdit(item)}
        >
          <EditIcon />
        </Button>
        <Button
          onClick={() => {
            // handleDelete(item.id)
            handleOpen()
          }}
          variant="text"
          size="sm"
          className={clsx(`hover:bg-red-50 hover:text-red-500`, {
            "bg-red-50": loading,
          })}
        >
          {loading ? <Spinner /> : <GarbageIcon />}
        </Button>
      </div>
    </div>

    <ModalConfirm
    item={item}
    openModal={openModal} setOpenModal={setOpenModal} handleOpen={handleOpen} />
   </>
  );
};

export default BookItem;
