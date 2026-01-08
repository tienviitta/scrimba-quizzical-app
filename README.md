# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Fonts and Icons

This project includes:

### Montserrat Font

The Montserrat font family is included from Google Fonts with weights 400, 500, 600, and 700. To use it in your CSS:

```css
font-family: "Montserrat", sans-serif;
```

### Font Awesome Icons

Font Awesome 6.5.1 is available for free icons. Use icons in your JSX:

```jsx
// Checkmark icon
<i className="fa-solid fa-check"></i>

// X mark for wrong answers
<i className="fa-solid fa-xmark"></i>

// Question icon
<i className="fa-solid fa-circle-question"></i>

// Star icon
<i className="fa-solid fa-star"></i>
```

Browse all available icons at [fontawesome.com/icons](https://fontawesome.com/icons)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
