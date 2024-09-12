import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

export default function Account() {
    const [redirect , setRedirect] = useState(false);
    const { ready,user , setUser } = useContext(UserContext);
    let {subpage}  =  useParams()
    if(subpage === undefined){
        subpage='profile'
    }

    async function logout(){
        try {
            await axios.post('/logout');
            setUser(null);
            setRedirect('/');
        } catch (error) {
            res.json("Failed to logout ")
        }
    }

    if(!ready){
        return 'Loading..............'
    }

    // Check if user exists before trying  to access user.name
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'}/>

    }

    function linkClasses (type=null){
        let classes = 'inline-flex gap-1 py-2 px-6';
        if(type===subpage){
            classes += '  bg-primary text-white rounded-full';
        }
        else{
            classes += '  hover:bg-gray-300 hover:text-gray-900 rounded-full bg-gray-200';
        }
        return classes;
    }



    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div>

        <nav className="w-full flex mt-8 justify-center gap-4 mb-8">
            <Link className= {linkClasses('profile')}  to={'/account'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
                My Profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>

                My Bookings
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
            <path fillRule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
            </svg>

                My accommodation
            </Link>
        </nav>
        {
            subpage==='profile' && (
                <div className="text-center max-w-lg mx-auto">
                    The Logged in user {user.name} with ({user.email})<br/>
                    <button onClick={logout} className="primary mt-6 max-w-sm mx-auto">Logout</button>

                </div>
            )
        }
        {
            subpage==='places' && (
                <PlacesPage/>
            )
        }

        </div>
        
    );
}
