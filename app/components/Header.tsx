'use client';

import Link from "next/link";
import { RootState } from "../redux-service/store";
import { useDispatch, useSelector } from "react-redux";
import { unset_auth_user_id } from "../redux-service/slices/user-area/authUserReducer";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function Header() {

    const router = useRouter();
    const UserID = useSelector((state: RootState) => state.auth_user_id);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(unset_auth_user_id());
        signOut();
        router.push('/');
    }

    return (
        <>
            <header className="flex items-center px-[20px] py-[15px] gap-x-[20px] bg-zinc-200">
                <div className="mr-auto">
                    <h1 className="text-[20px] md:text-[25px] font-semibold text-zinc-900">
                        <Link href="/" title="Home">
                            GTNextAuth
                        </Link>
                    </h1>
                </div>

                <div>
                    {
                        UserID.auth_user_id ? 
                        (
                            <button 
                                title="Sign Out"
                                type="button" 
                                className="inline-block transition-all delay-75 py-[10px] md:py-[15px] px-[20px] md:px-[25px] font-semibold text-[16px] md:text-[18px] bg-red-600 text-white rounded-lg hover:bg-blue-700" 
                                onClick={handleLogOut}
                            >
                                Sign Out
                            </button>
                        ) 
                        : 
                        (
                            <Link 
                                href="/sign-in" 
                                title="Sign In" 
                                className="inline-block transition-all delay-75 py-[10px] md:py-[15px] px-[20px] md:px-[25px] font-semibold text-[16px] md:text-[18px] bg-zinc-800 text-white rounded-lg hover:bg-blue-700" 
                            >
                                Sign In
                            </Link>
                        )
                    }
                </div>
            </header>
        </>
    )
}

export default Header;