import { FieldValues } from "react-hook-form";
import { iInputFieldProps } from ".";

const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
}: iInputFieldProps<T>) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-semibold text-txt dark:text-txt-dark mb-1">{label}</label>
    <input
      type={type}
      {...register(name)}
      className={`bg-pagebg dark:bg-pagebg-dark66 px-3 py-2 border rounded-md text-sm text-txt dark:text-txt-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:ring-white dark:focus:border-[#ffffff66] ${
        error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
      }`}
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export default InputField;
