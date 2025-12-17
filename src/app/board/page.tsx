"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@/context/ThemeContext";
import SearchSort from "@/components/SearchSort";
import Board from "@/components/Board";

export default function BoardPage() {
  const { darkMode, toggleTheme } = useTheme();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: RootState) => state.auth.userEmail);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("Newest");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <div
        className={`flex flex-col ${
          darkMode ? "bg-gray-100 text-black" : "bg-white-100 text-black"
        }`}
      >
        <SearchSort search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
         {/* Board takes remaining height */}
      <div className="flex-1 overflow-x-auto">
        <Board search={search} sort={sort}  />
        </div>
      </div>
    </>
  );
}
