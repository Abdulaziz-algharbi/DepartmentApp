"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const themeOptions = [
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
	{ value: "system", label: "System" },
];

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className="cursor-pointer border-none bg-transparent shadow-none"
			>
				<Button size="icon">
					<SunIcon
						className={`text-pumpkin size-[1.8rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90`}
						suppressHydrationWarning
					/>
					<MoonIcon
						className={`absolute size-[1.8rem] scale-0 rotate-90 text-gray-700 transition-all dark:scale-100 dark:rotate-0`}
						suppressHydrationWarning
					/>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="bg-babyPowder dark:bg-richBlack cursor-pointer rounded-md p-2"
			>
				{themeOptions.map(({ value, label }) => (
					<DropdownMenuItem
						key={value}
						onClick={() => setTheme(value)}
						className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${theme === "light" && value === "light" ? "text-pumpkin" : theme === "dark" && value === "dark" ? "text-blue-400" : theme === "light" ? "text-richBlack" : "text-babyPowde"}`}
					>
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeSwitcher;
