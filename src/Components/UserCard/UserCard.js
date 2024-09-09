import Bookmark from "../../Assets/Icons/Bookmark"
import Like from "../../Assets/Icons/Like"
import Chat from "../../Assets/Icons/Chat"

export default function UserCard() {
    return (
        <div className='postcard
         bg-transparent
         min-w-[14rem] md:min-w-[30rem]
         max-w-[25rem] md:max-w-[30rem]  max-h-[40rem]
         flex flex-col items-center
         border-slate-700
         border-2'>
            <div className='card-user
             bg-slate-800  
             min-h-[4rem]
             w-full
             flex flex-row items-center justify-between
             gap-5 p-5
             '
            >
                <div className="flex flex-row items-center gap-5">
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Taras_Shevchenko_-_portrait_by_Ivan_Kramskoi.jpg/1200px-Taras_Shevchenko_-_portrait_by_Ivan_Kramskoi.jpg'
                        alt='avatar'
                        className='avatar
                w-12 h-12
                rounded-full'/>
                    <span className='username text-white text-base'>
                        Тарас Шевченко
                    </span>
                </div>
                <a className="btn justify-self-end">
                    Log in
                </a>
            </div>
        </div>
    )
}