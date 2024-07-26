import React from "react";
import { NavLink } from "react-router-dom";

function Button({ label }) {
  return (
    <a href="/dashboard">
      <button className="flex flex-col justify-center self-stretch text-xs font-medium leading-4">
        <span className="px-5 py-4 bg-indigo-600 rounded-[50px]">{label}</span>
      </button>
    </a>
  );
}

export default Button;
