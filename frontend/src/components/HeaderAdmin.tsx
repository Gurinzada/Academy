import { useEffect, useState } from "react"
import { aluno } from "../services/interfaces/interfaces"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import styles from "../styles/Landing.module.scss"

export default function HeaderAdmin(){

    const [userInfo, setUserInfo] = useState<aluno | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAdminInfos = async() => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')

                if(!token || !role || Number(role) !== 1) return navigate(0)
                    const response = await api.get('/userinfo', {
                        headers:{
                            "Content-Type": "Application/json",
                            "Authorization": `Bearer ${token}`,
                            'x-role': role
                        }
                    })
                
                    if(response.status === 200){
                        setUserInfo(response.data)
                    }
            } catch {
                console.log(`Error`)
                navigate(0)
            }
        }
        fetchAdminInfos()
    },[])

    const handleLogout = async(e:React.FormEvent) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            if(!token || !role || Number(role) !== 1) return navigate(0)

                const response = await api.get('/logout', {
                    headers:{
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${token}`,
                        'x-role': role
                    }
                })
                if(response.status === 200 && response.data.removeToken){
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    navigate('/')
                }
        } catch {
            console.log(`Error`)
            navigate(0)
        }
    }

    return(
        <header className={styles.HeaderContainer}>
            <div>
                <h1 className={styles.Title}>Bem vindo, {userInfo?.name} {userInfo?.lastname}</h1>
                <p className={styles.Pnav} style={{paddingLeft: "0.35rem"}}>Confira o seu painel abaixo</p>
            </div>
            <div>
                <p onClick={handleLogout}><a style={{cursor:"pointer"}}>Logout</a></p>
            </div>
        </header>
    )
}