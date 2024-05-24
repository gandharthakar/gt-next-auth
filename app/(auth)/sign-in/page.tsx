'use client';

import Link from "next/link";
import GoogleLoginButton from "@/app/components/googleLoginButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { getCookie, setCookie } from 'cookies-next';

interface SignInFormType {
    user_email: string,
    user_password: string
}

let defaultToastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 800,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
}

interface JWTDec {
    is_auth_user: string,
    exp: bigint,
    iat: bigint
}

function Page() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formFildsData, setFormFieldsData] = useState<SignInFormType>(
        {
            user_email: '',
            user_password: ''
        }
    );

    const handleInputChange = (e: any) => {
        let {name, value} = e.target;
        
        setFormFieldsData((prevVals) => {
            return {
                ...prevVals,
                [name]: value
            }
        });
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);
        const response = await fetch('/api/user/sign-in', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formFildsData.user_email,
                password: formFildsData.user_password,
            })
        });
        const data = await response.json();
        if(data.success === false) {
            toast.error(data.message, defaultToastOptions);
            setIsLoading(false);
        } else {
            toast.success(data.message);
            setFormFieldsData({
                user_email: '',
                user_password: '',
            });
            let uid: JWTDec = jwtDecode(data.token);
            setCookie('is_auth_user', data.token);
            const st = setTimeout(function(){
                router.push(`/dashboard/${uid.is_auth_user}`);
                clearTimeout(st);
            }, 1000);
        }
    }

    useEffect(() => {
        let cok = getCookie('is_auth_user');
        if(cok) {
            let uid: JWTDec = jwtDecode(cok);
            router.push(`/dashboard/${uid.is_auth_user}`);
        }
    });

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center py-[50px] px-[20px] min-h-screen">
                <div className="max-w-[450px] mx-auto w-full">
                    <div className="pb-[20px] text-center">
                        <h1 className="inline-block text-[20px] md:text-[25px] font-semibold text-zinc-900">
                            <Link href="/" title="Home">
                                GTNextAuth
                            </Link>
                        </h1>
                    </div>

                    <div className="bg-zinc-200 py-[50px] px-[20px] md:px-[50px] rounded-lg">
                        <form onSubmit={handleFormSubmit}>
                            <div className="pb-[15px]">
                                <label htmlFor="unmeml" className="block mb-[5px] text-[18px] md:text-[20px] font-semibold">
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    id="unmeml" 
                                    name="user_email" 
                                    autoComplete="off" 
                                    className="transition-all delay-75 block w-full py-[10px] md:py-[15px] px-[20px] border-[2px] border-solid border-zinc-800 bg-white focus:border-blue-700 focus:outline-0 font-semibold text-[16px] md:text-[18px]" 
                                    value={formFildsData.user_email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="pb-[25px]">
                                <label htmlFor="paswd" className="block mb-[5px] text-[18px] md:text-[20px] font-semibold">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    id="paswd" 
                                    name="user_password" 
                                    autoComplete="off" 
                                    className="transition-all delay-75 block w-full py-[10px] md:py-[15px] px-[20px] border-[2px] border-solid border-zinc-800 bg-white focus:border-blue-700 focus:outline-0 font-semibold text-[16px] md:text-[18px]" 
                                    value={formFildsData.user_password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="pb-[25px] text-right">
                            {
                                    isLoading ? 
                                    (
                                        <div className="spinner"></div>
                                    ) 
                                    : 
                                    (
                                        <button 
                                            type="submit" 
                                            title="Sign In" 
                                            className="inline-block transition-all delay-75 py-[10px] md:py-[15px] px-[20px] md:px-[25px] font-semibold text-[16px] md:text-[18px] bg-zinc-800 text-white rounded-lg hover:bg-blue-700" 
                                        >
                                            Sign In
                                        </button>
                                    )
                                }
                            </div>
                        </form>
                        <div className="pb-[25px] text-center">
                            <div className="inline-block text-[18px] md:text-[20px] font-semibold">
                                OR
                            </div>
                        </div>
                        <GoogleLoginButton />
                    </div>

                    <div className="pt-[15px] text-center">
                        <h4 className="text-[16px] md:text-[18px] text-zinc-800">
                            {`Don't have an account`} ? <span className="font-semibold">Please <Link href="/sign-up" title="Sign Up" className="text-blue-700">Sign Up</Link></span>
                        </h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;