import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import RegisterStudent from "./pages/RegisterStudent";
import PrivateRoute from "./components/PrivateRoutes";
import Client from "./pages/Client";
import LoginInstructor from "./pages/LoginInstructor";
import ProfessorClient from "./pages/ProfessorClient";
import Schedule from "./pages/Schedule";


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
    }
])



export default route