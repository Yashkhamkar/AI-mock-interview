"use client";
import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import styles from "./Header.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const path = usePathname();
  const router = useRouter();

  const isActive = (pagePath) => path === pagePath;

  return (
    <div className="flex items-center justify-between p-4 bg-secondary shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.svg" width={160} height={100} alt="logo" />
        </Link>
      </div>
      <ul className="flex gap-6">
        <SignedIn>
          <li
            className={`${styles.listItem} ${
              isActive("/dashboard") ? styles.active : styles.listItemHover
            }`}
          >
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </SignedIn>
        <li
          className={`${styles.listItem} ${
            isActive("/working") ? styles.active : styles.listItemHover
          }`}
        >
          <Link href="/working">How it works ?</Link>
        </li>

        <li
          className={`${styles.listItem} ${
            isActive("/faqs") ? styles.active : styles.listItemHover
          }`}
        >
          <Link href="/faqs">FAQ's</Link>
        </li>
        <li
          className={`${styles.listItem} ${
            isActive("/upgrade") ? styles.active : styles.listItemHover
          }`}
        >
          <Link href="/upgrade">Upgrade</Link>
        </li>
      </ul>
      <div>
        <SignedOut>
          <div
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            <button className={`${styles.cssbuttons}`}>Sign-In</button>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
