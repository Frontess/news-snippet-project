// NewsSnippet.tsx
import React, { useState } from 'react';
import { Card, Tag, Button, Typography, Space, Tooltip, Divider, Avatar } from 'antd';
import {
  GlobalOutlined,
  TeamOutlined,
  LinkOutlined,
  CopyOutlined, // Пример иконок действий
  StarOutlined, // Пример иконок действий
} from '@ant-design/icons';
import { format, parseISO } from 'date-fns'; // Для форматирования даты
import ReactCountryFlag from 'react-country-flag'; // Для флагов стран
import { IData_SnippetNews, IData_TagItem, IData_TrafficItem } from './interfaces'; // Импорт интерфейсов
import './NewsSnippet.scss'; // Импорт стилей

const { Text, Title, Paragraph, Link } = Typography;

// --- Вспомогательные функции ---

// Форматирование охвата
const formatReach = (reach: number): string => {
  if (reach >= 1000) {
    return `${(reach / 1000).toFixed(0)}K Reach`; // Округляем до целых тысяч
  }
  return `${reach} Reach`;
};

// Форматирование трафика
const formatTraffic = (traffic: IData_TrafficItem[], count: number = 3): string => {
  if (!traffic || traffic.length === 0) return '';
  // Сортируем по убыванию и берем топ N
  const topTraffic = [...traffic]
    .sort((a, b) => b.count - a.count)
    .slice(0, count);
  return `Top Traffic: ${topTraffic
    .map(item => `${item.value} ${Math.round(item.count * 100)}%`) // Преобразуем долю в проценты
    .join(' ')}`;
};

// Определение цвета тега сантимента
const getSentimentColor = (sentiment: string): string => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return 'success'; // Зеленый
    case 'negative':
      return 'error'; // Красный
    case 'neutral':
      return 'processing'; // Синий (можно выбрать другой)
    default:
      return 'default'; // Серый
  }
};

// Рендер контента с подсветкой ключевых слов
const renderHighlightedContent = (highlights: string[]): React.ReactNode => {
    // Объединяем все блоки хайлайтов для простоты
    const fullHighlight = highlights.join(' ');
    // Используем регулярное выражение для замены <kw>...</kw> на <strong class="highlighted-keyword">...</strong>
    // Важно: dangerouslySetInnerHTML несет риски XSS, если 'fullHighlight' может содержать вредоносный HTML.
    // В данном случае, предполагаем, что <kw> добавляется на бэкенде и контент внутри безопасен.
    // Для большей безопасности можно использовать библиотеки типа DOMPurify или парсить строку вручную.
    const processedHtml = fullHighlight.replace(
        /<kw>(.*?)<\/kw>/g,
        '<strong class="highlighted-keyword">$1</strong>'
    );
    return <span dangerouslySetInnerHTML={{ __html: processedHtml }} />;
};


// --- Пропсы компонента ---
interface NewsSnippetProps {
  data: IData_SnippetNews;
  // Можно добавить базовый URL для относительных ссылок на favicon, если нужно
  // baseUrl?: string;
  // Можно добавить колбэки для кнопок действий
  // onCopy?: (data: IData_SnippetNews) => void;
  // onSave?: (data: IData_SnippetNews) => void;
}

