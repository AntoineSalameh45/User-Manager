import { Path, UseFormRegister, FieldValues } from "react-hook-form";

export interface iInputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: string;
}