import { Card, Tag, Typography, Button, Spin } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { Task } from "@/entities/tasks";
import styles from "./taskCard.module.scss";
import { Timestamp } from "firebase/firestore";

const { Paragraph, Text } = Typography;

type TaskCardProps = {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  deleteLoading?: boolean;
  toggleLoading?: boolean;
};

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  deleteLoading = false,
  toggleLoading = false,
}: TaskCardProps) => {
  const priorityColor =
    task.priority === "high" ? "red" : task.priority === "medium" ? "orange" : "blue";

  return (
    <Card
      className={styles["task-card"]}
      title={task.title}
      extra={<Tag color={priorityColor}>{task.priority}</Tag>}
      actions={[
        <Button
          type="link"
          icon={toggleLoading ? <Spin size="small" /> : task.completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          onClick={() => onToggleComplete(task.id)}
          disabled={toggleLoading}
        >
          {task.completed ? "Готово" : "В работе"}
        </Button>,
        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(task.id)} disabled={toggleLoading}/>,
        <Button
          type="link"
          danger
          icon={deleteLoading ? <Spin size="small" /> : <DeleteOutlined />}
          onClick={() => onDelete(task.id)}
          disabled={deleteLoading}
        />,
      ]}
    >
      <Paragraph className={styles["task-card__description"]}>{task.description}</Paragraph>
      <Text type="secondary" className={styles["task-card__date"]}>
        Создано: {task.createdAt instanceof Timestamp
            ? task.createdAt.toDate().toLocaleString()
            : task.createdAt.toLocaleString()}
      </Text>
    </Card>
  );
};
