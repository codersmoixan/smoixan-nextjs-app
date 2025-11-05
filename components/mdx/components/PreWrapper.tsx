import { TsIcon } from "@/components/icons";
import { CopyButton } from "@/components/mdx/components/CopyButton";
import type { ReactElement, ReactNode } from "react";

const icons: Record<string, ReactElement> = {
  ts: <TsIcon />,
};

interface CodeProps {
  children: ReactNode;
  "data-language": string;
}

export default function PreWrapper({ children, ...props }: CodeProps) {
  console.log(props, "props");
  return (
    <pre className="my-8 p-1 border border-gray-100 rounded-md bg-gray-50">
      <div className="p-2 flex items-center justify-between">
        {icons[props["data-language"]] ?? null}
        <CopyButton content="" />
      </div>
      {children}
    </pre>
  );
}
