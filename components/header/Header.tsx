import DocSearch from "@/components/DocSearch";
import { docSearchConfig } from "@/components/DocSearch/docSearch";
import HeaderLinks from "@/components/header/HeaderLinks";
import { siteConfig } from "@/config/site";
import Link from "next/link";

function Header() {
  return (
    <header className="mx-auto max-w-[1280px] px-4 py-3 sticky top-0 z-50 backdrop-blur-sm">
      <nav className="relative z-50 flex justify-between">
        <div className="flex items-center md:gap-x-12">
          <Link href="/" className="flex items-center space-x-1 font-bold">
            <h1 className="mt-0 mb-0">
              <span>zj</span>
            </h1>
          </Link>
          <div className="hidden md:flex md:gap-x-6">
            {siteConfig.headerProducts.map((product) => (
              <Link key={product.name} href={product.url}>
                {product.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          {/* <SearchBar posts={posts} /> */}
          {docSearchConfig.docSearch.appId ? <DocSearch /> : <></>}

          <HeaderLinks />
          {/* <ThemedButton /> */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
