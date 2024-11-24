import { HTMLInputTypeAttribute } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormField = <T extends FieldValues>({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
}: FormFieldProps<T>) => {
  return (
    <div className="space-y-2">
      {!!label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="mt-2"
      />
      {errors[name]?.message && (
        <p className="text-red-600 text-sm mt-1">{`${errors[name]?.message}`}</p>
      )}
    </div>
  );
};

export default FormField;
