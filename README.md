# Task 1: Frontend with a JavaScript Framework

## 📌 Overview
This project recreates the frontend using a modern JavaScript framework (**React**, **Vue**, or **Angular**) for better component-based development and maintainability. The goal is to leverage reusable UI components, proper state management, and smooth API integration.

---

## 🎯 Objectives
- Set up a project using one of the modern frameworks (React, Vue, or Angular).
- Use **functional components** and **state management**.
- Implement **API calls** and handle **loading/error states**.
- Create **reusable UI components** for consistency and scalability.

---

## 🚀 Tech Stack
Depending on the chosen framework, the stack may include:

- **React**
  - React 18+
  - React Hooks (useState, useEffect, etc.)
  - Context API / Redux (optional for state management)
  - Axios or Fetch API for API calls
  - CSS Modules / TailwindCSS / Styled Components

- **Vue**
  - Vue 3 with Composition API
  - Vuex / Pinia (for state management)
  - Axios or Fetch API
  - Vue Router
  - TailwindCSS / SCSS

- **Angular**
  - Angular 17+
  - RxJS for state and API handling
  - Angular Router
  - SCSS / TailwindCSS

---

## ⚙️ Project Setup

### React
```bash
npx create-react-app frontend-app
cd frontend-app
npm install axios
npm start
````

### Vue

```bash
npm init vue@latest frontend-app
cd frontend-app
npm install axios
npm run dev
```

### Angular

```bash
ng new frontend-app
cd frontend-app
npm install axios
ng serve
```

---

## 📂 Project Structure (React Example)

```
frontend-app/
│── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── hooks/           # Custom hooks
│   ├── services/        # API calls
│   ├── App.js
│   └── index.js
│── public/
│── package.json
```

---

## 🧩 Reusable Components

* Button
* Card
* Navbar
* Loading Spinner
* Modal

---

## ✅ Deliverables

* Functional frontend project using React/Vue/Angular.
* At least **3 reusable components**.
* API integration with loading/error handling.
* Clear **README.md** (this file).

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
