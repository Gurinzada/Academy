import Header from "../components/Header";
import styles from "../styles/Schedule.module.scss"
import ScheduleClassForm from "../components/ScheduleClassForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Schedule(){
    const navigate = useNavigate()
    useEffect(() => {
        const role = localStorage.getItem('role')
        if(!role || Number(role) !== 2){
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            return navigate(0)
        }
    },[])

    return(
        <div className={styles.Container}>
            <Header/>
            <main className={styles.MainContent}>
                <section>
                    <ScheduleClassForm/>
                </section>
            </main>
        </div>
    )
}