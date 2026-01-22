# Color Picker

Simple color picker built with Vue 3 and Nuxt.

This project was created as a technical task after an interview.
The main goal was to build a color picker **without using any third-party UI or color libraries**, while keeping the code readable and easy to extend.

---

## Features

- Hue and saturation selection using a canvas-based color wheel
- Brightness control with a slider
- Preset color selection
- Live color preview
- Mouse, touch and pointer drag support
- No external libraries used

---

## Tech stack

- Vue 3 (Composition API)
- Nuxt
- TypeScript
- HTML Canvas

---

## Project structure

I tried to keep the project simple and modular:

- Color-related math (HSV, clamping, conversions) is placed in `utils/color.ts`
- Color wheel math is extracted into `utils/wheelMath.ts`
- Canvas drawing logic is separated into `utils/drawWheel.ts`
- Vue components focus mainly on UI and user interaction

This structure helps keep the components smaller and makes the core logic easier to reason about.

---

## Accessibility and UX

- Pointer events are used to support both mouse and touch interactions
- Cursor states change during drag interactions
- Components communicate via explicit props and events

---

## Running the project

```bash
npm install
npm run dev
