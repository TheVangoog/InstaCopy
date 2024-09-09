import { useState, useEffect } from "react"
import UserCard from "../../Components/UserCard/UserCard"
import Service from "../../Services/Service"
import { useDispatch, useSelector } from "react-redux";
import { UPDATEPOST, UPDATEUSER, UPDATESTATE } from "../../Redux/userSlice";
import { useNavigate } from "react-router";

export default function Login() {
   const [showLogIn, setShowLogIn] = useState(false)
   const [showSignUp, setShowSignUp] = useState(false)
   const [formData, setFormData] = useState(null)
   const [userNames, setUserNames] = useState(null)

   const service = new Service();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserNames = async () => {
            const users = await service.getUsers()
            setUserNames(users.map(user => user.name))
      }

      if(!userNames) {
         fetchUserNames()
      }
   }, [service, userNames])
   

   const handleLogIn = () => {
      setShowLogIn(true)
      setShowSignUp(false)
   }

   const handleSignUp = () => {
      setShowLogIn(false)
      setShowSignUp(true)
   }

   
   // @todo: get to know that function methods better, work with forms
   const getFormData = async (e) => {
      e.preventDefault()
      const users = await service.getUsers()
      const newestId = `${+users[users.length - 1].id + 1}`
      const formData = new FormData(e.target)
      const payload = Object.fromEntries(formData)
      console.log(payload)
      const loggedUser = (await service.getUser(payload.id))[0]
      const signedUser = {
         name: payload.username,
         password:  payload.password,
      }
      //login
      if( payload.id < newestId && payload.password === loggedUser.password) {
         dispatch(UPDATESTATE(loggedUser.id))
         console.log("logged user successfully " + loggedUser.id)
         navigate('/')
         // @todo: html show your id and name is
      } else {
         // @todo: html show that password is incorrect
      }
      //login

      //signup
      if( signedUser && userNames.includes(signedUser.name) ) {
         console.log("user already registered")
      } else {
         const userData = {
            "dataType": "users",
            "id": newestId,
            "name": signedUser.name,
            "likes": [],
            "favourites": [],
            "password": signedUser.password
          }
         service.addUser(userData)
         setUserNames([...userNames, signedUser.name])
      }
      //signup
   }


   const logInClases = showLogIn ? 
    'postcard bg-transparent min-w-[14rem] md:min-w-[30rem] max-w-[20rem] md:max-w-[30rem]  max-h-[40rem] flex flex-col items-center border-slate-700 border-2'
    : 'hidden'

    const signUpClases = showSignUp ? 
    'postcard bg-transparent min-w-[14rem] md:min-w-[30rem] max-w-[20rem] md:max-w-[30rem]  max-h-[40rem] flex flex-col items-center border-slate-700 border-2'
    : 'hidden'
   return (
      <>
         <div className="gallery
       row-span-11 col-span-12 md:row-span-12 md:col-span-9
       overflow-auto
       flex flex-col items-center gap-4
       ">
            <div className="flex flex-col items-center justify-center m-4">
               <h1 className="text-white text-lg font-bold">
                  Accounts
               </h1>
            </div>
            <div className='postcard
        bg-transparent
        min-w-[14rem] md:min-w-[30rem]
        max-w-[20rem] md:max-w-[30rem]  max-h-[40rem]
        flex flex-col items-center
        border-slate-700
        border-2'>
               <div className='card-user
            bg-slate-800  
            min-h-[4rem]
            w-full
            flex flex-row items-center justify-around
            gap-5 p-5
            '
               >
                  <div className="flex flex-row items-center">
                     <span onClick={handleSignUp} className="btn ">
                        Sign Up
                     </span>
                  </div>
                  <span onClick={handleLogIn} className="btn ">
                     Log in
                  </span>
               </div>
            </div>
            

            <div className={logInClases}>
               <div className='card-user
            bg-slate-800  
            min-h-[4rem]
            w-full
            flex flex-row items-center justify-around
            gap-5 p-5
            '
               >
                  <form onSubmit={getFormData} className="flex flex-col gap-5 items-center text-slate-600">
                     <input required name="id" placeholder=" ID "/>
                     <input required name='password' placeholder=" Password "/>
                  <button  type="submit" className="btn ">
                     Log in
                  </button>
                  </form>
               </div>
            </div>

            <div className={signUpClases}>
               <div className='card-user
            bg-slate-800  
            min-h-[4rem]
            w-full
            flex flex-row items-center justify-around
            gap-5 p-5
            '
               >
                  <form onSubmit={getFormData} className="flex flex-col gap-5 items-center text-slate-600">
                  <input required name="username" placeholder=" Username "/>
                  <input required name="password" placeholder=" Password "/>
                  <button type="submit" className="btn ">
                     Sign Up
                  </button>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}
