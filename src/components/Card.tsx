import React from "react";
import { FunctionComponent } from "react";

export type CardProps = {
  icon: string;
  borderColour: string;
  bgColour: string;
  title: string;
  copy: string;
};

export const Card: FunctionComponent<CardProps> = ({
  icon,
  borderColour,
  bgColour,
  title,
  copy,
}) => {
  return (
    <div className="relative flex items-center border border-gray-300 rounded-xl w-1/3 bg-white p-6">
      <div
        className="absolute left-0 transform -translate-x-1/2 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full flex items-center justify-center border-2 shadow-md"
        style={{
          borderColor: borderColour,
          backgroundColor: bgColour,
        }}
      >
        <img
          src={icon}
          alt="Icon"
          className="h-6 w-6 object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="pl-10">
        <h1 className="font-semibold mb-2">{title}</h1>
        <p className="text-[#7F7F81]">{copy}</p>
      </div>
    </div>
  );
};
