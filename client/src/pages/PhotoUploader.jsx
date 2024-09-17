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
    function removePhoto(ev,filename){
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo=> photo !== filename)]);
    }

    function SelectAsMainPhoto(ev,filename){
        ev.preventDefault();
        onChange([filename,...addedPhotos.filter(photo=> photo !== filename)]);
       
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
                        <div key={link}className="h-32 flex relative" >
                            <img className="rounded-2xl w-full  object-cover " src={'http://localhost:3000/uploads/'+ link} />

                            <button onClick={(ev)=>{removePhoto(ev,link)}}  className="cursor-pointer absolute bottom-1 right-1 text-white bg-black p-2 py-1 px-1 bg-opacity-50 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                </svg>

                            </button>
                            <button onClick={(ev)=>{SelectAsMainPhoto(ev,link)}}  className="cursor-pointer absolute bottom-1 left-1 text-white bg-black p-2 py-1 px-1 bg-opacity-50 rounded-lg">
                        
                            {link === addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            )}

                            {link !==addedPhotos[0] && (
                                
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        )}
                            </button>
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

