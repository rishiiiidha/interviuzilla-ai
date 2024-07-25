import React from 'react';

function Button({ label }) {
  return (
    <button className="flex flex-col justify-center self-stretch text-xs font-medium leading-4">
      <span className="px-5 py-4 bg-indigo-600 rounded-[50px]">
        {label}
      </span>
    </button>
  );
}

export default Button;