import { useEffect, useState } from "react";
import Table from "../components/Table";
import { aluno } from "../services/interfaces/interfaces";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Landing.module.scss"

export default function ProfessorClient(){
    const [professorInfos, setProfessorInfos] = useState<aluno  | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMyInfos = async() => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')
                if(!role || !token || Number(role) !== 3) return navigate('/')
                const response = await api.get('/userinfo',{
                    headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "Application/json",
                        "x-role": role
                    }
                })
                if(response.status === 200){
                    setProfessorInfos(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyInfos()
    },[])
    return(
        <div>
            <header className={styles.HeaderContainer}>
                <div>
                    <h1 className={styles.Title}>Bem vindo Professor, {professorInfos?.name} {professorInfos?.lastname}</h1>
                </div>
                <nav className={styles.Navbar}>
                    <p className={styles.Pnav}><Link className={styles.Link} to={'/clientprof'}>Home</Link></p>
                    <p className={styles.Pnav}> <Link className={styles.Link} to={'/approvearea'}>Aprovar Horário</Link></p>
                </nav>
                <div>
                    <p style={{cursor:'pointer'}}><a className={styles.Link}>Logout</a></p>
                </div>
            </header>
            <main>
                <Table/>
            </main>
        </div>
    )
}