"use client"
import { useTheme } from "@/context/ThemeContext";

interface SearchProps{
  search: string,
  setSearch: (value: string) => void,
  sort: string,
  setSort: (value: string) => void
}
export default function SearchSort({search, setSearch, sort, setSort}: SearchProps) {
  
  const {darkMode} = useTheme();
  
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-end p-4 gap-5">
        <div>
          <label htmlFor="search">Search: {" "}</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search task by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`p-3 border rounded-lg ${darkMode
      ? "bg-black text-white border-gray-600 placeholder-white"
      : "bg-gray-100 text-black border-gray-300 placeholder-black"
    }`}
          />
        </div>
        <div>
          <label htmlFor="sort">Sort by: {" "}</label>
          <select
            name="sort"
            id="sort"
            className={`p-3 border rounded-lg ${darkMode
      ? "bg-black text-white border-gray-600"
      : "bg-gray-100 text-black border-gray-300"
    }`}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </>
  );
}
