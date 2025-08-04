import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function logo() {
  return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
          src="/logo.svg"
          fill
          alt="Image AI"
          className=" shrink-0 hover:opacity-75 transition"
        ></Image>
      </div>
    </Link>
  );
}
