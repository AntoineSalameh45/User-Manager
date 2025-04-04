interface ButtonProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

const CustomButton = ({ 
    text,
    bgColor = "bg-blue-500",
    textColor = "text-white",}: ButtonProps) => {

  return (
    <button
      className={`py-2 px-2 sm:px-4 rounded-md ${bgColor} ${textColor}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
