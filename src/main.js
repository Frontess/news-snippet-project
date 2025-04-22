"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
const App_tsx_1 = require("./App.tsx"); // Импортируем главный компонент
require("./index.css"); // Импортируем глобальные стили (если есть)
require("antd/dist/reset.css"); // Импортируем базовые стили Ant Design
// Находим корневой элемент в index.html и рендерим в него компонент App
client_1.default.createRoot(document.getElementById("root")).render(<react_1.default.StrictMode>
    <App_tsx_1.default />
  </react_1.default.StrictMode>);
