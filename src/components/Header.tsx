"use client";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { redirect } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { UserType } from "@/type";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { addTask } from "@/redux/slice/boardSlice";

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.auth.users);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const task = useSelector((state: RootState) => state.board.tasks);
  console.log("tasks", task);

  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout());
    redirect("/login");
  };

  // const user: UserType | undefined = users.find((u) => u.email === userEmail);
  // Type should match exactly your UserType
  const user = users.find((u) => u.email === userEmail) as UserType | undefined;
  //   as Type = strong type safety with correct TS rules
  console.log("user", user);
  // if(users)
  return (
    <>
      <div
        className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 ${
          darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div>
          {isLoggedIn ? (
            <p>
              WelCome, &nbsp;{" "}
              <span className="font-bold">{user ? user.name : "Guest"}</span>
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex space-x-4 items-center">
          <div>
            {isLoggedIn ? (
              <>
                <div className="flex gap-4">
                  <button
                    onClick={() => setModalOpen(true)}
                    className={`px-4 py-2 rounded  ${
                      darkMode
                        ? "bg-gray-100 hover:bg-gray-200 text-black"
                        : "bg-gray-700 hover:bg-gray-900 text-white"
                    }`}
                  >
                    <span className="text-md">Add Task</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded  ${
                darkMode
                  ? "bg-gray-100 hover:bg-gray-200 text-black"
                  : "bg-gray-700 hover:bg-gray-900 text-white"
              }`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <>
          <AddTaskModal
          columnId="todo"
            onClose={() => setModalOpen(false)}
            onAdd={(task) => {
              dispatch(addTask(task));
            }}

          />
        </>
      )}
    </>
  );
}
