import { Chip, Radio } from "@material-tailwind/react";
import { useController } from "react-hook-form";
import { color } from "@material-tailwind/react/types/components/alert";

const options = [
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Green",
    value: "green",
  },
  {
    label: "Blue",
    value: "blue",
  },
  {
    label: "Purple",
    value: "purple",
  },
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Yellow",
    value: "yellow",
  },
  {
    label: "Pink",
    value: "pink",
  },
  {
    label: "Black",
    value: "black",
  },

];
interface Props {
  control: any;
}
const AppRadio = ({ control }: Props) => {
  const { field } = useController({
    name: "color",
    control,
  });

  return (
    <>
      {options.map((item, index) => (
        <Radio
          key={index}
          value={item.value}
          checked={field.value === item.value}
          onChange={(e) => field.onChange(e.target.value)}
          name="color"
          label={item.label}
          color={item.value as color}
          crossOrigin={undefined}
        />
      ))}
    </>
  );
};

export default AppRadio;
