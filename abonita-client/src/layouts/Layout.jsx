import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-200 text-zinc-900 flex flex-col">
      <NavBar />
      <main className="flex-grow pb-5 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
