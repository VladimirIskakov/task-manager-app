import { Navigate } from "react-router-dom";
import { Typography } from "antd";
import { useAppSelector } from "@/shared/lib";
import { selectAuth } from "@/entities/auth";
import { Header } from "@/widgets/header";
import { authArrow } from "@/assets";
import styles from "./home.page.module.scss";

const { Title, Paragraph } = Typography;

export const HomePage = () => {
  const { user } = useAppSelector(selectAuth);

  if (user) return <Navigate to="/tasks" replace />;

  return (
    <div className={styles["home-page__container"]}>
      <Header />
      <div className={styles["home-page__content"]}>
        <Title level={1} className={styles["home-page__title"]} >
          Добро пожаловать в Task Manager!
        </Title>
        <Paragraph className={styles["home-page__subtitle"]}>
          Чтобы начать работу, пожалуйста, зарегистрируйтесь или войдите в систему.
        </Paragraph>
        <img
          src={authArrow}
          alt="arrow"
          className={styles["home-page__arrow"]}
        />
      </div>
    </div>
  );
};
