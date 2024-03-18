import Link from "next/link";
import React from "react";

export default function NoPermissionPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-48px)]">
      <div className="bg-gray-100 p-16 rounded-lg text-center">
        You don&apos;t have Permission to see this page.
        <Link href="/">
          <div className="text-blue-500 hover:underline">Go back</div>
        </Link>
      </div>
    </div>
  );
}
