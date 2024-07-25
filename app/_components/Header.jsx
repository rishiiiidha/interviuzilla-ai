"use client"
import React from "react";
import NavItem from "./NavItem";
import Button from "./Button";

const navItems = [
  { label: "About", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
];

function Header() {
  return (
    <header className="flex flex-col justify-center self-stretch py-4">
      <div className="flex justify-center items-center px-8 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col justify-center w-full max-w-screen-xl max-md:max-w-full">
          <nav className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <h1 className="flex flex-col justify-center my-auto text-2xl font-semibold leading-8 bg-clip-text text-white">
              Interviuzilla AI
            </h1>
            <ul className="flex gap-5 justify-between items-center text-sm leading-5 text-white mt-3 max-md:flex-wrap">
              {navItems.map((item, index) => (
                <NavItem key={index} label={item.label} href={item.href} />
              ))}
              <li>
                <Button label="GET STARTED" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