// --- Компонент ---
const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const MAX_VISIBLE_TAGS = 5; // Сколько тегов показывать по умолчанию

  const {
    DP, REACH, TRAFFIC, SENT, TI, FAV, DOM, URL, CNTR, CNTR_CODE, LANG, AU, HIGHLIGHTS, KW
  } = data;

  const formattedDate = DP ? format(parseISO(DP), 'dd MMM yyyy') : 'No date';
  const formattedReach = formatReach(REACH);
  const formattedTraffic = formatTraffic(TRAFFIC);
  const sentimentColor = getSentimentColor(SENT);

  // Обработка относительного URL для favicon
  const faviconUrl = FAV?.startsWith('/') ? `${window.location.origin}${FAV}` : FAV;

  const visibleTags = showAllTags ? KW : KW?.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTagsCount = KW?.length > MAX_VISIBLE_TAGS ? KW.length - MAX_VISIBLE_TAGS : 0;

  return (
    <Card className="news-snippet-card" bordered={false}>
      {/* Верхняя строка: Дата, Охват, Трафик, Сантимент, Кнопки */}
      <div className="snippet-header">
        <Space size="middle" wrap>
          <Text type="secondary">{formattedDate}</Text>
          <Text strong>{formattedReach}</Text>
          {formattedTraffic && <Text type="secondary">{formattedTraffic}</Text>}
        </Space>
        <Space className="snippet-actions" size="small">
            {SENT && (
                <Tag color={sentimentColor} className="sentiment-tag">
                    {SENT.charAt(0).toUpperCase() + SENT.slice(1)}
                </Tag>
            )}
            {/* Пример кнопок действий */}
            <Tooltip title="Copy link">
                 <Button type="text" icon={<CopyOutlined />} shape="circle" /* onClick={() => onCopy?.(data)} */ />
            </Tooltip>
             <Tooltip title="Open original">
                <Button type="text" icon={<LinkOutlined />} shape="circle" href={URL} target="_blank" />
             </Tooltip>
             <Tooltip title="Save">
                <Button type="text" icon={<StarOutlined />} shape="circle" /* onClick={() => onSave?.(data)} */ />
             </Tooltip>
        </Space>
      </div>

      {/* Заголовок */}
      <Title level={4} className="snippet-title">
        <Link href={URL} target="_blank" rel="noopener noreferrer">
            {TI}
        </Link>
      </Title>

      {/* Информация об источнике */}
      <div className="snippet-source-info">
        <Space size="middle" wrap>
          <Space size="small">
             <Avatar src={faviconUrl} size={16} shape="square" className="favicon">
               {!FAV && DOM?.[0]?.toUpperCase()} {/* Fallback if no favicon */}
             </Avatar>
            <Link href={`http://${DOM}`} target="_blank" rel="noopener noreferrer">
              {DOM}
            </Link>
          </Space>
          {CNTR_CODE && (
            <Space size="small">
               <ReactCountryFlag countryCode={CNTR_CODE} svg style={{ width: '1em', height: '1em' }}/>
              <Text>{CNTR}</Text>
            </Space>
          )}
           {LANG && (
             <Space size="small">
               <GlobalOutlined />
               <Text>{LANG.toUpperCase()}</Text>
             </Space>
           )}
          {AU && AU.length > 0 && (
            <Space size="small">
              <TeamOutlined />
              <Text type="secondary">{AU.join(', ')}</Text>
            </Space>
          )}
        </Space>
      </div>

      {/* Контент (Highlights) */}
       {HIGHLIGHTS && HIGHLIGHTS.length > 0 && (
        <Paragraph className="snippet-content" ellipsis={{ rows: 3, expandable: true, symbol: 'Show more' }}>
          {renderHighlightedContent(HIGHLIGHTS)}
        </Paragraph>
       )}

      {/* Теги (Keywords) */}
      {KW && KW.length > 0 && (
        <div className="snippet-tags">
          <Space wrap size={[4, 8]}>
            {visibleTags.map((tag) => (
              <Tag key={tag.value} className="keyword-tag">
                {tag.value} {tag.count > 1 ? <Text type="secondary">({tag.count})</Text> : ''}
              </Tag>
            ))}
            {hiddenTagsCount > 0 && !showAllTags && (
              <Button type="link" size="small" onClick={() => setShowAllTags(true)} className="show-all-tags-button">
                Show All +{hiddenTagsCount}
              </Button>
            )}
            {showAllTags && (
                 <Button type="link" size="small" onClick={() => setShowAllTags(false)} className="show-all-tags-button">
                    Show less
                 </Button>
            )}
          </Space>
        </div>
      )}

      {/* Кнопка "Original Source" */}
      <Divider className="snippet-divider" />
      <Button type="default" href={URL} target="_blank" rel="noopener noreferrer" className="original-source-button">
        Original Source
      </Button>
    </Card>
  );
};

export default NewsSnippet;