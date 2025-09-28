import { Form, Input, Button, Typography, Alert, Card } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { loginUser, selectAuth } from "@/entities/auth";
import styles from "./loginForm.module.scss";

const { Title, Text, Link } = Typography;

type Props = {
  onSwitch: () => void;
};

export const LoginForm = ({ onSwitch }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    await dispatch(loginUser({ email, password }));
  };

  return (
    <Card className={styles.card} bordered={true}>
      <Title level={3} className={styles.title}>
        Вход
      </Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Введите email" },
            { type: "email", message: "Некорректный email" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className={styles.alert}
          />
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>

      <Text className={styles.switchText}>
        Нет аккаунта? <Link onClick={onSwitch}>Регистрация</Link>
      </Text>
    </Card>
  );
};
