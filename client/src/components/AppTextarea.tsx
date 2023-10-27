import { Textarea } from "@material-tailwind/react";
import { useController } from "react-hook-form";

type Props = {
  name: string;
  control: any;
  label: string;
  error?: boolean;
};

const AppTextarea = ({ label, name, control,error }: Props) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <Textarea
      label={label}
      variant="outlined"
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      error={error}
    />
  );
};
export default AppTextarea;
