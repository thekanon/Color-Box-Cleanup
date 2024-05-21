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
};

const Block: React.FC<BlockProps> = ({
  color,
  isSelected = false,
  onClick,
}) => {
  // Tailwind CSS 클래스를 동적으로 적용
  const classes = `
    w-24 h-12 
    ${colors[color]}
    ${isSelected ? "border-4 border-blue-500" : "border border-black"} 
    inline-block cursor-pointer box-border
  
  `;

  return (
    <div className={classes} onClick={onClick}>
      {/* 블록 내에 추가적인 내용이 필요하면 여기에 렌더링 */}
    </div>
  );
};

export default Block;
