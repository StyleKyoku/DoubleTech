import React from "react";
import styles from "./AdminDashboard.module.scss";

import { useAuth } from "../../../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <section className={styles["admin-dashboard"]}>
      <div className={styles["main-content"]}>
        <div className={styles["dashboard-header"]}>
          <h1>Welcome, {user?.name}!</h1>
        </div>
        <div className={styles["dashboard-content"]}></div>
      </div>
    </section>
  );
}
