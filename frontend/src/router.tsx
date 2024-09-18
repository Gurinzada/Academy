import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import RegisterStudent from "./pages/RegisterStudent";


const route = createBrowserRouter([
    {
        path:'/',
        element: <Landing/>
    },
    {
        path:'/register',
        element: <RegisterStudent/>
    }
])



export default route