import Checkbox from "@material-tailwind/react/components/Checkbox";
import Chip from "@material-tailwind/react/components/Chip";
import { color } from "@material-tailwind/react/types/components/chip";
import { useController } from "react-hook-form";
import { TagType } from "../types/tag";
import Skeleton from "react-loading-skeleton";
import { Case, Switch } from "react-if";

type Props = {
  name: string;
  control: any;
  options: TagType[];
};
const widthSklekton = [
  { id: 1, w: "30px" },
  { id: 2, w: "50px" },
  { id: 3, w: "60px" },
  { id: 5, w: "50px" },
  { id: 6, w: "60px" },
  { id: 7, w: "30px" },
  { id: 8, w: "60px" },
];

const TagSklekton = () => {
  return (
      <div className="flex flex-wrap gap-1">
         {widthSklekton.map(item=>
           <div
           key={item.id}
           className={`w-[${item.w}] bg-white rounded p-0.5 shadow-sm border`}
         >
           <Skeleton />
         </div>
          )}
      </div>
  );
};

const AppChip = ({ options, control, name }: Props) => {
  const { field } = useController({
    control,
    name,
    defaultValue: [],
  });

  return (
    <>
      <Switch>
        <Case condition={options?.length === 0}>
            <TagSklekton />
        </Case>
        <Case condition={options.length > 0}>
          {options?.map((item: TagType) => (
            <Chip
              key={item.id}
              value={item.name}
              variant="ghost"
              color={item.color as color}
              icon={
                <Checkbox
                  value={item.id}
                  onChange={() => {
                    if (field.value.includes(item.id)) {
                      field.onChange(
                        field.value.filter(
                          (v: any) => v.toString() !== item.id.toString()
                        )
                      );
                    } else {
                      field.onChange([...field.value, item.id]);
                    }
                  }}
                  checked={field.value.includes(item.id)}
                  color={item.color as color}
                  ripple={false}
                  containerProps={{ className: "p-0" }}
                  crossOrigin={undefined}
                />
              }
            />
          ))}
        </Case>
      </Switch>
    </>
  );
};
export default AppChip;
