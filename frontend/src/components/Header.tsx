import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"
import { aluno, approveList } from "../services/interfaces/interfaces"
import styles from "../styles/Landing.module.scss"
import menu from "../assets/menu-svgrepo-com.svg"
import Card from "./Card"
import io from "socket.io-client"

const socket = io('http://localhost:3000')

export default function Header(){
    const [infosUser, setInfosUser] = useState<aluno | null>(null)
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [myList, setMyList] = useState<approveList[] | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const catchUserInfos = async () => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')

                if(!token || !role || Number(role) !== 2) return navigate('/')

                const response  = await api.get('/userinfo', {
                    headers:{
                        'Content-Type': "Application/json",
                        "Authorization": `Bearer ${token}`,
                        "x-role": role
                    }
                })
    
                if(response.status === 200){
                    setInfosUser(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getMyApprovalList = async() => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')
                if(!token || !role || Number(role) !== 2) return navigate('/')
                
                const response = await api.get('/toapprove', {
                    headers:{
                        'Content-Type': "Application/json",
                        "x-role": role,
                        "Authorization": `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    setMyList(response.data)
                    if(response.data.length > 0){
                        response.data.forEach((approval:approveList) => {
                            socket.emit('joinRoom', approval.id)
                        })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        catchUserInfos()
        getMyApprovalList()

        
    },[])

    const handleLogout = async() =>{
        try {
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            if(!token || !role) return
            
            const response = await api.get('/logout', {
                headers:{
                    'Content-Type': "Application/json",
                    "x-role": role,
                    "Authorization": `Bearer ${token}`,
                }
            })
            if(response.status === 200 && response.data.removeToken === true){
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                navigate(0)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenMenu = () => {
        if(openMenu === false){
            setOpenMenu(() => true)
        }else{
            setOpenMenu(() => false)
        }
    }

    return(
        <header className={styles.HeaderContainer} >
             <div style={{ position: "relative", zIndex: 2 }}>
      {/* Ícone do menu */}
      <img 
        src={menu} 
        alt="Menu Icon" 
        style={{ cursor: 'pointer'}} 
        onClick={handleOpenMenu} 
      />

      {/* Menu com animação suave */}
      <div style={{
        position: 'absolute',
        top: '155%',
        left:"40%",
        background: '#1c1c1c',
        borderRadius: '8px',
        height:'1500%',
        padding: openMenu ? '20px' : '0px',
        overflow: 'scroll',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-in-out',
        opacity: openMenu ? 1 : 0,
        visibility: openMenu ? 'visible' : 'hidden',
        transform: openMenu ? 'translateY(0)' : 'translateY(-10px)',
      }}>
        {openMenu && (
          <div style={{ display:"flex", alignItems:'center', justifyContent:'center',flexDirection:'column', gap:"1rem", padding:'0.25rem' }}>
            {myList && myList.length > 0 ? myList.map((element) => (
                <Card dia={element.dia} horario={element.horario} id={element.id} idprofessor={element.idprofessor} idaluno={0}/>
            )): <p>Sem aulas cadastradas para aprovação!</p>}
          </div>
        )}
      </div>
    </div>
            <div>
                <h1 className={styles.Title}>Bem vindo, {infosUser?.name} {infosUser?.lastname}</h1>
            </div>
            <nav className={styles.Navbar}>
            <p className={styles.Pnav}><Link to={"/client"} className={styles.Link}>Home</Link></p>
                <p className={styles.Pnav}><Link to={"/classes"} className={styles.Link}>Montar horário</Link></p>
            </nav>
            <div>
                <p className={styles.Pnav} onClick={handleLogout}><a className={styles.Link} style={{cursor:'pointer'}}>Logout</a></p>
            </div>
        </header>
    )
}