import { iCustomButtonProps } from "./CustomButton.type";

const CustomButton = ({
  text,
  bgColor = "bg-blue-500",
  textColor = "text-white",
  hoverBgColor = "hover:bg-blue-700",
  onClick,
}: iCustomButtonProps) => {
  return (
    <button
      className={`py-2 px-2 sm:px-4 rounded-md ${bgColor} ${textColor} ${hoverBgColor} cursor-pointer transition-all duration-300`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
