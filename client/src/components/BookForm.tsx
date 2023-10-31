import { Button, Spinner, Typography } from "@material-tailwind/react";
import { useBook } from "../hooks/useBook";
import useModalForm from "../stores/formModal";
import AppInput from "./AppInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoading } from "../hooks/useLoading";
import { useEffect } from "react";
import AppTextarea from "./AppTextarea";
import AppChip from "./AppChip";
import { useTag } from "../hooks/useTag";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch, Case } from "react-if";
interface Props { }

const validationSChema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string()
    .trim()
    .min(3, { message: "Description must be at least 3 characters long" }),
  price: z.number().min(4, { message: "Price cannot be less than 1000 VNĐ" }),
  author: z
    .string()
    .trim()
    .min(3, { message: "Author name must be at least 3 characters long" }),
  publicationDate: z
    .string()
    .trim()
    .min(3, { message: "Year must have at least 3 characters" })
    .max(4, { message: "Year must have exactly 4 characters" }),
  tags: z
    .array(
      z
        .string()
        .min(3, { message: "Each tag must be at least 3 characters long" })
    )
    .refine((tags) => tags.length > 0, {
      message: "At least one tag is required",
    }),
});
type FormValues = z.infer<typeof validationSChema>;

const BookForm = ({ }: Props) => {
  const { addBook, editBook, selectedBook, setSelectedBook } = useBook();

  const { setForm } = useModalForm();
  const {
    control,
    handleSubmit: handleSubmitForm,
    reset,
    formState,
    setValue,
  } = useForm({
    defaultValues: {
      name: selectedBook?.name || "",
      description: selectedBook?.description || "",
      price: +selectedBook?.price || 1000,
      author: selectedBook?.author || "",
      publicationDate: selectedBook?.publicationDate || "",
      tags: selectedBook?.tags || [],
    },
    resolver: zodResolver(validationSChema),
  });
  const [loading, { hideLoading, showLoading }] = useLoading();
  const { fetchTag, allTag } = useTag();

  useEffect(() => {
    console.log(selectedBook?.tags, "selectedBook");
  }, [selectedBook]);

  useEffect(() => {
    if (!selectedBook) return;
    reset({ ...selectedBook, tags: selectedBook.tags.map((tag) => tag.id) });
  }, [selectedBook]);

  useEffect(() => {
    fetchTag();
  }, []);

  const handleSumit = async (values: FormValues) => {
    showLoading();
    const newValues = { ...values, price: +values.price };

    //edit mode
    if (selectedBook) {
      await editBook(selectedBook.id, newValues);
    } else {
      await addBook(newValues);
    }
    hideLoading();
    reset();
    setSelectedBook(null)
    setForm(null)
  };
  const selectAllTag = () => {
    let allTagID: string[] = [];
    allTagID = allTag.map((item) => item.id);
    setValue("tags", allTagID);
  };
  const unselectAllTag = () => {
    const allTagID: never[] = [];
    setValue("tags", allTagID);
  };

  return (
    <form
      className="bg-white rounded p-5 space-y-2 shadow-lg border  relative"
      onSubmit={handleSubmitForm(handleSumit)}
    >
      <h3 className="text-center font-extrabold">Create Book</h3>

      <Switch>
        <Case condition={!loading}>
          <AppInput
            label="Book Name"
            name="name"
            control={control}
            error={Boolean(formState?.errors?.name)}
          />
          {formState?.errors?.name && (
            <Typography variant="small" color="red">
              {formState.errors?.name.message}
            </Typography>
          )}

          <AppTextarea
            label="Description"
            name="description"
            control={control}
            error={Boolean(formState?.errors?.description)}
          />
          {formState?.errors?.description && (
            <Typography variant="small" color="red">
              {formState.errors?.description.message}
            </Typography>
          )}

          <AppInput
            label="Price"
            name="price"
            control={control}
            type="number"
            error={Boolean(formState?.errors?.price)}
          />
          {formState?.errors?.price && (
            <Typography variant="small" color="red">
              {formState.errors?.price.message}
            </Typography>
          )}

          <AppInput
            label="Author"
            name="author"
            control={control}
            error={Boolean(formState?.errors?.author)}
          />
          {formState?.errors?.author && (
            <Typography variant="small" color="red">
              {formState.errors?.author.message}
            </Typography>
          )}

          <AppInput
            error={Boolean(formState?.errors?.publicationDate)}
            label="Publication Year"
            name="publicationDate"
            control={control}
          />
          {formState?.errors?.publicationDate && (
            <Typography variant="small" color="red">
              {formState.errors?.publicationDate.message}
            </Typography>
          )}
          <div className="flex justify-between">
            <Button size="sm" variant="filled" onClick={() => selectAllTag()}>
              Select all
            </Button>
            <Button
              size="sm"
              variant="outlined"
              onClick={() => unselectAllTag()}
            >
              Unselect
            </Button>
          </div>

          <div className="flex gap-1 flex-wrap">
            <AppChip options={allTag} name="tags" control={control} />
          </div>
          {formState?.errors?.tags && (
            <Typography variant="small" color="red">
              {formState.errors?.tags.message}
            </Typography>
          )}

          <div className="flex justify-around mt-4">
            <Button type="submit">Create</Button>
          </div>
          <div className="absolute -top-2 right-0">
            <Button
              disabled={loading}
              type="button"
              size="sm"
              variant="text"
              onClick={() => setForm(null)}
              className="text-2xl"
            >
              &times;
            </Button>
          </div>
        </Case>
        <Case condition={loading}>
          <div className="flex justify-center py-8">
            <Spinner className="h-12 w-12" />
          </div>
        </Case>
      </Switch>
    </form>
  );
};

export default BookForm;
