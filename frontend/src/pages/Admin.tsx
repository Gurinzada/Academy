import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { user } from "../services/interfaces/interfaces";
import CardAdmin from "../components/CardAdmin";

interface myInstructors{
    id:number,
    name:string,
    lastname:string,
    email:string,
    passoword:string,
    roleid:number
}

interface BlackLists{
    lengthBlackList:number
}

export default function Admin(){
    const [myUsers, setMyUsers] = useState<user[] | null>(null)
    const [myInstructors, setmyInstructors] = useState<myInstructors[] | null>(null)
    const [BlackList, setMyBlackList] = useState<BlackLists | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getAllUsers = async() => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')
                if(!role || Number(role) !== 1 || !token){
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    return navigate('/')
                }

                const response = await api.get('/adminalluser', {
                    headers:{
                        'Content-Type': "Applicaiton/json",
                        "Authorization": `Bearer ${token}`,
                        "x-role": role
                    }
                })

                if(response.status === 200){
                    setMyUsers(response.data)

                }
            } catch (error) {
                console.log(`Something goes wrong`)
            }
        }

        const getAllInstructors = async() => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')

                if(!role || !token || Number(role) !== 1){
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    return navigate('/')
                }

                const response = await api.get('/admininstructors', {
                    headers:{
                        "Content-Type": "Application/json",
                        'Authorization': `Bearer ${token}`,
                        "x-role": role
                    }
                })

                if(response.status === 200){
                    setmyInstructors(response.data)
                }
            } catch (error) {
                console.log(`Something goes wrong`)
            }
        }

        const getBlackListNumbers = async() => {
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            if(!role || Number(role) !== 1 || !token){
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                return navigate('/')
            }

            try {
                const response = await api.get('/allblacklists', {
                    headers:{
                        'Content-Type': "Application/json",
                        'Authorization': `Bearer ${token}`,
                        "x-role": role
                    }
                })
                if(response.status === 200){
                    setMyBlackList(response.data)
                }
            } catch {
                console.log(`Something goes wrong`)
            }

        }

        getAllUsers()
        getAllInstructors()
        getBlackListNumbers()
    },[])

    return(
        <div>
            <HeaderAdmin/>
            <main>
                <section>
                    <div>
                        <h1>Quadro de controle:</h1>
                    </div>
                    <div>
                        <div>
                            <div>
                                <h3>Número de Alunos cadastrados:</h3>
                            </div>
                            <div>
                                <p>{myUsers?.length}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h3>Número de Professores Ativos:</h3>
                            </div>
                            <div>
                                <p>{myInstructors?.length}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h3>Número das BlackLists:</h3>
                            </div>
                            <div>
                                <p>{BlackList?.lengthBlackList}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                        <h1>Usuários Ativos</h1>
                    </div>
                    <div style={{display:"flex", flexWrap:'wrap', justifyContent:'flex-start', alignItems:'center', gap:'2rem', marginLeft:'2rem'}}>
                        {myUsers && myUsers.length > 0 ? myUsers.map((item) => (
                            <CardAdmin email={item.email} id={item.id} lastname={item.lastname} name={item.name} password={item.password} roleid={item.roleid}/>
                        )) : "Nenhum usuário Cadastrado"}
                    </div>
                </section>
            </main>
        </div>
    )
}