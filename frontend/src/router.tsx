import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import RegisterStudent from "./pages/RegisterStudent";
import PrivateRoute from "./components/PrivateRoutes";
import Client from "./pages/Client";
import LoginInstructor from "./pages/LoginInstructor";
import ProfessorClient from "./pages/ProfessorClient";
import Schedule from "./pages/Schedule";
import Approve from "./pages/Approve";
import LoginAdmin from "./pages/LoginAdmin";
import Admin from "./pages/Admin";


const route = createBrowserRouter([
    {
        path:'/',
        element: <Landing/>
    },
    {
        path:'/register',
        element: <RegisterStudent/>
    },
    {
        path:"/client",
        element: <PrivateRoute><Client/></PrivateRoute>
    },
    {
        path: "/logininstructor",
        element: <LoginInstructor/>
    },
    {
        path:"/clientprof",
        element: <PrivateRoute><ProfessorClient/></PrivateRoute>
    },
    {
        path:"/classes",
        element: <PrivateRoute><Schedule/></PrivateRoute>
    },
    {
        path:"/approvearea",
        element: <PrivateRoute><Approve/></PrivateRoute>
    },
    {
        path:"/admin",
        element: <LoginAdmin/>
    },
    {
        path: "/adminarea",
        element: <PrivateRoute><Admin/></PrivateRoute>
    }
])



export default route