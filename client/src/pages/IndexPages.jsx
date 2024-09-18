import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPages(){
    const [places,setPlaces] =useState([]);
    useEffect(()=>{
        axios.get('/places').then(response =>{
            setPlaces(response.data)
        })
    },[])
    return(
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8">
           {places.length >0 && places.map(place => (
                <div>
                    <div className="bg-gray-200 rounded-2xl flex mb-2">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover  w-full h-full  aspect-square " src={'http://localhost:3000/uploads/' +place.photos[0]}/>
                        )}
                    </div>
                    <h2 className="font-bold mb-1 ">{place.address}</h2>
                    <h3 className="text-sm  text-gray-500 mb-1 ">{place.title}</h3>
                    <div>
                        <span className="font-bold">${place.price} </span>per night
                    </div>
                </div>
           ))}
        </div>
    );
}