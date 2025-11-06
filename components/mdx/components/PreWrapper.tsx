import { BashIcon, DockerIcon, ReactIcon, TsIcon } from "@/components/icons";
import { CopyButton } from "@/components/mdx/components/CopyButton";
import { cn } from "@/lib/utils";
import type { ReactElement, ReactNode } from "react";
import classes from "./PreWrapper.module.scss";

const icons: Record<string, ReactElement> = {
  ts: <TsIcon />,
  tsx: <ReactIcon />,
  dockerfile: <DockerIcon />,
  dockerignore: <DockerIcon fill="#455155" />,
  bash: <BashIcon />,
  yml: <DockerIcon />,
};

interface CodeProps {
  children: ReactNode;
  "data-language": string;
}

export default function PreWrapper({ children, ...props }: CodeProps) {
  return (
    <pre
      className={cn(
        classes.root,
        "my-8 p-1 border border-gray-100 rounded-md bg-gray-50"
      )}
    >
      {props["data-language"] !== "none" && (
        <div className="p-2 flex items-center justify-between">
          {icons[props["data-language"]] ?? null}
          <CopyButton content="" />
        </div>
      )}
      {children}
    </pre>
  );
}
