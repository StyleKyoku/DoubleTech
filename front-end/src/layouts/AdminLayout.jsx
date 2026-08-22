import { Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import Sidebar from "../components/Admin/Sidebar/Sidebar";

export default function AdminLayout() {
  return (
    <>
      <main className={styles["admin-layout"]}>
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
}
