import { Info } from "lucide-react";
import React from "react";

export default function Blockquote({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="rounded-md bg-gray-50 p-1 text-blue-600" {...props}>
      <div className="p-2 flex items-center gap-2">
        <Info className="size-4" />
        <span className="uppercase text-sm font-bold">Info</span>
      </div>
      <div className="p-4 bg-white rounded-md text-sm font-medium">
        {children}
      </div>
    </blockquote>
  );
}
