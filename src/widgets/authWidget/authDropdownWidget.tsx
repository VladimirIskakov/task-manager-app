import { useState } from "react";
import { Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MyDropdown } from "@/shared/ui";
import { RegisterForm } from "@/features/home/registerForm";
import { LoginForm } from "@/features/home/loginForm";
import styles from "./authDropdownWidget.module.scss";
import { logoutUser, selectAuth } from "@/entities/auth";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

export const AuthDropdownWidget = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { user, loading } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const dropdownContent = (
    <div className={styles["auth-widget__dropdown"]}>
      {!user ? (
        isRegister ? (
          <RegisterForm onSwitch={() => setIsRegister(false)} />
        ) : (
          <LoginForm onSwitch={() => setIsRegister(true)} />
        )
      ) : (
        <Button
          type="primary"
          danger
          block
          loading={loading}
          onClick={handleLogout}
        >
          Выйти
        </Button>
      )}
    </div>
  );

  return (
    <Space direction="vertical" className={styles["auth-widget"]}>
      <MyDropdown
        content={dropdownContent}
        icon={<UserOutlined />}
        triggerText={!user ? "Войти" : "Меню"}
      />
    </Space>
  );
};
