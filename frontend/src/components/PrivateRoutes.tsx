import { Navigate } from "react-router-dom"

const isAutheticated = () => {
    const token = localStorage.getItem('token')
    return token !== null
}

const PrivateRoute = ({children}:{children:JSX.Element}) => {
    
    return isAutheticated() ? children : <Navigate to={"/"}/> 
}

export default PrivateRoute