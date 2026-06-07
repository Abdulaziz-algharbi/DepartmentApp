"use client";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { leftNavLinks } from "@/constants";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LeftNavContent() {
	const pathname = usePathname();
	return (
		<section className="flex flex-col gap-4">
			{leftNavLinks.map((linkItem) => {
				const isActive =
					(pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
					pathname === linkItem.path;
				return (
					<SheetClose asChild key={linkItem.path}>
						<Link
							href={linkItem.path}
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
								className={`${isActive ? "base-bold text-gray-100" : "base-medium text-veryBlack"} `}
							>
								{linkItem.label}
							</p>
						</Link>
					</SheetClose>
				);
			})}
		</section>
	);
}

const MobileNavbar = () => {
	return (
		<Sheet>
			<SheetTrigger asChild className="cursor-pointer">
				<Image
					src="/assets/icons/mobile-menu.svg"
					alt="Mobile Menu"
					width={36}
					height={36}
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent side="left" className="bg-baby_rich border-none">
				<SheetTitle className="hidden">Navigation Menu</SheetTitle>
				<Link href="/" className="flex items-center gap-1 pt-5">
					<HomeModernIcon className="mr-2 size-11 text-lime-500" />
					<p className="h2-bold text-baby_veryBlack font-robotoSlab">
						AzizG <span className="text-lime-500"> Apartments</span>
					</p>
				</Link>
				<div>
					<SheetClose asChild>
						<LeftNavContent />
					</SheetClose>
					<SheetClose asChild>
						<SheetFooter>
							<Link href="/register">
								<Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-baby_rich mt-4 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
									Register
								</Button>
							</Link>
							<Link href="/login">
								<Button className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_rich min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
									Login
								</Button>
							</Link>
						</SheetFooter>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNavbar;
