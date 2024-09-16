import { useState } from "react";
import axios from "axios";

export default function PhotoUploader({addedPhotos,onChange}){
    const [photoLink,setPhotoLink] = useState('');
    async function AddPhotoLink(ev){
        ev.preventDefault()
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
        onChange(prev=>{return [...prev ,filename]})
        setPhotoLink('');
    }

    function uploadphoto(ev){
        ev.preventDefault(); 
        const files = ev.target.files
        const data = new FormData();
        for (let i =0 ;i< files.length;i++){
            data.append('photos',files[i])
        }
        axios.post('/upload', data , {
            headers : {'Content-Type': 'multipart/form-data' }
        }).then(response =>{
            const {data:filenames} = response;
            onChange(prev=>{return [...prev ,...filenames]})
            
        })
    }
  return (
    <>
        <div className="flex gap-2">
                    <input className="w-full p-2 mt-2 border rounded-lg" placeholder="Add using Link" value={photoLink} 
                        onChange={ev => setPhotoLink(ev.target.value)}/>
                    <button onClick={AddPhotoLink} className="px-4 text-xs rounded-2xl">Add photo</button>
                </div>
        
                <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {addedPhotos.length > 0 && addedPhotos.map (link => (
                        <div key={link}className="h-32 flex" >
                            <img className="rounded-2xl w-full object-cover " src={'http://localhost:3000/uploads/'+ link} />
                        </div>
                    ))}
                    <label className="cursor-pointer flex justify-center items-center min-w-[150px] border bg-transparent rounded-2xl py-4 px-6 text-sm text-gray-500 gap-2">
                        <input type="file" multiple className="hidden" onChange={uploadphoto}/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                         </svg>
                        Upload from device
                    </label>
                </div>
    </>
  )
}

