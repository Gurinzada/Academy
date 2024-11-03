import { useNavigate } from "react-router-dom";
import { user } from "../services/interfaces/interfaces";
import api from "../services/api";

export default function CardAdmin({id, name, lastname, email, password, roleid}:user){
    
    const navigate = useNavigate()

    const handleDeleteAnUser = async (idUser:number) => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')

        if(!token || !role || Number(role) !== 1) return navigate(0)

            const response = await api.delete(`/deleteuser/${idUser}`, {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`,
                    'x-role': role
                }
            })

            if(response.status === 200 && response.data.deleted === true){
                return true
            } else{
                console.log(response.status)
                return false
            }
    }

    const handleBlackList = async (emailUser:string, idUser:number) => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')

        if(!token || !role || Number(role) !== 1) {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            navigate('/')
        }

            const response = await api.post('/newblacklist', {
                email:emailUser
            }, {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`,
                    "x-role": role
                }
            })
            if(response.data.created === true && response.status === 200){
                const deleted = await handleDeleteAnUser(Number(idUser))

                if(deleted === true){
                    navigate(0)
                }else{
                    console.log(response.status)
                }
            }
    }
    
    
    return(
        <div>
            <header>
                <h1>ID do Aluno: {id}</h1>
                <h2>Nome e sobrenome: {name} {lastname}</h2>
            </header>
            <main>
                <p>Email: {email}</p>
                <p>Senha Criptografada: {password}</p>
            </main>
            <footer>
                <div>
                    <p>Posição: {roleid === 2 ? "Estudante" : "Algo deu errado!"}</p>
                </div>
                <div>
                    <button disabled={false}>Atualizar</button>
                    <button disabled={false} onClick={() => handleDeleteAnUser(id)}>Encerrar</button>
                    <button onClick={() => handleBlackList(email, id)}>Lista Negra</button>
                </div>
            </footer>
        </div>
    )
}