import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Landing.module.scss"
import lion from "../assets/image (2).png"
import api from "../services/api";

export default function Landing(){
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        if(token && Number(role) === 2){
            navigate('/client')
        } else if(token && Number(role) === 3){
            navigate('/clientprof')
        } else{
            console.log(`No token available`)
        }
    },[])

    const login = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/loginuser', {
                email,
                password
            },{
                headers:{
                    'Content-Type':"Application/json"
                }
            })
            if(response.data.auth === true && response.status === 200 && response.data.role === 2){
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role', response.data.role)
                navigate('/client')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className={styles.Container}>
            <header className={styles.HeaderContainer}>
                <div className={styles.ContainerHeader}>
                    <h1 className={styles.Title}>Elite Performance</h1>
                </div>
                <nav className={styles.Navbar}>
                    <p className={styles.Pnav}><Link to={'/logininstructor'} className={styles.Link}>Sou Instrutor</Link></p>
                    <p className={styles.Pnav}><a href="#whoweare" className={styles.Link}>Quem nós somos</a></p>
                    <p className={styles.Pnav}><a href="#health" className={styles.Link}>Saúde e Benefícios</a></p>
                    <p className={styles.Pnav}><a href="#contacts" className={styles.Link}>Contatos</a></p>
                    <p className={styles.Pnav}><Link to={'/register'} className={styles.Link} data-cy="go-register">Registre-se</Link></p>
                </nav>
                <form className={styles.LoginArea} onSubmit={login}>
                    <div className={styles.TitleForLogin}>
                        <h4 className={styles.Loginh4}>Ja é cliente?</h4>
                    </div>
                    <div className={styles.ContainerInputs}>
                        <div className={styles.GeneralContainer}>
                            <div className={styles.InputandLabel}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.Input}/>
                            </div>
                            <div className={styles.InputandLabel}>
                                <label htmlFor="password">Senha</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.Input}/>
                            </div>
                        </div>
                        <div>
                            <button>Login</button>
                        </div>
                    </div>
                </form>
            </header>
            <main className={styles.MainContainer}>
                <section className={styles.SectionBackground}>
                    <img src={lion} alt="" className={styles.Lion}/>
                </section>
                <section id="whoweare" className={styles.Section}>
                    <div>
                        <h1 className={styles.Title}>Quem nós somos</h1>
                    </div>
                    <div className={styles.SectionText1}>
                        <p className={styles.P}>
                            Na Elite Perfomace, acreditamos que cada jornada é única e poderosa.
                            Somos uma academia focada em transofrmar vidas através do movimento, da disciplina e
                            do desempenho de alto nível.
                        </p>
                        <img src="https://img.freepik.com/fotos-gratis/homem-jovem-fitness-em-estudio_7502-5008.jpg?t=st=1726618158~exp=1726621758~hmac=9739629bfd3460f06091479983f046c7041013fce49d549868ff13d42295cde5&w=996" alt="imghere" className={styles.Img}/>
                    </div>
                    <div className={styles.SectionText2}>
                        <img src="https://img.freepik.com/fotos-gratis/homem-jovem-em-sportswear-um-classe-exercicio-em-um-ginasio_1150-12372.jpg?t=st=1726611144~exp=1726614744~hmac=01e630d3a098823b3026bcb43f1daad900be22a8825e568a27a7450749bf3a52&w=996" alt="imghere" className={styles.Img}/>
                        <p className={styles.P}>
                            Nossa equipe de profissionais especializados está comprometida em ajudar
                            você a alcançar seus objetivos, seja você um iniciante buscando saúde e bem-estar,
                            ou um alteta buscando superar limites. Aqui a excelência não é só um conceito - é parte do nosso DNA.
                        </p>
                    </div>
                </section>
                <section id="health" className={styles.Section}>
                    <div>
                        <h1 className={styles.Title}>Saúde e Benefícios</h1>
                    </div>
                    <div className={styles.SectionText1}>
                        <p className={styles.P}>
                            Treinar na Elite Performance significa investir no seu bem-estar físico e mental.
                            Além de melhorar a sua condição cardiovascular e aumentar a força muscular,
                            nossos programas são pensandos para promover flexibilidade, resistência e equilíbrio.
                        </p>
                        <img src="https://img.freepik.com/fotos-gratis/mulher-com-abdomen-visivel-fazendo-fitness_23-2150228955.jpg?t=st=1726611284~exp=1726614884~hmac=676917d31d3830b6a9ca55cf6b457d6121ba9e1699db16f5088698e2d60a4959&w=996" alt="imghere" className={styles.Img}/>
                    </div>
                    <div className={styles.SectionText2}>
                        <img src="https://img.freepik.com/fotos-gratis/mulheres-jovens-participando-da-aula-de-spinning_23-2149332044.jpg?t=st=1726611216~exp=1726614816~hmac=5160a20953c42ee174bac87bdf7ed3c4dbb494d5a7a8773f8c2f43ee32f9431d&w=996" alt="imghere" className={styles.Img}/>
                        <p className={styles.P}>
                            Mas os benefícios vão além do corpo: reduza o estresse, melhore a qualidade do sono
                            e sinta-se mais energizado para enfrentar o dia a dia. Aqui, você não apenas transforma seu físico,
                            você eleva sua performace em todos os aspectos da vida.
                        </p>
                    </div>
                </section>
            </main>
            <footer id="contacts" className={styles.footer}>
                <div className={styles.FooterTitles}>
                    <h1 className={styles.Title}>Elite Performance - A Sua Academia de Excelência</h1>
                    <h2 className={styles.Titleh2}>Rua Exemplo, 123 - Bairro Saúde, Cidade Exemplo - CEP: 12345-678</h2>
                </div>
                <div className={styles.ContainerInfos}>
                    <div className={styles.ContainerList}>
                        <div>
                            <h3 className={styles.h3}>Horário de Funcionamento:</h3>
                        </div>
                        <ul className={styles.List}>
                            <li>Segunda a Sexta: 6h às 22h</li>
                            <li>Sábado: 8h às 18h</li>
                            <li>Domingo: Fechado</li>
                        </ul>
                    </div>
                    <div className={styles.ContainerList}>
                        <div>
                            <h3 className={styles.h3}>Contato:</h3>
                        </div>
                        <ul className={styles.List}>
                            <li>Telefone: (11) 1234-5678</li>
                            <li>WhatsApp: (11) 91234-5678</li>
                            <li>Email: contato@eliteperformance.com.br</li>
                        </ul>
                    </div>
                    <div className={styles.ContainerList}>
                        <div>
                            <h3 className={styles.h3}>Redes Sociais:</h3>
                        </div>
                        <ul className={styles.List}>
                            <li>Instagram: @eliteperformance</li>
                            <li>Facebook: /eliteperformace</li>
                            <li>Linkedin: /eliteperformace</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p className={styles.Copy}>© 2024 Elite Performance. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    )
}