import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BookType } from "../types/book";
import { useBook } from "../hooks/useBook";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  item:BookType
}

export function ModalConfirm({ openModal, setOpenModal,handleOpen ,item}: Props) {
  const { deleteBook } = useBook();
  const handleDelete = (id:string) =>{
    deleteBook(id)
  }
  return (
    <>
      
      <Dialog size="xs" open={openModal} handler={handleOpen}>
        <DialogHeader>Are you sure ?</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this book?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={()=>{
            handleOpen();
            handleDelete(item.id)
          }}>
            <span>Delete permantly</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
