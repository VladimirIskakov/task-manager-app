import { Card, Tag, Typography, Button } from "antd";
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
};

export const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) => {
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
          icon={task.completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? "Готово" : "В работе"}
        </Button>,
        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(task.id)} />,
        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => onDelete(task.id)} />,
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
