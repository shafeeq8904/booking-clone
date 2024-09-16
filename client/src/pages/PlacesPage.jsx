import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Perks } from "../components/Perks";
import axios from "axios";
import PhotoUploader from "./PhotoUploader";

export default function PlacesPage(){
    const {action} = useParams()
    const [title,setTitle]= useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription]= useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkin,setCheckin] = useState('');
    const [checkout,setCheckout] = useState('');
    const [maxGuests , setMaxGuests] = useState(1); 
    const [redirect , setRedirect] = useState('');
    
    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm mt-2">{text}</p>
        )
    }
    function preInput(header,description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        )
    }

    async function addNewPlace(ev){
        ev.preventDefault();
        await axios.post('/places',{
            title,address,addedPhotos,description
            ,perks,extraInfo,checkin,checkout,maxGuests
        });
        setRedirect('/account/places');
    }

    

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
    <div> 

        {action !== 'new' && (
            <div className=" text-center">
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
    
                Add new Places
            </Link>
            </div>
        )}

        {action === 'new' && (
        <div className="flex justify-center items-center min-h-screen"> {/* Center the form */}

            <form className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl" onSubmit={addNewPlace}> {/* Center and size the form */}
                {preInput('Title','Title for your place, should be short and catchy.')}
                <input className="w-full p-4 mt-2 border rounded-lg" type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apartment"/> {/* Increased input size */}

                {preInput('Address','Address to this place')}
                <input className="w-full p-4 mt-2 border rounded-lg" type='text' value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="Enter your address"/> {/* Increased input size */}

                {preInput('Photos','more = better')}
                <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                {preInput('Description','Description of place')}
                <textarea value={description} onChange={ev=> setDescription(ev.target.value)}/>

                {preInput('Perks','Select all the Perks')}
                <div className=" grid grid-cols-2  gap-4">
                    <Perks selected={perks} onChange={setPerks}/>
                </div>

                {preInput('Extra info','House rules, etc.....')}
                <textarea value={extraInfo} onChange={ev=> setExtraInfo(ev.target.value)}/>

                {preInput('checkin &out','add check in&out times')}
                <div className=" grid grid-cols-2  gap-4 mt-2">
                    <div>
                        <h3>Check in time</h3>
                        <input type="text" placeholder="14:00" value={checkin} onChange={ev => setCheckin(ev.target.value)}/>
                    </div> 
                    <div>
                        <h3>Check out time</h3>
                        <input type="text" placeholder="20:00" value={checkout} onChange={ev => setCheckout(ev.target.value)}/>
                    </div> 
                    <div>
                        <h3>max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                    </div> 
                </div>

                <div>
                    <button className="primary my-4 ">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )}

    </div>   
  )
}
