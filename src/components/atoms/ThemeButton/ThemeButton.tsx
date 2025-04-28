import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import useThemeStore from "../../../store/themeStore";

const ThemeButton = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      className="p-2 rounded-full bg-primary dark:bg-primary-dark text-white cursor-pointer transition-all duration-300"
      onClick={toggleTheme}
    >
      {isDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </button>
  );
};

export default ThemeButton;
