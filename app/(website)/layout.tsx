import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/components/Header";
import RedProv from "../redux-service/reduxProvider";
import CheckAuthUser from "../lib/checkAuthUser";
import GoogleAuthSessionProvider from "../lib/googleAuthSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "GT Next App - Main",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<GoogleAuthSessionProvider>
					<RedProv>
						<CheckAuthUser>
							<Header />
							{children}
						</CheckAuthUser>
					</RedProv>
				</GoogleAuthSessionProvider>
			</body>
		</html>
	);
}
