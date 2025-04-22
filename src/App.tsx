import React from "react";
import NewsSnippet from "./components/NewsSnippet/NewsSnippet"; // Импорт компонента
import { IData_SnippetNews } from "./components/NewsSnippet/interfaces"; // Импорт интерфейса
import "./App.css"; // Стили для App (можно удалить/изменить)

const App: React.FC = () => {
  // Пример данных (вставьте свои данные или загрузите их)
  const newsData: IData_SnippetNews = {
    ID: 260855433,
    TI: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones",
    AB: "...", // Полное содержимое
    URL: "https://www.globalsecuritymag.com/Mobile-bankers-left-vulnerable-47,20200819,101944.html",
    DP: "2025-03-06T21:00:00",
    DOM: "globalsecuritymag.com",
    SENT: "negative",
    LANG: "en",
    AU: ["Kaspersky Lab", "John Doe"],
    FAV: "/favicons/e65d69dc71ab539384fcc63062efdd3d.png", // Путь в папке public
    KW: [
      { value: "antivirus", count: 10 },
      { value: "kaspersky", count: 5 },
      { value: "new", count: 1 },
      { value: "security", count: 8 },
      { value: "mobile banking", count: 12 },
      { value: "vulnerability", count: 3 },
    ],
    HIGHLIGHTS: [
      "…20 by <kw>Kaspersky</kw> <kw>New</kw> research...",
      "…with <kw>antivirus</kw> or security software...",
      "…hone with <kw>antivirus</kw> protection...",
    ],
    REACH: 2392,
    CNTR: "France",
    CNTR_CODE: "fr",
    TRAFFIC: [
      { value: "India", count: 0.779 },
      { value: "USA", count: 0.101 },
      { value: "Mexico", count: 0.036 },
      { value: "UK", count: 0.08 },
    ],
  };

  return (
    // Стилизуем контейнер для темного фона, как на скриншоте
    <div
      style={{
        padding: "20px",
        backgroundColor: "#141414",
        minHeight: "100vh",
      }}
    >
      <h1>Пример новостного блока</h1>
      <NewsSnippet data={newsData} />
      {/* Можно добавить еще один блок для проверки */}
      {/* <NewsSnippet data={anotherNewsData} /> */}
    </div>
  );
};

export default App;
