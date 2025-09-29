import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Button, Input, Select, List, Typography, Spin, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./tasks.page.module.scss";
import { selectAuth } from "@/entities/auth";
import { Header } from "@/widgets/header";
import { TaskModal } from "@/widgets/taskModal";
import {
  createTask,
  deleteTask,
  fetchTasks,
  selectTasks,
  setFilter,
  setSearchQuery,
  updateTask,
  type TaskFormValues,
} from "@/entities/tasks";
import { TaskCard } from "@/widgets/taskCard";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export const TasksPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { items, loading, error, filter, searchQuery, loadingIds } =
    useAppSelector(selectTasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  // 🔹 Подключаем notification по доке
  const [api, contextHolder] = notification.useNotification();

  // Загружает задачи при наличии пользователя
  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user]);

  // 🔹 Отслеживаем ошибки/успехи и показываем уведомления
  useEffect(() => {
    if (error) {
      api.error({
        message: "Ошибка",
        description: error,
        placement: "topRight",
      });
    }
  }, [error, api]);

  // Открывает модальное окно для создания или редактирования задачи
  const openModal = (taskId?: string) => {
    setEditingTask(taskId || null);
    setIsModalOpen(true);
  };

  // Сохраняет изменения задачи или создаёт новую
  const handleSave = (values: TaskFormValues) => {
    if (!user) return;

    if (editingTask) {
      dispatch(updateTask({ id: editingTask, changes: values }))
        .unwrap()
        .then(() =>
          api.success({ message: "Задача обновлена", placement: "topRight" })
        )
        .catch(() =>
          api.error({ message: "Не удалось обновить задачу", placement: "topRight" })
        );
    } else {
      dispatch(createTask({ ...values, userId: user.uid }))
        .unwrap()
        .then((task) =>
          api.success({
            message: "Задача создана",
            description: `«${task.title}» успешно добавлена`,
            placement: "topRight",
          })
        )
        .catch(() =>
          api.error({ message: "Не удалось создать задачу", placement: "topRight" })
        );
    }

    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Фильтрует задачи по статусу и поисковому запросу
  const filteredItems = items.filter((task) => {
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className={styles["tasks-page__container"]}>
      {contextHolder}

      <Header />

      <div className={styles["tasks-page__header"]}>
        <Title level={2}>Ваши задачи</Title>
        <Paragraph>Управляйте делами и планами</Paragraph>
      </div>

      <div className={styles["tasks-page__controls"]}>
        <div className={styles["tasks-page__controls-search"]}>
          <Input.Search
            placeholder="Поиск задач"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            enterButton
            style={{ width: "100%" }}
          />
        </div>

        <div className={styles["tasks-page__controls-actions"]}>
          <Select
            value={filter}
            onChange={(value) => dispatch(setFilter(value))}
            style={{ width: "100%" }}
          >
            <Option value="all">Все</Option>
            <Option value="active">Активные</Option>
            <Option value="completed">Выполненные</Option>
          </Select>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
            style={{ width: "100%" }}
          >
            Новая задача
          </Button>
        </div>

        {loading && <Spin tip="Загрузка задач..." />}
        {error && <Paragraph type="danger">{error}</Paragraph>}

        <List
          className={styles["tasks-page__list"]}
          dataSource={filteredItems}
          renderItem={(task) => (
            <List.Item
              className={styles["tasks-page__list-item"]}
              key={task.id}
            >
              <TaskCard
                task={task}
                onEdit={(id) => openModal(id)}
                onDelete={(id) =>
                  dispatch(deleteTask(id))
                    .unwrap()
                    .then(() =>
                      api.success({ message: "Задача удалена", placement: "topRight" })
                    )
                    .catch(() =>
                      api.error({ message: "Не удалось удалить задачу", placement: "topRight" })
                    )
                }
                deleteLoading={loadingIds.includes(task.id)}
                toggleLoading={loadingIds.includes(task.id)}
                onToggleComplete={(id) =>
                  dispatch(updateTask({ id, changes: { completed: !task.completed } }))
                    .unwrap()
                    .then(() =>
                      api.success({ message: "Задача обновлена", placement: "topRight" })
                    )
                    .catch(() =>
                      api.error({ message: "Не удалось обновить задачу", placement: "topRight" })
                    )
                }
              />
            </List.Item>
          )}
        />
      </div>

      <TaskModal
        open={isModalOpen}
        initialValues={
          editingTask
            ? items.find((t) => t.id === editingTask) || undefined
            : undefined
        }
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
};
