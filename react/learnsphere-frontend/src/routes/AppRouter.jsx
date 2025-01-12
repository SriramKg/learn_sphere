import { createBrowserRouter, Navigate, Router, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../pages/StudentDashboard";
import InstructorDashboard from "../pages/InstructorDashboard";
import CreateCourse from "../pages/CreateCourse";
import EditCourse from "../pages/EditCourse";
import CourseDetails from "../pages/CourseDetails";

const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RegisterPage />
        },
        {
            path: "/register",
            element: <RegisterPage />
        },
        {
            path: "/login",
            element: <LoginPage />
        },
        {
            path: "/student-dashboard",
            element: <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>
        },
        {
            path: "/instructor-dashboard",
            element: <ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute> 
        },
        {
            path: "/create-course",
            element: <ProtectedRoute role="instructor"><CreateCourse /></ProtectedRoute>
        },
        {
            path: "/edit-course/:id",
            element: <ProtectedRoute role="instructor"><EditCourse /></ProtectedRoute>
        },
        {
            path: "course-details/:id",
            element: <ProtectedRoute role="instructor"><CourseDetails /></ProtectedRoute>
        }
    ]);

    return ( 
        <RouterProvider router={router} />
     );
}
 
export default AppRouter;