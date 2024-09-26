import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { aluno } from "../services/interfaces/interfaces"

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
    return(
        <header>
            <div>
                <h3>Bem vindo, {infosUser?.name} {infosUser?.lastname}</h3>
            </div>
        </header>
    )
}