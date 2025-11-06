"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const TOC = () => {
  const [headings, setHeadings] = useState<
    { text: string; id: string; level: string }[]
  >([]);

  useEffect(() => {
    const articleElement = document.getElementById("article");
    if (!articleElement) return;

    const extractedHeadings = Array.from(
      articleElement.querySelectorAll("h2, h3, h4")
    ).map((heading) => ({
      text: heading.textContent || "",
      id: heading.id || "",
      level: heading.nodeName, // 'H2' or 'H3'
    }));

    setHeadings(extractedHeadings);
  }, []);

  return (
    <>
      <ul className="sticky top-[88px] right-0">
        {headings.map(({ text, id, level }) => (
          <li
            key={id}
            className={`my-1 ${
              level === "H3" ? "ml-4" : level === "H4" ? "ml-8" : ""
            }`}
          >
            <Link
              href={`#${id}`}
              className="link-hover text-xs text-gray-800 hover:text-blue-500 leading-none"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TOC;
