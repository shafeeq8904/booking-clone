import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Register(){

    const[name,setname]= useState('');
    const[email,setemail]= useState('');
    const[password,setpassword]= useState('');

    function register(e){
        e.preventDefault();
        axios.post('/register',{
            name,email,password
        });
    }

    return (

        <div className="mt-4 grow flex items-center justify-around">
            <div className="">
            <h1 className="text-4xl text-center mb-4">Register</h1>

            <form onSubmit={register} className="max-w-xl mx-auto">
                <input type='text' 
                       placeholder='Enter you name' 
                       value={name} 
                       onChange={e => setname(e.target.value)}/>
                <input type='email' 
                       placeholder='your@email.com' 
                       value={email} 
                       onChange={e => setemail(e.target.value)}/>
                <input type='password' 
                       placeholder='password'
                       value={password} 
                       onChange={e => setpassword(e.target.value)}/>

                <button className="primary">Register</button>
                <div className="text-center py-2 text-gray-500">Already have an account?<Link className="underline text-black" to={'/login'}> Login</Link></div>
            </form>
            </div>
            
        </div>
    );
}