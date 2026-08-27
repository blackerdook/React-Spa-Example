# World's Tallest Mountains (React SPA, COMP.7214 Assignment 1)

A full-screen single page application built with React 19 and Vite. It shows the
five tallest mountains in the world as a swipeable carousel with a top nav bar.

## Features
- Full-screen carousel, one mountain per slide.
- Swipe left/right (touch) or drag (mouse) to move between mountains.
- Nav bar links jump straight to a chosen mountain.
- Arrow buttons, dot indicators, and left/right keyboard arrows also navigate.
- Mountain scenery is drawn with CSS and SVG, so it works offline.

## How to run
1. Install Node.js (version 18 or newer).
2. In this folder, run:
   ```
   npm install
   npm run dev
   ```
3. Open the local URL shown in the terminal (usually http://localhost:5173).

## What it demonstrates
- A React app using useState, useEffect, and useRef.
- Rendering a list from a local data source.
- Handling user interaction (pointer/keyboard) to drive the UI.
