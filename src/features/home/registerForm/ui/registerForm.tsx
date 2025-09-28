import { Form, Input, Button, Typography, Alert, Card } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { registerUser, selectAuth } from "@/entities/auth";
import styles from "./registerForm.module.scss";

const { Title, Text, Link } = Typography;

type Props = {
  onSwitch: () => void;
};

export const RegisterForm = ({ onSwitch }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);

  const onFinish = async (values: any) => {
    const { email, password, displayName } = values;
    await dispatch(registerUser({ email, password, displayName }));
  };

  return (
    <Card className={styles.card} bordered={true}>
      <Title level={3} className={styles.title}>
        Регистрация
      </Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="displayName"
          label="Имя"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input placeholder="Имя" />
        </Form.Item>

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
          rules={[
            { required: true, message: "Введите пароль" },
            { min: 6, message: "Пароль должен быть не менее 6 символов" },
          ]}
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
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>

      <Text className={styles.switchText}>
        Уже есть аккаунт? <Link onClick={onSwitch}>Войти</Link>
      </Text>
    </Card>
  );
};
