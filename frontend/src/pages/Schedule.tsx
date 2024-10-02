import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { optionsForName } from "../services/interfaces/interfaces";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Schedule.module.scss"

export default function Schedule(){
    const [namesProfessor, setNamesProfessor] = useState<optionsForName[] | null>(null)
    const [weekDay, setWeekDay] = useState<string>("")
    const [hours, setHours] = useState<string>("")
    const [professor, setProfessor] = useState<number | null>(null)
    const [workRigth, setWorkRight] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfessorNames = async () => {
            try {
                const response = await api.get('/instructorname')
                if(response.status === 200){
                    setNamesProfessor(() => response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfessorNames()
    },[])

    const handleNewClass = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            if(!token) return navigate(0)
            if(weekDay === "" && hours === "" && professor === null) return navigate(0)
            const response = await api.post('/sendapprove', {
                weekDay:weekDay,
                hours:hours,
                professorid:professor
            }, {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }

            })
            if(response.status === 200){
                setWorkRight(() => true)
                setTimeout(() => {
                    setWorkRight(() => false)
                },1000)
                navigate(0)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className={styles.Container}>
            <Header/>
            <main className={styles.MainContent}>
                <section>
                    <form action="" onSubmit={handleNewClass} className={styles.FormClass}>
                        <div className={styles.TitleArea}>
                            <h1 className={styles.H1}>Monte seu horário</h1>
                            <h2 className={styles.H2}>Adicione a quantidade de aulas por semana!</h2>
                            <h3 className={styles.H3}>Escolha seu instrutor(a) preferido!</h3>
                        </div>
                        <div className={styles.ContainerInfos}>
                        <div className={styles.ContainerInput}>
                            <label htmlFor="weekday">Selecione o dia da semana: </label>
                            <select name="" id="weekday" onChange={(e) => setWeekDay(e.target.value)} className={styles.InputArea}>
                                <option value="" selected disabled>Selecione um dia da semana</option>
                                <option value="Seg">Segunda-Feira</option>
                                <option value="Ter">Terça-Feira</option>
                                <option value="Qua">Quarta-Feira</option>
                                <option value="Qui">Quinta-Feira</option>
                                <option value="Sex">Sexta-Feira</option>
                                <option value="Sab">Sábado</option>
                            </select>
                        </div>
                        <div className={styles.ContainerInput}>
                            <label htmlFor="hours">Selecione as horas:</label>
                            <select name="" id="hours" onChange={(e) => setHours(e.target.value)} className={styles.InputArea}>
                                {weekDay === "" ? <option value="">Selecione o dia da semana primeiro</option> : weekDay === "Sab" ? 
                                    <>
                                        <option value="8:00 às 10:00">8h às 10h</option>
                                        <option value="10:00 às 12:00">10h às 12h</option>
                                        <option value="14:00 às 16:00">14h às 16h</option>
                                        <option value="16:00 às 18:00">16h às 18h</option>
                                    </> : 
                                    <>
                                        <option value="6:00 às 8:00">6h às 8h</option>
                                        <option value="8:00 às 10:00">8h às 10h</option>
                                        <option value="10:00 às 12:00">10h às 12h</option>
                                        <option value="14:00 às 16:00">14h às 16h</option>
                                        <option value="16:00 às 18:00">16h às 18h</option>
                                        <option value="18:00 às 20:00">18h às 20h</option>
                                        <option value="20:00 às 22:00">20h às 22h</option>
                                    </>
                                }
                            </select>
                        </div>
                        <div className={styles.ContainerInput}>
                            <label htmlFor="nameProfessor">Selecione seu instrutor:</label>
                            <select name="" id="nameProfessor" onChange={(e) => setProfessor(Number(e.target.value))} className={styles.InputArea}>
                                <option value="" selected disabled>Selecione o Professor:</option>
                                {namesProfessor && namesProfessor.length > 0 ? namesProfessor.map((name) => (
                                    <>
                                        <option value={name.id}>{name.name} {name.lastname}</option>
                                    </>
                                )) : null}
                            </select>
                        </div>
                        </div>
                        <div>
                            <button className={styles.Bnt}>Cadastrar aula</button>
                            {workRigth === false ? null : <p style={{color:"green"}}>Cadastrado para aprovação!</p>}
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}