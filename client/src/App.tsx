import { Button } from "@material-tailwind/react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import TagForm from "./components/TagForm";
import useModalForm from "./stores/formModal";
import { Switch, Case } from "react-if";
import clsx from 'clsx'
import { Toaster } from "react-hot-toast";


function App() {
  const { form, setForm } = useModalForm();

  return (
    <>
      <div className="flex justify-center gap-2 py-3 mb-5 fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-blue-gray-50 w-full">
        <Button variant="outlined" onClick={() => setForm("book")}>
          Create Book
        </Button>
        <Button onClick={() => setForm("tag")}>Create Tag</Button>
      </div>
      <div className={clsx(`mx-auto max-w-[1100px] flex justify-between gap-5 mt-24`,{
        'max-w-[700px]' : form === null
      })}>
        <div className={clsx(``,{
          'w-[100%]': form === null,
          'w-[70%]' : form !== null
        })}>
          <BookList />
        </div>
        <div className={clsx(``,{
          'w-[0]': form === null,
          'w-[30%]': form !== null
        })}>
          <div className="sticky top-20">
          <Switch>
            <Case condition={form === "book"}>
              <BookForm />
            </Case>
            <Case condition={form === "tag"}>
              <TagForm />
            </Case>
          </Switch>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
