import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";

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

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav/>
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
