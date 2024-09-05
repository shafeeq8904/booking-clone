import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

export default function Account() {
    const { ready,user } = useContext(UserContext);
    let {subpage}  =  useParams()
    if(subpage === undefined){
        subpage='profile'
    }

    if(!ready){
        return 'Loading..............'
    }

    // Check if user exists before trying  to access user.name
    if (ready && !user) {
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
                    <button className="primary mt-6 max-w-sm mx-auto">Logout</button>

                </div>
            )
        } 

        </div>
        
    );
}
