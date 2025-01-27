import { useForm } from "react-hook-form"
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import axios from 'axios'
import toast from 'react-hot-toast';

function Signup() {

  const location=useLocation();
  const navigate=useNavigate();
  const from=location.state?.from?.pathname || "/"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const onSubmit =async (data) => {
    const userInfo ={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
    }
 
    await axios.post("https://todo-list-mfz7.onrender.com/user/signup",userInfo)
    // await axios.post("http://localhost:5000/user/signup",userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        // alert("Signup Sucessfully")
        toast.success('Signup Sucessfully!');
        navigate(from,{replace: true});
      }
      localStorage.setItem("Users",JSON.stringify(res.data.user));
    })
    .catch((err)=>{
      if(err.response){
        console.log(err);
        // alert("Error: "+ err.response.data.message);
        toast.error("Error: "+ err.response.data.message);
      }
    });
  };

  return (
    <>
    <div className="bg-cover bg-center h-screen bg-gradient-to-r from-orange-400
           via-purple-500 to-pink-700 " >
    <div className='flex h-screen items-center justify-center' >
    <div className="w-[600px] ">
  <div className="modal-box  dark:bg-slate-900 dark:text-white">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
  
    <h3 className="font-bold text-lg">Signup</h3>
    {/* name */}
    <div className='mt-4 space-y-2'>
        <span>Fullname</span><br />
        <input type="text" placeholder='Enter your Name'className='w-8- px-3 rounded-md outline-none' 
         {...register("fullname", { required: true })}
        /><br />
        {errors.fullname && (<span className=" text-sm text-red-500">This field is required</span>)}
       </div>
    {/* email */}
       <div className='mt-4 space-y-2'>
        <span>Email</span><br />
        <input type="email" placeholder='Enter your email'className='w-8- px-3 rounded-md outline-none'
         {...register("email", { required: true })} />
          <br />
        {errors.email && (<span className=" text-sm text-red-500">This field is required</span>)}

       </div>
       {/* password */}
       <div className='mt-4 space-y-2'>
        <span>Password</span><br />
        <input type="text" placeholder='Enter your password'className='w-8- px-3 rounded-md outline-none' 
        {...register("password", { required: true })}
        /><br />
        {errors.password && <span className=" text-sm text-red-500">This field is required</span>}

       </div>
       {/* button */}
       <div className='flex justify-around mt-4'>
       <button className=' bg-pink-500 text-white rounded-md hover:bg-pink-700 px-3 py-1'>Signup</button>
       <p className='text-md'>Have account?{" "} <button to="/" className='underline text-blue-600 cursor-pointer' onClick={()=> document.getElementById("my_modal_3").showModal()}
       >Login</button>{" "}
       <Login/>
         </p>
       </div>
       </form>
  </div>
</div>
    </div>
    </div>
    </>
  )
}

export default Signup;
