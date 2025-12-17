"use client"
import { useState, useEffect } from "react";
import { LoginType } from "@/type";
import Link from "next/link";
import { login } from "@/redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useTheme } from "@/context/ThemeContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage(){
    const {darkMode} = useTheme();
    const [loginForm, setLoginForm] = useState<LoginType>({email: '', password: ''});
    const [error, setError] = useState<string>('');
    const [showHide, setShowHide] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const users = useSelector((state: RootState) => state.auth.users);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const user = users.find((u:any) => u.email ===  loginForm.email && u.password === loginForm.password);
        if(!loginForm.email || !loginForm.password){
            setError('Enter all the fields.');
            return;
        }else if(!emailRegex.test(loginForm.email)){
            setError("Invalid email format.");
            return;
        }else if(!user){
            setError("Incorrect email or password")
            return;
        }else{
            setError('');
        }

        dispatch(login({email: loginForm.email, password: loginForm.password}))
        console.log(loginForm);
        router.push("/board");
    }

    useEffect(() => {
        if(isLoggedIn){
            router.push("/board")
        }
    }, [isLoggedIn, router])
    return(
        <>
        <div className={`min-h-screen px-4`}>
        <div className={`m-auto max-w-md mt-16 p-8 shadow-lg ${darkMode ? "bg-black text-white placeholder-gray-500" : "bg-gray-100 text-black placehoder-black"}`}>
           <h1 className="font-bold text-2xl mb-5 text-center mb-6">Login</h1>
           {error && (<p className="text-red-500 mb-4">{error}</p>)}
            <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                <div>
                    <label className="text-sm mb-2" htmlFor="email">Name</label>
                    <input className="w-full focus:ring-2 focus:ring-blue-500 focus:outline-none border rounded-lg p-2" name="email" type="email" id="email" value={loginForm.email} placeholder="Enter Email" onChange={(e) => setLoginForm({...loginForm, 'email': e.target.value})} />
                </div>
                <div>
                    <label className="text-sm mb-2" htmlFor="password">Password</label>
                    <div className="relative">
                        <input className="w-full border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2" name="password" type={showHide ? "text" : "password"} id="password" value={loginForm.password} placeholder="Enter Password" onChange={(e) => setLoginForm({...loginForm, 'password': e.target.value})} />
                        <div className="absolute -traslate-y-1/2 right-3 top-1/4"><button type="button" onClick={()=> setShowHide(prev => !prev)}>{showHide ? <EyeOff /> : <Eye />}</button></div>
                    </div>
                </div>
                <div className="w-full text-center">
                    <button className="w-max text-center bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-lg" type="submit">Login</button>
                </div>
                </div>
            </form> 

            <div className="m-auto">
                <p className="text-sm mt-4 text-center">Don't hane an account? {" "} <Link className="hover:underline text-purple-600 font-medium" href="/signup">Signup</Link></p>
            </div>
        </div>
        </div>
        </>
    )
}