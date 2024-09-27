import { useEffect, useState } from "react";
import Header from "../components/Header";
import { optionsForName } from "../services/interfaces/interfaces";
import api from "../services/api";

export default function Schedule(){
    const [namesProfessor, setNamesProfessor] = useState<optionsForName[] | null>(null)
    const [weekDay, setWeekDay] = useState<string>("")
    const [hours, setHours] = useState<string>("")
    const [professor, setProfessor] = useState<number | null>(null)

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

    const handleNewClass = async () => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <Header/>
            <main>
                <section>
                    <form action="">
                        <div>
                            <h1>Monte seu horário</h1>
                            <h2>Adicione a quantidade de aulas por semana!</h2>
                            <h3>Escolha seu instrutor(a) preferido!</h3>
                        </div>
                        <div>
                            <h4>Selecione o dia da semana: </h4>
                            <select name="" id="" onChange={(e) => setWeekDay(e.target.value)}>
                                <option value="" selected disabled>Selecione um dia da semana</option>
                                <option value="Seg">Segunda-Feira</option>
                                <option value="Ter">Terça-Feira</option>
                                <option value="Qua">Quarta-Feira</option>
                                <option value="Qui">Quinta-Feira</option>
                                <option value="Sex">Sexta-Feira</option>
                                <option value="Sab">Sábado</option>
                            </select>
                        </div>
                        <div>
                            <h4>Selecione as horas:</h4>
                            <select name="" id="" onChange={(e) => setHours(e.target.value)}>
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
                        <div>
                            <h4>Selecione seu instrutor:</h4>
                            <select name="" id="" onChange={(e) => setProfessor(Number(e.target.value))}>
                                {namesProfessor && namesProfessor.length > 0 ? namesProfessor.map((name) => (
                                    <>
                                        <option value={name.id}>{name.name} {name.lastname}</option>
                                    </>
                                )) : null}
                            </select>
                        </div>
                        <div>
                            <button>Cadastrar aula</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}