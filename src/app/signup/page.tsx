"use client"
import { useState, useEffect } from "react";
import { SignupType } from "@/type";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/redux/slice/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage(){

    const {darkMode} = useTheme();
    const [signupForm, setSignupForm] = useState<SignupType>({name: '', email: '', password: '', confirmPassword: ''});
    const [error, setError] = useState<string>('');
    const [showHide1, setShowHide1] = useState<boolean>(false);
    const [showHide2, setShowHide2] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.auth.users);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    const router = useRouter();

     useEffect(() => {
            if(isLoggedIn){
                router.push("/board")
            }
        }, [isLoggedIn, router])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword){
            setError("Enter all the fields.")
            return;
        }else if(!emailRegex.test(signupForm.email)){
            setError("Invalid email format.");
            return;
        }else if(signupForm.password.length < 6 || signupForm.confirmPassword.length < 6){
            setError("Password must be at least 6 characters.");
            return;
        }else if(signupForm.password !== signupForm.confirmPassword){
            setError("Password must be equal.");
            return;
        }else if(users.find((u: any) => u.email == signupForm.email)){
            setError("User already exists");
            return;
        }else{
            setError('')
        }
        
        dispatch(signup({email: signupForm.email, password: signupForm.password, name: signupForm.name}));
        router.push("/board");
        console.log(signupForm)
    }

    return(
        <>
            <div className="w-full px-4">
                <div className={`max-w-md shadow-lg m-auto rounded-lg mt-16 p-8 ${darkMode ? "bg-black text-white placeholder-gray-500" : "bg-gray-100 text-black placehoder-black"}`}>
                    <h1 className="text-xl font-bold text-center mb-6">Create Account</h1>
                    {error && (<p className="text-red-500 mb-4">{error}</p>)}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div>
                                <label className="text-sm" htmlFor="name">Name</label>
                                <input className="w-full focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg border p-2" type="text" name="name" id="name" value={signupForm.name} placeholder="Enter Name" onChange={(e) => setSignupForm({...signupForm, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-sm" htmlFor="email">Email</label>
                                <input className="w-full focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg border p-2" type="email" id="email" value={signupForm.email} placeholder="Enter Email" onChange={(e) => setSignupForm({...signupForm, email: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-sm" htmlFor="password">Password</label>
                                <div className="relative">
                                    <input className="w-full focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg border p-2" type={showHide1 ? "text" : "password"} name="password" id="password" placeholder="Enter Password" value={signupForm.password} onChange={(e) => setSignupForm({...signupForm, password: e.target.value})} />
                                    <div className="absolute top-1/4 right-3"><button onClick={() => setShowHide1(prev => !prev)} type="button">{showHide1 ? <EyeOff /> : <Eye />}</button></div>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm" htmlFor="confirmPassword">Confirm Password</label>
                                <div className="relative">
                                    <input className="w-full focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg border p-2" id="confirmPassword" type={showHide2 ? "text" : "password"} name="name" placeholder="Enter Confirm Password" value={signupForm.confirmPassword} onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})} />
                                    <div className="absolute top-1/4 right-3"><button onClick={() => setShowHide2(prev => !prev)} type="button">{showHide2 ? <EyeOff /> : <Eye />}</button></div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="px-5 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg">Signup</button>
                            </div>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-center text-sm">Already have an account? {" "} <Link className="text-purple-600 hover:underline text-sm" href="/login">Login</Link></p>
                    </div>
                </div>

            </div>
        </>
    )
}