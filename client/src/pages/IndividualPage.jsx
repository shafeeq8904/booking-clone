import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import BookingWidget from "../BookingWidget";

export default function IndividualPage(){
    const {id} = useParams();
    const[place,setPlace] =useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response=>{
            setPlace(response.data);
        })
    },[id])

    if(!place) return '';

    if(showAllPhotos){
        return (
        
        <div className="fixed bg-white w-full h-full overflow-y-scroll scroll-smooth ">
                <div className="flex justify-between items-center px-4 py-4"> 
                    <h2 className="text-3xl font-semibold">Photos of {place.title}</h2>

                    {/* Fixed button with adjusted positioning */}
                    <button onClick={()=>{setShowAllPhotos(false)}} className="fixed top-8 right-6 flex items-center px-4 py-2 rounded-xl text-xl bg-red-400 text-gray-100 gap-2 shadow shadow-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Close Photos
                    </button>
                </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 -mx-4">
                
                {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                <div key={index} className="w-full h-[400px] transition-transform duration-300 ease-in-out "> {/* Set height for consistency */}
                    <img
                    className="w-full h-full object-cover rounded-lg"
                    src={'http://localhost:3000/uploads/' + photo}
                    alt={`Photo ${index + 1}`}
                    />
                </div>
                ))}
            </div>
        </div>
    
    )
}

    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                        <div>
                            <img onClick={()=>{setShowAllPhotos(true)}}
                            className="aspect-square cursor-pointer object-cover rounded-lg "
                            src={'http://localhost:3000/uploads/' + place.photos[0]}
                            alt="Main"
                            />
                        </div>
                        )}
                    </div>

                <div className="grid">
                    {place.photos?.[1] && (
                        <img onClick={()=>{setShowAllPhotos(true)}}
                        className="aspect-square cursor-pointer object-cover rounded-lg"
                        src={'http://localhost:3000/uploads/' + place.photos[1]}
                        alt="Thumbnail 1"
                        />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img onClick={()=>{setShowAllPhotos(true)}}
                            className="aspect-square cursor-pointer object-cover rounded-lg relative top-2"
                            src={'http://localhost:3000/uploads/' + place.photos[2]}
                            alt="Thumbnail 2"
                            />
                        )}
                    </div>
                </div>
            </div>

            <button onClick = {() =>setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 rounded-lg shadow-md shadow-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
                 show more photos
            </button>
        </div>
            

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
                <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
                </div>
                Check-in: {place.checkin}<br />
                Check-out: {place.checkout}<br />
                Max number of guests: {place.maxGuests}
            </div>
            <div>
                <BookingWidget place={place} />
            </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
                <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-800 leading-5">{place.extraInfo}</div>
            </div>
        </div>
        );
    }