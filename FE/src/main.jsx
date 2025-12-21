import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import './styles/global.css'
import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './pages/error.jsx';
import BookPage from './pages/book.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/books",
        element: <BookPage />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode> 
  // StrictMode làm React chạy ở chế độ StrictMode (chế độ nghiêm ngặt) - nghĩa là nó sẽ kiểm tra và cảnh báo về các vấn đề tiềm ẩn trong ứng dụng của bạn, giúp bạn phát hiện lỗi sớm hơn trong quá trình phát triển.
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </StrictMode>,
)
