import React, { useState , useRef , useEffect } from 'react'
import { getDownloadURL, getStorage , ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import {  useSelector } from 'react-redux'




export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const imageRef = useRef(null)

  const [image , setImage] = useState(undefined)
  var [imagePercent, setImagePercent] =  useState(0)
  const [imageError , setImageError]  = useState(false)
  const [formData , setFormData] = useState({})
  console.log(imagePercent)
  console.log(formData)

  //styles
  const style = "bg-blue-100  rounded-lg placeholder-center text-center w-96 h-10 text-lg border-gray-500 border-2 focus:text-black text-gray-600"
  const styledButton = 'bg-gradient-to-tr from-green-900 to-blue-900 text-white rounded-lg text-medium w-32 h-10 hover:opacity-60 mt-5';




  useEffect(()=> {
    if(image){
      handleImage(image)
    }

  }, [image])

  const handleImage  = async (image) => {
    console.log(image)
    const storage = getStorage(app) 
    const fileName = image.name + new Date().getTime() 
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)


    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImagePercent(Math.round(progress))

      },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => {
          setFormData({
            ...FormData, profilePicture: downloadURL

          });
        });
      }
    );

  }

  

  return (
    <div className='display flex flex-col items-center gap-10 '>
      <h1 className=' text-4xl py-10 w-64 drop-shadow-lg text-gray-900'>Profile</h1>
      <input type="file" accept="image/*" ref={imageRef} hidden  onChange={(e) => { setImage(e.target.files[0])}}/>
      <img src={(imagePercent == 100) ? formData.profilePicture : currentUser.profilePicture} alt="profile" className='w-40 h-40 mx-atuo rounded-full' onClick={() => imageRef.current.click()} />
      <p>
        {imageError ? 
          (<span className='text-red-800 text-center'>There's an error ( image should be less than 2MB )</span>) 
          : (imagePercent == 100)  ? 
          (<span className='text-green-800 text-center'>Image uploaded succefully</span>): null}
      </p>

      <form className='display flex flex-col items-center gap-5 mt-20 mx-auto'>

        <input defaultValue={currentUser.username} type="name" placeholder='name' className={style}></input>
        <input defaultValue={currentUser.email} type="email" placeholder='email' className={style}></input>
        <input type="password" placeholder='password' className={style}></input>

        <button onClick={()=> alert("it's working bro")}  className={styledButton}>Update</button>

        <div className='mt-16 display flex justify-center gap-40'>
          <span className='text-red-900 cursor-pointer' href="https://example.com/delete-account">
            Delete account
          </span>
          <span className='ml-4 text-red-900 cursor-pointer' href="https://example.com/sign-out">
            Sign Out </span>
        </div>


      </form>
    </div>
  )
}
