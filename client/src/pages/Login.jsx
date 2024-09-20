import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login(){
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const[redirect,Setredirect]=useState(false)
    const {setUser} = useContext(UserContext)

    async function handlelogin(ev){
        ev.preventDefault()
        try {
            const {data} = await axios.post('/login',{ email,password});
            setUser(data)
            alert('Login Successfull');
            Setredirect(true);
        } catch (error) 
        {
            alert('login failed invalid credentials')
        }
    }

    if(redirect == true){
        return <Navigate to={'/'}/>
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="">
            <h1 className="text-4xl text-center mb-8">Login</h1>
            <form className="max-w-xl mx-auto bg-gray-200 p-20 rounded-3xl" onSubmit={handlelogin}>
                <input type='email' 
                       placeholder='your@email.com'
                       value={email}
                       onChange={e => setemail(e.target.value) }/>
                <input type='password'
                       placeholder='password'
                       value={password}
                       onChange={e => setpassword(e.target.value) }/>
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">Don't have an account Yet ?<Link className="underline text-black" to={'/register'}> Register</Link></div>
            </form>
            </div>
            
        </div>
    );

}