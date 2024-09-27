import wolf from "../assets/image (3).png"

export default function BodyClient(){
    return(
        <main>
            <section style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
                <img src={wolf} alt="wolfAcademy" style={{width:"35%"}}/>
            </section>
            <section></section>
        </main>
    )
}