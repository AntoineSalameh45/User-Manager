import CustomButton from "../atoms/CustomButton";
import ThemeButton from "../atoms/ThemeButton";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-[#3251D0] shadow-lg w-full p-4">
      <h2 className="text-white text-xl">User Management</h2>
      <div className="flex items-center gap-2 text-sm">
        <CustomButton text="Create User" bgColor="bg-white" textColor="text-[#3251D0]" />
        <CustomButton text="Logout" bgColor="bg-red-500" textColor="text-white" />
        <ThemeButton />
      </div>
    </div>
  );
};

export default Navbar;
