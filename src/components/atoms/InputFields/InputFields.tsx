import { FieldValues } from "react-hook-form";
import { iInputFieldProps } from "./InputFields.type";

const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
}: iInputFieldProps<T>) => (
  <div>
    <label className="block text-sm font-medium text-txt">{label}</label>
    <input
      type={type}
      {...register(name)}
      className={`mt-1 block px-4 w-full h-10 rounded-md bg-pagebg border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default InputField;
