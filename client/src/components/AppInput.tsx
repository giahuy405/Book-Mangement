import Input from "@material-tailwind/react/components/Input";
import { useController } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  control: any;
  error?: boolean;
  type?: string;
};

const AppInput = ({ label, control, name, error, type }: Props) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <Input
      type={type}
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      label={label}
      variant="outlined"
      crossOrigin={true}
      error={error}
    />
  );
};
export default AppInput;
