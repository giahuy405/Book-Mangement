import { Button, Chip, Spinner, Typography } from "@material-tailwind/react";
import useModalForm from "../stores/formModal";
import { z } from "zod";
import AppInput from "./AppInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoading } from "../hooks/useLoading";
import { useTag } from "../hooks/useTag";
import { useEffect } from "react";
import { color } from "@material-tailwind/react/types/components/alert";
import AppRadio from "./AppRadio";
const validationSChema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" }),
  color: z.string().min(1, { message: "choose color plz" }),
});
type FormValues = z.infer<typeof validationSChema>;

const TagForm = () => {
  const { setForm } = useModalForm();
  const { allTag, fetchTag, addTag, deleteTag, setAllTag } = useTag();

  const [loading, { hideLoading, showLoading }] = useLoading();
  const {
    control,
    handleSubmit: handleSubmitForm,
    reset,
    formState,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      color: "",
    },
    resolver: zodResolver(validationSChema),
  });

  const handleSumit = async (values: FormValues) => {
    showLoading();
    console.log(values);
    // fetch
    addTag(values);
    hideLoading();

    reset();
  };
  useEffect(() => {
    fetchTag();
  }, []);
  return (
    <form
      className="bg-white rounded p-5 space-y-2 shadow-lg border  relative"
      onSubmit={handleSubmitForm(handleSumit)}
    >
      <h3>Create Tag</h3>
      <div className="flex gap-1 flex-wrap">
        {allTag.map((item) => (
          <button
            type="button"
            disabled={loading} // 
            className="relative group"
            onClick={() => {
              setAllTag(allTag.filter((item2) => item2.id !== item.id));
              deleteTag(item.id);
            }}
          >
            <Chip key={item.id} value={item.name} color={item.color as color} />
            <div className="absolute inset-0 bg-opacity-80 bg-blue-gray-800 rounded-lg flex justify-center text-white opacity-0  group-hover:opacity-100 cursor-pointer">
              {loading ? <Spinner className="w-5" /> : <>&times;</>}
            </div>
          </button>
        ))}
      </div>
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

      <AppRadio control={control} />
      {formState?.errors?.color && (
        <Typography variant="small" color="red">
          {formState.errors?.color.message}
        </Typography>
      )}
      <div className="flex justify-around mt-4">
        <Button type="submit">Create</Button>
      </div>
      <div className="absolute -top-2 right-0">
        <Button
          type="button"
          size="sm"
          variant="text"
          onClick={() => setForm(null)}
          className="text-2xl"
        >
          &times;
        </Button>
      </div>
    </form>
  );
};

export default TagForm;
