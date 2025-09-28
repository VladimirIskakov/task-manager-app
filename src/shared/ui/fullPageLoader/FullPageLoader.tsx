import { Spin, Typography } from "antd";
import styles from "./FullPageLoader.module.scss";

const { Text } = Typography;

export const FullPageLoader = () => {
  return (
    <div className={styles.container}>
      <Spin size="large" />
      <Text className={styles.text}>Пожалуйста, подождите...</Text>
    </div>
  );
};
