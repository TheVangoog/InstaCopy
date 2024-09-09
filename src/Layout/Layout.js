import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import "../Assets/styles/Layout.scss";
import Footer from "../Components/Footer/Footer";

export default function Layout() {
  return (
    <>
      <main className="main bg-black grid grid-cols-12 grid-rows-12 md:divide-x divide-slate-100/25">
        <Sidebar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
