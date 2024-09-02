import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(){
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')

    async function handlelogin(ev){
        ev.preventDefault()
        try {
            await axios.post('/login',{ email,password});
            alert('Login Successfull')
        } catch (error) 
        {
            alert('login failed invalid credentials')
        }
    
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-xl mx-auto" onSubmit={handlelogin}>
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