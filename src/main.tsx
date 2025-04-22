import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // Импортируем главный компонент
import "./index.css"; // Импортируем глобальные стили (если есть)
import "antd/dist/reset.css"; // Импортируем базовые стили Ant Design

// Находим корневой элемент в index.html и рендерим в него компонент App
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
