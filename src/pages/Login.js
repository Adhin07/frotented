import React, { useContext } from 'react'
import { useState } from 'react';
import loginIcons from '../assest/signin.gif'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { fetchUserDetails } from '../apis/fetching';
import { useDispatch } from 'react-redux';




const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data,setData]=useState({
    email : "",
    password :""
  })

  const dispatch = useDispatch()
   

  const navigate =useNavigate()
  const generalContext = useContext(Context)


  const handleOnChange =(e) =>{
    const {name,value} = e.target

    setData((prev)=>{
      return{
        ...prev,
        [name] :value
      }
    })
  }

  const handleSubmit =async (e)=>
    {
      e.preventDefault()

      const dataResponse =await fetch(SummaryApi.signIn.url,{
         method :SummaryApi.signIn.method,
         credentials :"include",
         headers :{
          "content-type" :"application/json"
         },
         body:JSON.stringify(data)
      }) 

      const dataApi =await dataResponse.json()


      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails({dispatch})
      }


      if(dataApi.error){
        toast.error(dataApi.message)
      }


    }



  return (
    <section id="login" >
      <div className='mx-auto container p-4'>
        <div className='bg-gradient-to-r from-blue-400 to-red-400 p-5 w-full max-w-sm mx-auto rounded-2xl'>

          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt="login icons" style={{borderRadius:100}} />
            
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

          


            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2 rounded-md'>
                <input type="email" 
                placeholder='enter email'
                name='email'
                 onChange={handleOnChange}
                 value={data.email}
                 className='w-full h-full outline-none bg-transparent ' />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex rounded-md'>
                <input type={showPassword ? "text" : "password"} 
                placeholder='enter password'
                value={data.password}
                name='password' 
                onChange={handleOnChange}
                className='w-full h-full  bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => {
                  setShowPassword((prev) => !prev)
                }}>

                  



                  <span>
                    {
                      showPassword ?
                        (
                          <FaEye />
                        )
                        :
                        (
                          <FaEyeSlash />
                        )
                    }


                  </span>
                </div>
              </div>
             <Link to={'/ForgotPassword'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
             Forgot password ?
             </Link>
            </div>

            

            <button className='bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

          </form>

                    <p className='my-5'>Don't have account ? <Link to={"/SignUp"} className='text-red-600 hover:text-red-700 hover:underline'>Sign Up</Link></p>

        </div>

      </div>
    </section>
  )
}

export default Login