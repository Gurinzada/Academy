import api from "../services/api"
import { useNavigate } from "react-router-dom"
import styles from "../styles/Table.module.scss"
import { useEffect, useState } from "react"
import { classes } from "../services/interfaces/interfaces"

export default function Table(){
    const [classes, setClasses] = useState<classes[] | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMyClasses = async () => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')
                if(!token || !role) return navigate(0)
                const response = await api.get('/getuserclass', {
                    headers:{
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${token}`,
                        'x-role': role
                    }
                })
                if(response.status === 200){
                    setClasses(() => response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyClasses()
        console.log(`Ola`)
    },[])
    return(
        <table className={styles.TableHours}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Seg</th>
                            <th>Ter</th>
                            <th>Qua</th>
                            <th>Qui</th>
                            <th>Sex</th>
                            <th>Sáb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>6h às 8h</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Seg" && myclass.horario === "6:00 às 8:00" ? <p className={styles.P} >Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Ter" && myclass.horario === "6:00 às 8:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qua" && myclass.horario === "6:00 às 8:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qui" && myclass.horario === "6:00 às 8:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sex" && myclass.horario === "6:00 às 8:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sab" && myclass.horario === "6:00 às 8:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                        </tr>
                        <tr>
                            <td>8h às 10h</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Seg" && myclass.horario === "8:00 às 10:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Ter" && myclass.horario === "8:00 às 10:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qua" && myclass.horario === "8:00 às 10:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qui" && myclass.horario === "8:00 às 10:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sex" && myclass.horario === "8:00 às 10:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sab" && myclass.horario === "8:00 às 10:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                        </tr>
                        <tr>
                            <td>10h às 12h</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Seg" && myclass.horario === "10:00 às 12:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Ter" && myclass.horario === "10:00 às 12:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qua" && myclass.horario === "10:00 às 12:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qui" && myclass.horario === "10:00 às 12:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sex" && myclass.horario === "10:00 às 12:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sab" && myclass.horario === "10:00 às 12:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                        </tr>
                        <tr>
                            <td>14h às 16h</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Seg" && myclass.horario === "14:00 às 16:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Ter" && myclass.horario === "14:00 às 16:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qua" && myclass.horario === "14:00 às 16:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qui" && myclass.horario === "14:00 às 16:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sex" && myclass.horario === "14:00 às 16:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sab" && myclass.horario === "14:00 às 16:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                        </tr>
                        <tr>
                            <td>16h às 18h</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Seg" && myclass.horario === "16:00 às 18:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Ter" && myclass.horario === "16:00 às 18:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qua" && myclass.horario === "16:00 às 18:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qui" && myclass.horario === "16:00 às 18:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sex" && myclass.horario === "16:00 às 18:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sab" && myclass.horario === "16:00 às 18:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                        </tr>
                        <tr>
                            <td>18h às 20h</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Seg" && myclass.horario === "18:00 às 20:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Ter" && myclass.horario === "18:00 às 20:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qua" && myclass.horario === "18:00 às 20:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qui" && myclass.horario === "18:00 às 20:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sex" && myclass.horario === "18:00 às 20:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sab" && myclass.horario === "18:00 às 20:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                        </tr>
                        <tr>
                            <td>20h às 22h</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Seg" && myclass.horario === "20:00 às 22:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Ter" && myclass.horario === "20:00 às 22:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qua" && myclass.horario === "20:00 às 22:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Qui" && myclass.horario === "20:00 às 22:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sex" && myclass.horario === "20:00 às 22:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                            <td>{classes && classes.length > 0 ? classes.map((myclass) => (
                                <>{myclass.dia === "Sab" && myclass.horario === "20:00 às 22:00" ? <p className={styles.P}>Você tem aula hoje!</p> : null}</>
                            )) : null}</td>
                        </tr>
                    </tbody>
                </table>
    )
}

