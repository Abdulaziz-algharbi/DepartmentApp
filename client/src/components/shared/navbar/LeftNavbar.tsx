"use client";
import { Button } from "@/components/ui/button";
import { leftNavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftNavbar = () => {
	const pathname = usePathname();
	return (
		<section className="bg-baby_rich light-border custom-scrollbar shadow-platinum sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-[297px] dark:shadow-none">
			<div className="flex flex-1 flex-col gap-6">
				{leftNavLinks.map((linkItem) => {
					const isActive =
						(pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
						pathname === linkItem.path;
					return (
						<Link
							href={linkItem.path}
							key={linkItem.label}
							className={`${isActive ? "electricIndigo-gradient text-baby_veryBlack rounded-lg" : "text-baby_rich"} flex items-center justify-start gap-4 bg-transparent p-4`}
						>
							<Image
								src={linkItem.imgLocation}
								alt={linkItem.label}
								width={22}
								height={22}
								className={`${isActive ? "" : "color-invert"}`}
							/>
							<p
								className={`${isActive ? "base-bold text-babyPowder" : "base-medium text-veryBlack"} max-lg:hidden`}
							>
								{linkItem.label}
							</p>
						</Link>
					);
				})}
			</div>

			<div className="flex flex-col gap-3">
				<Link href="/register">
					<Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-baby_balloon min-h-[41px] w-full cursor-pointer rounded-lg border px-4 py-3 shadow-none">
						Register
					</Button>
				</Link>
				<Link href="/login">
					<Button className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_balloon min-h-[41px] w-full cursor-pointer rounded-lg border px-4 py-3 shadow-none">
						Login
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default LeftNavbar;
