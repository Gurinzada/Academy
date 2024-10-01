import { useEffect, useState } from "react";
import { approveList, optionsForName } from "../services/interfaces/interfaces";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Card({id,idprofessor, horario, dia}:approveList){
    const [professorInfos, setProfessorInfos] = useState<optionsForName | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getMyTeacherName = async() => {
            try {
                const response = await api.get(`/professor/${idprofessor}`,{
                    headers:{
                        'Content-Type': "Application/json"
                    }
                })
                if(response.status === 200){
                    setProfessorInfos(() => response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getMyTeacherName()
    })

    const cancelClass = async() => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return navigate(0)
                const response = await api.delete(`/approvedornot/${id}`,{
                    headers:{
                        'Content-Type': "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                if(response.data === 200 && response.data.approved === true){
                    console.log(`Sucess`)
                    navigate(0)
                }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div style={{backgroundColor: "#efefefef"}}>
            <div>
                <h1>Aula para aprovar:</h1>
            </div>
            <div>
                <p>Dia: {dia}</p>
                <p>Turno: {horario}</p>
                <p>Instrutor: {professorInfos?.name} {professorInfos?.lastname}</p>
                <p>Contato: {professorInfos?.email}</p>
            </div>
            <div>
                <div>
                    <h3>Deseja Cancelar esse pedido?</h3>
                </div>
                <div>
                    <span onClick={cancelClass}>Sim!</span>
                </div>
            </div>
        </div>
    )
}