import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import HeaderProfessor from "../components/HeaderProfessor"
import {approveList, optionsForName } from "../services/interfaces/interfaces"
import api from "../services/api"

export default function Approve(){
    const [approveList, setApproveList] = useState<approveList[] | null>(null)
    const [studentInfos, setStudentsInfos] = useState<optionsForName[] | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const role = localStorage.getItem('role')
        if(!role || Number(role) !== 3){
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            return navigate(0)
        }
        const fetchMyApproveList = async () => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')
                const response = await api.get('/toapprove', {
                    headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "Application/json",
                        "x-role": role
                    }
                })
                if(response.status === 200){
                    setApproveList(() => response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getUserName = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return navigate(0)
                    const response = await api.get(`/student`, {
                        headers:{
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "Application/json"
                        }
                    })
                    if(response.status === 200){
                        setStudentsInfos(() => response.data)
                    }
            } catch (error) {
                console.log(error)
            }
        }
        getUserName()
        fetchMyApproveList()
    },[])

    const Accept = async(weekDay:string, hours:string, idaluno:number, idExclude:number) => {
        try {
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            if(!token || !role) return navigate(0)
                const response = await api.post('/newclass', {
                    weekDay: weekDay,
                    hours: hours,
                    idaluno:idaluno
                })
                if(response.status === 200){
                    const toExclude = await api.delete(`/approvedornot/${idExclude}`, {
                        headers:{
                            'Content-Type': "Application/json",
                            "Authorization": `Bearer ${token}`,
                            'x-role': role
                        }
                    })
                    if(toExclude.status === 200 && toExclude.data.approved === true){
                        console.log(`Sucess`)
                        navigate(0)
                    }
                }
        } catch (error) {
            console.log(error)
            navigate(0)
        }
    }

    const recuse = async (id:number) => {
        try {
            const role = localStorage.getItem('role')
            const token = localStorage.getItem('token')
            if(!role || !token) return navigate(0)
            const response = await api.delete(`/approvedornot/${id}`, {
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "x-role": role,
                    "Content-Type": "Application/json"
                }
            })
            if(response.status === 200 && response.data.approved === true){
                console.log(`Sucess`)
                navigate(0)
            }
        } catch (error) {
            console.log(error)
            navigate(0)
        }
    }
   

    return(
        <div>
            <HeaderProfessor/>
            <main>
                <section>
                    {approveList && approveList.length > 0 ? approveList.map((element) => (
                        <div>
                            <div>
                                <h1>Aula para aprovar:</h1>
                            </div>
                            <div>
                                <p>Dia: {element.dia}</p>
                                <p>Turno: {element.horario}</p>
                                <p>Aluno: {studentInfos && studentInfos.length > 0 ? studentInfos.map((user) => (
                                    <>{user.id === element.idaluno ? <>{`${user.name} ${user.lastname}`}</> : <>Usúario não identificado!</>}</>
                                )) : null}</p>
                                <p>Contato: {studentInfos && studentInfos.length > 0 ? studentInfos.map((user) => (
                                    <>{user.id === element.idaluno ? <>{`${user.email}`}</> : <>Email não identificado</>}</>
                                )) : null}</p>
                            </div>
                            <div>
                                <div>
                                    <h3>Aceitar ou recusar?</h3>
                                </div>
                                <div>
                                    <p onClick={() => Accept(element.dia, element.horario, element.idaluno, element.id)}>Aceitar</p>
                                    <p onClick={() => recuse(element.id)}>Recusar</p>
                                </div>
                            </div>
                        </div>
                    )) : null}
                </section>
            </main>
        </div>
    )
}