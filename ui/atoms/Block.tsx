"use client";
import React from "react";
import { BlockProps } from "@/types/componentTypes";

const colors = {
  red: "bg-red", //
  green: "bg-green",
  blue: "bg-blue",
  yellow: "bg-yellow",
  purple: "bg-purple",
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  orange: "bg-orange",
  gray: "bg-gray",
  olive: "bg-olive",
  darkgreen: "bg-darkgreen",
  steelblue: "bg-steelblue",
  lime: "bg-lime",
  pink: "bg-pink",
  beige: "bg-beige",
  teal: "bg-teal",
  none: "bg-transparent",
  removingBlocks: "bg-transparent",
};

const Block: React.FC<BlockProps> = ({
  color,
  isSelected = false,
  onClick,
  className,
}) => {
  // Tailwind CSS 클래스를 동적으로 적용
  const classes = `
    w-28 h-9
    ${colors[color]}
    ${isSelected ? "border-4 border-blue-500" : "border border-black"} 
    inline-block cursor-pointer box-border
    ${className}
  `;

  return <div className={classes} onClick={onClick}></div>;
};

export default Block;
