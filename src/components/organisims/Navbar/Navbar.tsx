import { Link, useNavigate } from "react-router";
import { CustomButton } from "../../atoms/CustomButton";
import { ThemeButton } from "../../atoms/ThemeButton";
import useSessionStore from "../../../store/authStore";

const Navbar = () => {
  const clearToken = useSessionStore((state) => state.clearToken);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-primary dark:bg-primary-dark shadow-lg w-full p-4 transition-all">
      <Link to="/dashboard">
        <h2 className="text-white text-xl select-none">User Management</h2>
      </Link>
      <div className="flex items-center gap-2 text-sm">
        <CustomButton
          text="Create User"
          bgColor="bg-white"
          textColor="text-primary"
          hoverBgColor="hover:bg-[#ffffffdd]"
          onClick={() => navigate("/dashboard/new")}
        />
        <CustomButton
          text="Logout"
          bgColor="bg-red-500"
          textColor="text-white"
          hoverBgColor="hover:bg-red-700"
          onClick={handleLogout}
        />
        <ThemeButton />
      </div>
    </div>
  );
};

export default Navbar;
