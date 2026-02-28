# Emoji Picker Component

A reusable emoji picker component built with React and TypeScript, inspired by messaging apps like Telegram and WhatsApp.

## Setup

**Prerequisites:** Node.js 16+ and npm

```bash
# Install dependencies (includes Tailwind CSS)
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`.

## Features

### Core
- Text input field with live preview
- Emoji picker button that toggles an overlay
- Grid of 30 emojis, selectable by click
- Clicking outside the overlay closes it

### Bonus Features (all implemented)

**Keyboard Navigation**
- `Arrow keys` — navigate through the emoji grid
- `↓` from the search input focuses the first emoji
- `Enter` — inserts the focused emoji into the input
- `Escape` — closes the overlay

**Emoji Search**
- Search bar filters emojis by name in real time
- Supports partial matches (e.g. `"og"` → 🐶 dog, 🐸 frog)
- Result count displayed; empty state shown when no matches

**Category Grouping**
- Three categories: Smileys, Gestures, Animals
- Tab bar with category icon and label
- Category tabs hidden during active search

## Tech Stack

- **React 18** with **TypeScript**
- **Tailwind CSS v3** for styling
- **Vite** as the build tool
- No third-party UI component libraries

## Project Structure

```
src/
├── components/
│   └── EmojiPicker/
│       ├── EmojiPicker.tsx       # Main component
│       ├── EmojiPicker.module.css
│       ├── emojis.ts             # Emoji data with names for search
│       └── index.ts              # Barrel export
├── App.tsx                       # Demo shell (input + picker)
├── App.module.css
├── index.css                     # Global design tokens
└── main.tsx
```

## Component API

```tsx
import { EmojiPicker } from './components/EmojiPicker';

<EmojiPicker onEmojiSelect={(emoji: string) => { /* handle */ }} />
```

| Prop | Type | Description |
|------|------|-------------|
| `onEmojiSelect` | `(emoji: string) => void` | Called when an emoji is clicked or selected via Enter |
