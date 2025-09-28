import type { TaskFormValues } from "@/entities/tasks";
import { Form, Input, Select } from "antd";
import styles from "./TaskForm.module.scss";

const { Option } = Select;

type TaskFormProps = {
  form: any; 
  initialValues?: Partial<TaskFormValues>;
};

export const TaskForm = ({ form, initialValues }: TaskFormProps) => {
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues || { priority: "medium" }}
      className={styles.taskForm}
    >
      <Form.Item
        name="title"
        label="Название"
        rules={[{ required: true, message: "Введите название задачи" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Описание"
        rules={[{ required: true, message: "Введите описание задачи" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Приоритет"
        rules={[{ required: true, message: "Выберите приоритет" }]}
      >
        <Select>
          <Option value="low">Низкий</Option>
          <Option value="medium">Средний</Option>
          <Option value="high">Высокий</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
