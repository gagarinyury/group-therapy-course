# Интерактивный курс групповой терапии

Веб-приложение для изучения групповой терапии с интерактивными элементами, адаптированное для Telegram Web App.

## 🚀 Быстрый старт

1. Установите зависимости:
```bash
npm install
```

2. Запустите приложение:
```bash
npm start
```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
src/
├── types/lesson.ts        # TypeScript типы
├── components/
│   ├── course/            # Компоненты главной страницы
│   ├── lesson/            # Компоненты урока
│   └── blocks/            # 12 типов блоков контента
├── hooks/                 # React хуки
├── data/lessons/          # JSON файлы с уроками
└── utils/                 # Утилиты
```

## 🎯 Основные функции

- **14 интерактивных уроков** по групповой терапии
- **12 типов блоков контента**:
  - VideoBlock - видео материалы
  - IllustrationBlock - иллюстрации
  - TheoryBlock - теоретические карточки
  - BookQuoteBlock - цитаты из книг
  - MovieBlock - связанные фильмы
  - CaseBlock - практические кейсы
  - OpenQuestionBlock - открытые вопросы
  - QuizBlock - тесты
  - ReflectionBlock - рефлексия
  - SummaryBlock - выводы
  - SelfCheckBlock - самопроверка
  - HeaderBlock - заголовки

- **Прогресс пользователя** сохраняется в LocalStorage
- **Адаптивный дизайн** для Telegram Web App
- **Темная/светлая тема** по системным настройкам

## 🛠 Технологии

- React + TypeScript
- Tailwind CSS
- Lucide React (иконки)
- React Router
- LocalStorage API

## 📝 Добавление новых уроков

Создайте новый JSON файл в папке `src/data/lessons/`:

```json
{
  "id": 2,
  "title": "Название урока",
  "description": "Описание урока",
  "blocks": [
    {
      "id": "block-1",
      "type": "header",
      "order": 1,
      "content": {
        "title": "Заголовок",
        "subtitle": "Подзаголовок"
      }
    }
  ]
}
```

## 🔧 Настройка для production

1. Создайте оптимизированную сборку:
```bash
npm run build
```

2. Содержимое папки `build/` можно развернуть на любом статическом хостинге.

## 🎨 Кастомизация

### Цвета
Основные цвета определены в `src/index.css`:
```css
:root {
  --color-primary: #0088cc;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
}
```

### Стили блоков
Каждый блок имеет свой компонент в `src/components/blocks/`.

## 📱 Telegram Web App

Приложение оптимизировано для работы в Telegram:
- Mobile-first дизайн
- Touch-friendly интерфейс (кнопки ≥44px)
- Отсутствие горизонтального скролла
- Быстрая загрузка (bundle < 500KB)

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature ветку
3. Commit изменения
4. Push в ветку
5. Создайте Pull Request

## 📄 Лицензия

MIT