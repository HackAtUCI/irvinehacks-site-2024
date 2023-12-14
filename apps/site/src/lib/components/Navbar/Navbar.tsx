"use client";

import * as NavMenu from "@radix-ui/react-navigation-menu";

import styles from "./Navbar.module.scss";
import React from "react";
import { useState, useEffect } from "react";

import NavLinkItem from "./NavbarHelpers";
import Button from "@/lib/components/Button/Button";
import HackLogo from "@/lib/components/HackLogo/HackLogo";

import hamburger from "@/assets/icons/navigation-icon.svg";
import Image from "next/image";

function Navbar() {
	const [listShown, setListShown] = useState(false);
	const [hasScrolled, setHasScrolled] = useState(false);
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		const scrollHandler = () =>
			window.scrollY !== 0 ? setHasScrolled(true) : setHasScrolled(false);

		window.addEventListener("scroll", scrollHandler);
	}, []);

	return (
		<NavMenu.Root
			className={`${
				hasScrolled ? "md:bg-opacity-50" : ""
			} transition-colors duration-0 md:duration-700 ease-out w-full z-10 flex flex-col fixed bg-black bg-opacity-0 md:flex-row md:items-center`}
		>
			<NavMenu.List
				className={"bg-black bg-opacity-50 md:bg-opacity-0 flex p-3"}
			>
				<NavLinkItem href="/">
					<HackLogo />
				</NavLinkItem>
				<button
					className="ml-auto h-auto md:hidden cursor-pointer"
					onClick={() => {
						setListShown((listShown) => !listShown);
						setHidden(false);
					}}
				>
					<Image
						src={hamburger}
						width="40"
						alt="Mobile hamburger menu"
					/>
				</button>
			</NavMenu.List>
			<div
				className={`${styles.navMenuListWrapper} md:my-3 md:mr-3 md:ml-auto inline-block md:flex md:items-center`}
			>
				<NavMenu.List
					className={
						(hidden ? "opacity-0 " : "opacity-100 ") +
						(listShown ? "" : "-translate-y-full ") +
						"transition-transform duration-500 ease-in-out md:transition-none md:translate-y-0 md:opacity-100 " +
						"[&>*]:mb-5 [&>*]:md:mb-0 font-display gap-10 p-5 pt-3 bg-black bg-opacity-50 md:bg-opacity-0 md:p-0 md:flex md:items-center"
					}
					onTransitionEnd={() => setHidden(!listShown)}
				>
					{/* <NavLinkItem href="/">Home</NavLinkItem>
					<NavLinkItem href="/">Sponsor</NavLinkItem>
					<NavLinkItem href="/">Schedule</NavLinkItem>
					<NavLinkItem href="/">Resources</NavLinkItem>
					<NavLinkItem href="/">Stage</NavLinkItem> */}
					<Button text="Login" href="/api/saml/login" isLightVersion />
				</NavMenu.List>
			</div>
		</NavMenu.Root>
	);
}

export default Navbar;
