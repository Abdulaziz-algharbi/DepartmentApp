import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<main className="dark:bg-baby_veryBlack relative">
			<Navbar />
			<div className="flex">
				{/* placeholder leftNavBar component */}
				<div className="dark:text-pumpkin hidden text-xl md:block">
					Left Navbar
				</div>
				<section className="flex min-h-screen flex-1 flex-col px-4 pt-24 pb-6 sm:px-6 lg:px-8 lg:pt-32">
					<div>{children}</div>
				</section>
				{/* placeholder rightNavBar component */}
				<div className="dark:text-pumpkin hidden text-xl md:block">
					Right Navbar
				</div>
			</div>
		</main>
	);
};

export default Layout;
