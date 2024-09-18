import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";


const route = createBrowserRouter([
    {
        path:'/',
        element: <Landing/>
    }
])



export default route