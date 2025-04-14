import { Outlet } from "react-router";
import { Navbar } from "../../components/organisims/Navbar";

const SharedLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow p-4 bg-[var(--color-pagebg)] overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
