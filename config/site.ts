import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsWechat } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const baseSiteConfig = {
  name: "zhengji.su",
  description:
    "Zhengji.su is a personal website of Zhengji.su, implemented using Next.js + MDX.",
  url: "https://smoixan.cn",
  metadataBase: "/",
  keywords: ["zhengji.su"],
  authors: [
    {
      name: "zhengji.su",
      url: "https://smoixan.com",
      twitter: "https://twitter.com",
    },
  ],
  creator: "@zhengji.su",
  defaultNextTheme: "light", // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  headerProducts: [
    { url: "/", name: "Home" },
    { url: "/posts", name: "Posts" },
  ],
  headerLinks: [
    {
      name: "repo",
      href: "https://github.com/codersmoixan/smoixan-nextjs-app",
      icon: BsGithub,
    },
  ],
  footerLinks: [
    { name: "email", href: "mailto:367265893@qq.com", icon: MdEmail },
    {
      name: "github",
      href: "https://github.com/codersmoixan/",
      icon: BsGithub,
    },
    {
      name: "weChat",
      href: "https://smoixan.cn",
      icon: BsWechat,
    },
  ],
  footerProducts: [
    { url: "https://smoixan.cn/", name: "Smoixan" },
    { url: "https://github.com/codersmoixan", name: "Github" },
    { url: "https://smoixan.cn/about-us", name: "About Us" },
    { url: "https://smoixan.cn/contact-us", name: "Contact Us" },
    { url: "https://nextjscn.org/", name: "Next.js 中文文档" },
  ],
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
    images: [`${baseSiteConfig.url}/og.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    site: baseSiteConfig.url,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.jpg`],
    creator: baseSiteConfig.creator,
  },
};
