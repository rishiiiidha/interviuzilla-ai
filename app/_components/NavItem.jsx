"use client";
import React from "react";

function NavItem({ label, href }) {
  return (
    <li>
      <a href={href} className="p-3 whitespace-nowrap">
        {label}
      </a>
    </li>
  );
}

export default NavItem;
