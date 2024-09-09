import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

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
        let classes = 'py-2 px-6';
        if(type===subpage){
            classes += '  bg-primary text-white rounded-full';
        }
        return classes;
    }

    console.log(subpage)

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div>

        <nav className="w-full flex mt-8 justify-center gap-4 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}>My accommodation</Link>
        </nav>
        {
            subpage==='profile' && (
                <div className="text-center max-w-lg mx-auto">
                    The Logged in user {user.name} with ({user.email})<br/>
                    <button onClick={logout} className="primary mt-6 max-w-sm mx-auto">Logout</button>

                </div>
            )
        } 

        </div>
        
    );
}
