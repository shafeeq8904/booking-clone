import { useEffect, useState } from "react";
import { Perks } from "../components/Perks";
import PhotoUploader from "./PhotoUploader";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PLacesFormPage(){
    const {id} = useParams();
    const [title,setTitle]= useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription]= useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkin,setCheckin] = useState('');
    const [checkout,setCheckout] = useState('');
    const [maxGuests , setMaxGuests] = useState(1); 
    const [redirect, setRedirect] = useState(false);
    const [price,setPrice] = useState(100);
     
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response =>{
            const {data} = response; 
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckin(data.checkin);
            setCheckout(data.checkout);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    },[id])

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

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
             title,address,addedPhotos,description
            ,perks,extraInfo,checkin,checkout,maxGuests,price}
        if(id){
                //updating the existing place
                await axios.put('/places',{
                    id,...placeData
                });
                setRedirect(true);
            }
        else{
            await axios.post('/places',
                placeData
            );
            setRedirect(true);
        }
    }
        

    if (redirect){
        return <Navigate to={'/account/places'} />
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen"> {/* Center the form */}
            <AccountNav/>
            <form className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl mt-4" onSubmit={savePlace}> {/* Center and size the form */}
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
                        <input type="number" placeholder="14:00" value={checkin} onChange={ev => setCheckin(ev.target.value)}/>

                    </div> 
                    <div>
                        <h3>Check out time</h3>
                        <input type="number" placeholder="20:00" value={checkout} onChange={ev => setCheckout(ev.target.value)}/>
                    </div> 
                    <div>
                        <h3>max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                    </div>
                    <div>
                        <h3>Price per night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)}/>

                    </div> 
                </div>

                <div>
                    <button className="primary my-4 ">
                        Save
                    </button>
                </div>
             </form>
            
        </div>
    )
}