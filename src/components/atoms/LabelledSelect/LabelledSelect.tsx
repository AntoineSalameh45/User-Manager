import { iLabelledSelectProps } from ".";

const LabelledSelect = ({ label, name, options, register, error }: iLabelledSelectProps) => (
  <div className="flex flex-col w-80">
    <label className="text-sm font-medium mb-1">{label}</label>
    <select
      {...register(name)}
      className="border bg-pagebg border-gray-300 p-2 rounded focus:outline-primary"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default LabelledSelect;
