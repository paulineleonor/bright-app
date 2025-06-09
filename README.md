# Bright App

## Web App

This is a React application, uses Tailwind for theming.

You can get it running by doing:

```
npm install
npm run dev
```

# Running locally

Visit: http://localhost:5173

The app will automatically use 'batman' as the current user but the user can be manually edited in the URL.

# Mock users

Defined in UserController.ts:

const mockUsers = [
{ id: 1, name: "batman", dateCompleted: null },
{ id: 2, name: "robin", dateCompleted: "2025-06-09T11:45:18Z" },
];

# Structure

src/
├── api/ # Mock API calls
├── components/ # React UI components
├── data/
│ ├── controllers/ # Logic and state management
│ └── models/ # Core data models
├── assets/ # Icons/images
├── App.tsx # Entry point
└── main.tsx # App mount + Router setup

# To-do

- Handle error and loading states
- Add API calls to fetch previous answers and enable scrollback on each question to view the previous answer
- Add tests (Jest/React Testing Library)
