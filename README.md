# Визитка на React Bits

Одностраничный сайт-визитка: тёмный неоновый стиль, анимированный фон, карточки контактов.
Собран на Vite + React 19 + TypeScript + Tailwind CSS v4, анимации — компоненты [React Bits](https://reactbits.dev).

## Локальный запуск

```bash
npm install
npm run dev
```

Сборка и предпросмотр production-версии:

```bash
npm run build
npm run preview
```

## Что где править

Почти весь контент лежит в начале `src/App.tsx`:

- `profile` — имя, инициалы, роль, город, формат работы, email, телефон, ссылки;
- `contacts` — четыре карточки контактов (подпись, значение, ссылка, иконка, цвет подсветки);
- `skills` — список технологий.

Цвета и шрифты — в `src/index.css` (блок `@theme`).
Фавиконка — `public/favicon.svg`.

## Компоненты React Bits

Установлены через shadcn-реестр (`components.json` → `@react-bits`):

| Компонент | Где используется |
| --- | --- |
| `Aurora` | анимированный фон в шапке |
| `SplitText` | появление имени по буквам |
| `ShinyText` | блик по строке с ролью |
| `GradientText` | градиентный заголовок «Давайте поговорим» |
| `SpotlightCard` | карточки контактов с подсветкой под курсором |
| `StarBorder` | главная кнопка «Написать в Telegram» |
| `ClickSpark` | искры при клике по странице |

Добавить ещё компонент:

```bash
npx shadcn@latest add @react-bits/ИмяКомпонента-TS-TW
```

> В `src/components/Aurora.tsx` убран вызов `WEBGL_lose_context` при размонтировании:
> в React StrictMode эффекты монтируются дважды, и потерянный контекст давал белый canvas.

## Деплой

Production-сборка складывается в папку `docs/` (см. `vite.config.ts`):

```bash
npm run build
```

GitHub Pages отдаёт сайт из ветки `main`, папка `/docs`. Файл `public/.nojekyll` отключает
обработку Jekyll, чтобы отдавались все ассеты.

Сайт будет доступен по адресу `https://<username>.github.io/<repo>/`.

## Плейсхолдеры

Данные в `profile` и `contacts` — демонстрационные. Замените их на свои перед публикацией.
