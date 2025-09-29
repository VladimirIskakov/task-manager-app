

# Task Manager App

Минимальный таск-менеджер на **React + TypeScript + Vite** с Firebase (авторизация и Firestore).

Опробовать можно по ссылке: description: https://tpu-test-task.web.app/


## 🔹 Требования

* Node.js >= 18
* npm >= 9

---

## 🔹 Установка

1. Клонируем репозиторий:

```bash
git clone <URL_репозитория>
cd task-manager-app
```

2. Устанавливаем зависимости:

```bash
npm install
```

3. Создаём файл `.env` в корне проекта и добавляем Firebase-конфигурацию:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

конфигурацию можно взять из своего проекта firebase

---

## 🔹 Запуск проекта

Для запуска локального сервера с HMR:

```bash
npm run dev
```

Сервер откроется по адресу:

```
http://localhost:5173
```

---

## 🔹 Сборка для продакшн

```bash
npm run build
```

Сборка будет в папке `dist/`.

Чтобы локально протестировать продакшн-версию:

```bash
npm run preview
```

---


## 🔹 Полезные команды

| Команда           | Описание                          |
| ----------------- | --------------------------------- |
| `npm run dev`     | Запуск dev-сервера с HMR          |
| `npm run build`   | Сборка продакшн версии            |
| `npm run preview` | Просмотр продакшн сборки локально |
| `npm run test`    | Запуск тестов                     |

---
