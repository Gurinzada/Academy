import styles from "../styles/Register.module.scss"
import stylesText from "../styles/Landing.module.scss"
import wolf from "../assets/image (3).png"
import { useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

export default function RegisterStudent(){
    const [name, setName] = useState<string>('')
    const [email, SetEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [lastname, setLastName] = useState<string>('')


    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post(`/newuser`, {
                email: email,
                name: name,
                lastname: lastname,
                password: password,
                roleid: 2
            })
            if(response.status === 200){
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className={styles.Container}>
            <form action="" className={styles.FormContainer} onSubmit={handleSubmit}>
                <div className={styles.Welcome}>
                    <h1 className={stylesText.Title}>Bem-vindo</h1>
                    <img src={wolf} alt="" className={styles.HeroImg}/>
                </div>
                <div className={styles.ContainerInputs}>
                    <div className={styles.GeneralInputs}>
                        <label className={styles.Label} htmlFor="email">Email</label>
                        <input type="email" name="" id="email"  className={styles.Input} value={email} onChange={(e) => SetEmail(e.target.value)}/>
                    </div>
                    <div className={styles.GeneralInputs}>
                        <label htmlFor="password" className={styles.Label}>Senha</label>
                        <input type="password" id="password"  className={styles.Input} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className={styles.GeneralInputs}>
                        <label className={styles.Label} htmlFor="firstname">Nome</label>
                        <input type="text" name="" id="firstname" className={styles.Input} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className={styles.GeneralInputs}>
                        <label className={styles.Label} htmlFor="secondname">Sobrenome</label>
                        <input type="text" id="secondname"  className={styles.Input} value={lastname} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className={styles.ContainerBnt}>
                        <button className={styles.BntRegister}>Cadastrar</button>
                        <Link to={'/'}>Voltar</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}