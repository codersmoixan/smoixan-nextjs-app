"use client";
import { BashIcon, DockerIcon, ReactIcon, TsIcon } from "@/components/icons";
import { CopyButton } from "@/components/mdx/components/CopyButton";
import { cn } from "@/lib/utils";
import { useRef, type ReactElement, type ReactNode } from "react";
import classes from "./Pre.module.scss";

const icons: Record<string, ReactElement> = {
  ts: <TsIcon />,
  tsx: <ReactIcon />,
  dockerfile: <DockerIcon />,
  dockerignore: <DockerIcon fill="#455155" />,
  bash: <BashIcon />,
  yml: <DockerIcon />,
};

interface PreProps {
  children: ReactNode;
  "data-language": string;
}

export default function Pre({ children, ...props }: PreProps) {
  console.log(props, 22165);
  const codeRef = useRef<HTMLPreElement>(null);

  const [language, fileName] = props["data-language"].split(":");

  return (
    <div
      className={cn(
        classes.root,
        "my-8 p-1 border border-gray-100 rounded-xl bg-gray-50"
      )}
    >
      {language !== "none" && (
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icons[language]}
            <span className="text-sm text-gray-500">{fileName}</span>
          </div>
          <CopyButton content={() => codeRef.current?.innerText || ""} />
        </div>
      )}
      <pre ref={codeRef}>{children}</pre>
    </div>
  );
}
