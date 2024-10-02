import Header from "../components/Header";
import styles from "../styles/Schedule.module.scss"
import ScheduleClassForm from "../components/ScheduleClassForm";

export default function Schedule(){

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