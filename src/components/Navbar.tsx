import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between items-center px-8 py-5 mb-2">
        <div className="text-2xl font-bold">NFT Marketplace</div>
        <div className="flex gap-6 items-center">
          <div className="flex gap-6">
            <div className="ring-1 ring-black p-2 rounded-sm">
              <Link href="/">Home</Link>
            </div>
            <div className="ring-1 ring-black p-2 rounded-sm">
              <Link href="/createToken">Create NFT</Link>
            </div>
          </div>
          <ConnectButton />
        </div>
      </nav>
      <hr />
    </header>
  );
};
