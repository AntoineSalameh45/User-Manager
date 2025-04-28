# User Manager

A responsive, component-driven User Management interface built with React + TypeScript + TailwindCSS using Atomic Design principles.

---

## Features

- **Fully responsive layout**: Optimized for all screen sizes.
- **Reusable components**: Built with custom props for flexibility.
- **Theming support**: Light and dark modes using Zustand and CSS variables.
- **Atomic Design folder structure**: Organized for scalability and maintainability.
- **Data-driven rendering**: Fetch and display user data from a mock API.
- **Type safety**: Built with TypeScript for robust type checking.
- **Authentication**:
  - Login form with email and password validation.
  - Protected routes for authenticated users.
  - Persistent login state using Zustand and local storage.
- **User Management**:
  - Create new users with form validation.
  - Edit existing users with pre-filled forms.
  - Delete users with confirmation modals.
  - Search users by first name, last name, or email.
- **Mock API**:
  - Fully functional mock API for user CRUD operations.
  - Token-based authentication with JWT.
  - Search and filter users.
- **Error Handling**:
  - Graceful error messages for API failures.
  - Loading spinners for async operations.
- **UI Enhancements**:
  - Custom buttons, input fields, and select dropdowns.
  - Confirmation modals for critical actions.
  - Toast notifications for success and error messages.
- **Performance**:
  - Debounced search functionality for optimized API calls.
  - Lazy loading of routes for faster initial load.
- **Developer Tools**:
  - ESLint for code linting.
  - React Query for state management and caching.
  - React Hot Toast for notifications.

---

## Tech Stack

- **React** (with Vite)
- **TypeScript**
- **TailwindCSS**
- **Material UI (MUI)** – for theme icons
- **Atomic Design Architecture**
- **Zustand** - for global state management
- **React Query** - for API state management
- **Zod** - for schema validation
- **Vite Plugin Mock** - for mock API

---

## Installation

```bash
# Clone the repo
git clone https://github.com/AntoineSalameh45/User-Manager.git
cd User-Manager

# Install dependencies
npm install

# Start development server
npm run dev
```

---

👤 Author  
Made with ❤️ by Antoine Salameh  
Powered by XXL Zero Sugar, TypeScript, and pure frontend magic.