import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"
import { aluno } from "../services/interfaces/interfaces"
import styles from "../styles/Landing.module.scss"

export default function Header(){
    const [infosUser, setInfosUser] = useState<aluno | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const catchUserInfos = async () => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')

                if(!token || !role) return navigate('/')

                const response  = await api.get('/userinfo', {
                    headers:{
                        'Content-Type': "Application/json",
                        "Authorization": `Bearer ${token}`,
                        "x-role": role
                    }
                })
    
                if(response.status === 200){
                    setInfosUser(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        catchUserInfos()
    },[])

    const handleLogout = async() =>{
        try {
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            if(!token || !role) return
            
            const response = await api.get('/logout', {
                headers:{
                    'Content-Type': "Application/json",
                    "x-role": role,
                    "Authorization": `Bearer ${token}`,
                }
            })
            if(response.status === 200 && response.data.removeToken === true){
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                navigate(0)
            }
        } catch (error) {
            console.log(error)
        }
    } 

    return(
        <header className={styles.HeaderContainer}>
            <div>
                <h1 className={styles.Title}>Bem vindo, {infosUser?.name} {infosUser?.lastname}</h1>
            </div>
            <nav className={styles.Navbar}>
                <p className={styles.Pnav}><Link to={"/profile"} className={styles.Link}>Ver perfil</Link></p>
                <p className={styles.Pnav}><Link to={"/classes"} className={styles.Link}>Montar/Atualizar horário</Link></p>
            </nav>
            <div>
                <p className={styles.Pnav} onClick={handleLogout}><a style={{cursor:'pointer'}}>Logout</a></p>
            </div>
        </header>
    )
}