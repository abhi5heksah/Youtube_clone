import React, { useState, KeyboardEvent } from "react";
import { AlignJustify, Search, Mic, Video, Bell } from "lucide-react";
import { useNavigate } from "@remix-run/react";

type User = { image?: string; name?: string };

export default function Navbar({ user }: { user?: User | null }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryHandler = (event: KeyboardEvent<HTMLInputElement> | "searchButton") => {
    if (
      ((typeof event === "string" && event === "searchButton") ||
        (typeof event !== "string" && event.key === "Enter")) &&
      searchQuery.length > 0
    ) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex justify-between fixed top-0 w-full items-center px-6 py-2 bg-white shadow z-50">
      {/* Left: Logo + menu */}
      <div className="flex items-center space-x-4">
        <AlignJustify className="w-6 h-6 cursor-pointer" />
        <img src="/logo.png" alt="logo" className="w-28 cursor-pointer" />
      </div>

      {/* Center: Search */}
      <div className="flex items-center w-[40%]">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-4 py-2 border rounded-l-full outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={searchQueryHandler}
          value={searchQuery}
        />
        <button
          className="px-4 py-2 border bg-gray-100 rounded-r-full"
          onClick={() => {
            searchQueryHandler("searchButton");
          }}
        >
          <Search size={20} />
        </button>
        <Mic
          size={36}
          className="ml-3 bg-gray-400 border rounded-full p-2 cursor-pointer hover:bg-gray-300"
        />
      </div>

      {/* Right: icons + user img */}
      <div className="flex items-center space-x-5">
        <Video className="cursor-pointer" />
        <Bell className="cursor-pointer" />
        <img
          src={user?.image || "/profile.png"}
          alt={user?.name || "profile"}
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}