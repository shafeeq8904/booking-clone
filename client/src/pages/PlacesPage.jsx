import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Perks } from "../components/Perks";
import axios from "axios";

export default function PlacesPage(){
    const {action} = useParams()
    const [title,setTitle]= useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description,setDescription]= useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkin,setCheckin] = useState('');
    const [checkout,setCheckout] = useState('');
    const [maxGuests , setMaxGuests] = useState(1); 
    
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
    async function AddPhotoLink(ev){
        ev.preventDefault()
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
        setAddedPhotos(prev=>{return [...prev ,filename]})
        setPhotoLink('');
    }
    function uploadphoto(ev){
        ev.preventDefault();
        const files = ev.target.files
        console.log({files})
    }

    return (
    <div> 

        {action !== 'new' && (
            <div className=" text-center">
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
            </svg>
    
                Add new Places
            </Link>
            </div>
        )}

        {action === 'new' && (
        <div className="flex justify-center items-center min-h-screen"> {/* Center the form */}
            <form className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl"> {/* Center and size the form */}
                {preInput('Title','Title for your place, should be short and catchy.')}
                <input className="w-full p-4 mt-2 border rounded-lg" type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apartment"/> {/* Increased input size */}

                {preInput('Address','Address to this place')}
                <input className="w-full p-4 mt-2 border rounded-lg" type='text' value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="Enter your address"/> {/* Increased input size */}

                {preInput('Photos','more = better')}
                <div className="flex gap-2">
                    <input className="w-full p-2 mt-2 border rounded-lg" placeholder="Add using Link" value={photoLink} 
                        onChange={ev => setPhotoLink(ev.target.value)}/>
                    <button onClick={AddPhotoLink} className="px-4 text-xs rounded-2xl">Add photo</button>
                </div>
        
                <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {addedPhotos.length > 0 && addedPhotos.map (link => (
                        <div >
                            <img className="rounded-2xl h-32 w-full" src={'http://localhost:3000/uploads/'+ link} />
                        </div>
                    ))}
                    <label className="cursor-pointer flex justify-center items-center min-w-[150px] border bg-transparent rounded-2xl py-4 px-6 text-sm text-gray-500 gap-2">
                        <input type="file" className="hidden" onChange={uploadphoto}/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                         </svg>
                        Upload from device
                    </label>
                </div>

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
