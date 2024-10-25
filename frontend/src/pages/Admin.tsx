import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { CategoryScale, Chart } from "chart.js";
import { Bar } from "react-chartjs-2";


interface user{
    id:number
    name:string,
    lastname:string,
    email:string,
    password:string,
    roleid:number
}

Chart.register(CategoryScale)

export default function Admin(){
    const [myUsers, setMyUsers] = useState<user[] | null>()
    const navigate = useNavigate()

    useEffect(() => {
        const getAllUsers = async() => {
            try {
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')
                if(!role || Number(role) !== 1 || !token){
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    return navigate('/')
                }

                const response = await api.get('/adminalluser', {
                    headers:{
                        'Content-Type': "Applicaiton/json",
                        "Authorization": `Bearer ${token}`,
                        "x-role": role
                    }
                })

                if(response.status === 200){
                    setMyUsers(response.data)

                }
            } catch (error) {
                console.log(`Something goes wrong`)
                navigate(0)
            }
        }

        getAllUsers()
    },[])

    return(
        <div>
            <HeaderAdmin/>
            <main>
                <section>
                    <div>
                        <h1>Confira o número de usuários</h1>
                    </div>
                    <div>
                        <div>
                            {myUsers?.length}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}