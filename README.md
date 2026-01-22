# Color Picker

Simple color picker built with Vue 3 and Nuxt.

The goal of this project is to provide a clean and extensible color picker implementation **without using any third-party UI or color libraries**, focusing on clarity, maintainability, and core logic.

---

## Features

- Hue and saturation selection using a canvas-based color wheel
- Brightness control with a slider
- Preset color selection
- Live color preview
- Mouse, touch and pointer drag support
- No external UI or color libraries used

---

## Tech stack

- Vue 3 (Composition API)
- Nuxt
- TypeScript
- HTML Canvas
- Vitest (unit testing)

---

## Project structure

The project is kept simple and modular:

- Color-related math (HSV, clamping, conversions) is placed in `utils/color.ts`
- Color wheel math is extracted into `utils/wheelMath.ts`
- Canvas drawing logic is separated into `utils/drawWheel.ts`
- Vue components focus mainly on UI and user interaction

This structure keeps components smaller and makes the core logic easier to reason about and test.

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

---

## Testing

Unit tests are written for core color and math utilities using Vitest.

```bash
npm run test:run


