import wolf from "../assets/image (3).png"
import styles from "../styles/Table.module.scss"
import Table from "./Table"

export default function BodyClient(){
    return(
        <main className={styles.Container}>
            <section style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
                <img src={wolf} alt="wolfAcademy" style={{width:"35%"}}/>
            </section>
            <section className={styles.SectionForTable}>
                <Table/>
            </section>
        </main>
    )
}