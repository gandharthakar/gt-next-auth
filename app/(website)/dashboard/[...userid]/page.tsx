import Link from "next/link";

function Page() {
    return (
        <div className="flex flex-col items-center justify-center py-[100px] px-[20px] min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-88px)]">
            <div className="pb-[10px] text-center">
                <h1 className="text-[25px] md:text-[30px] font-bold text-zinc-800">
                    Welcome To GTNextAuth Dashboard Page.
                </h1>
            </div>
            <div className="pb-[20px] text-center">
                <h2 className="text-[16px] md:text-[18px] font-semibold text-zinc-800">
                    Go To Home Page.
                </h2>
            </div>
            <div>
                <Link href="/" title="Home" className="inline-block transition-all delay-75 py-[10px] md:py-[15px] px-[20px] md:px-[25px] font-semibold text-[16px] md:text-[18px] bg-zinc-800 text-white rounded-lg hover:bg-blue-700">
                    Home
                </Link>
            </div>
        </div>
    )
}

export default Page;