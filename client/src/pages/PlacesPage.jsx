import { Link, useParams } from "react-router-dom";

export default function PlacesPage(){
    const {action} = useParams()
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
                
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm mt-2">Title for your place, should be short and catchy.</p>
                <input className="w-full p-4 mt-2 border rounded-lg" type='text' placeholder="title, for example: My lovely apartment"/> {/* Increased input size */}

                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm mt-2">Address to this place</p>
                <input className="w-full p-4 mt-2 border rounded-lg" type='text' placeholder="Enter your address"/> {/* Increased input size */}

                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm mt-2">more = better</p>
                <div className="flex gap-2">
                    <input className="w-full p-2 mt-2 border rounded-lg" placeholder="Add using Link"/>
                    <button className="px-4 text-xs rounded-2xl">Add photo</button>
                </div>
        
                <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <button className="flex justify-center items-center min-w-[150px] border bg-transparent rounded-2xl py-4 px-6 text-xl text-gray-500 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                         </svg>
                        Upload
                    </button>
                </div>

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm mt-2">Description of place</p>
                    <textarea/>

                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm mt-2">Select all the Perks</p> 

                <div className=" grid grid-cols-2  gap-4">
                    <label className="border p-4 mt-2 flex items-center gap-2 rounded-2xl">
                        <input  type='checkbox'/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        <span>Free Wi-Fi</span>
                    </label>
                    <label className="border p-4 mt-2 flex items-center gap-2 rounded-2xl ">
                        <input  type='checkbox'/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M19.5 6h-15v9h15V6Z" />
                        <path fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clipRule="evenodd" />
                        </svg>
                        <span>TV</span>
                    </label>
                    <label className="border p-4 flex items-center gap-2 rounded-2xl">
                        <input  type='checkbox'/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                        <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                        <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                        </svg>
                        <span>Free-Parking</span>
                    </label>
                    <label className="border p-4 flex items-center gap-2 rounded-2xl">
                        <input  type='checkbox'/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z" clipRule="evenodd" />
                        </svg>
                        <span>Private Entrance</span>
                    </label>
                </div>  
            </form>
        </div>
    )}

    </div>   
  )
}
