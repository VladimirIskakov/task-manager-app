import type { TaskFormValues } from "@/entities/tasks";
import { TaskForm } from "@/features/tasks/taskForm";
import { Modal, Form } from "antd";
import { useEffect } from "react";
import styles from "./TaskModal.module.scss";

type TaskModalProps = {
  open: boolean;
  initialValues?: Partial<TaskFormValues>;
  onCancel: () => void;
  onSubmit: (values: TaskFormValues) => void;
};

export const TaskModal = ({ open, initialValues, onCancel, onSubmit }: TaskModalProps) => {
  const [form] = Form.useForm<TaskFormValues>();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(
        initialValues || { title: "", description: "", priority: "medium" }
      );
    } else {
      form.resetFields(); 
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Modal
      open={open}
      title={initialValues ? "Редактировать задачу" : "Новая задача"}
      okText="Сохранить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={handleOk}
      className={styles.taskModal}
    >
      <TaskForm form={form} initialValues={initialValues} />
    </Modal>
  );
};
