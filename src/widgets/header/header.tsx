import { type FC } from "react";
import { AuthDropdownWidget } from "@/widgets/authWidget";
import styles from "./header.module.scss";

export const Header: FC = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        <h1 className={styles["header__logo"]}>Task Manager</h1>
        <div className={styles["header__auth"]}>
          <AuthDropdownWidget />
        </div>
      </div>
    </header>
  );
};