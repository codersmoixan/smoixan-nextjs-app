import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import classes from "./Code.module.scss";

export default function Code({ children, ...props }: { children: ReactNode }) {
  return (
    <code
      className={cn(
        classes.root,
        "text-xs p-4 rounded-md border-gray-100 overflow-auto"
      )}
      {...props}
    >
      {children}
    </code>
  );
}
