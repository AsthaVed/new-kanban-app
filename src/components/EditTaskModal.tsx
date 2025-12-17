import { useTheme } from "@/context/ThemeContext";
import { Task, updateTask } from "@/redux/slice/boardSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface EditingTaskId {
  editingTaskId: string;
  onClose: () => void;
}

export default function EditTaskModal({
  editingTaskId,
  onClose,
}: EditingTaskId) {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const tasks = useSelector((state: RootState) => state.board.tasks);
  const findTask: Task | undefined = tasks.find((t) => t.id === editingTaskId);
  console.log("findTask", findTask);
  const dispatch = useDispatch<AppDispatch>();
  const {darkMode} = useTheme();

  useEffect(() => {
    if (findTask) {
      setEditTask(findTask);
    }
  }, [findTask]);

  const handleUpdate = (e: React.FormEvent) => {
  e.preventDefault(); 

  if (!editTask) return;

  dispatch(updateTask(editTask));
  onClose();
};


  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-2`}>
        <div className={`w-full max-w-md p-6 sm:p-4 xs:p-3 rounded-lg shadow-lg ${darkMode ? "bg-black text-white placeholder-gray-500 border-gray-600" : "bg-gray-100 text-black placehoder-black border-gray-300"}`}>
          <div onClick={onClose} className="top-0 right-1 cursor-pointer flex justify-between items-center mb-3">
            <p className="font-bold">Edit Task</p>
            <button className={`text-2xl ${darkMode ? "text-white": "text-red-500 hover:text-red-600"}`}>x</button>
          </div>
          <div className="w-full relative">
            <form className="space-y-4">
              <div>
                <label className="mb-2 font-medium" htmlFor="title">
                  Title
                </label>
                <input
                  placeholder="Enter title"
                  id="title"
                  name="title"
                  className={`w-full rounded-lg p-2 border
                  ${darkMode ? "border-gray-600" : "border-gray-300"}
                  focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                  type="text"
                  value={editTask?.title || ""}
                  onChange={(e) =>
                    setEditTask((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div>
                <label className="mb-2 font-medium" htmlFor="description">
                  Description
                </label>
                <input
                  placeholder="Enter description"
                  id="description"
                  name="description"
                    className={`w-full rounded-lg p-2 border
                    ${darkMode ? "border-gray-600" : "border-gray-300"}
                    focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                  type="text"
                  value={editTask?.description || ""}
                  onChange={(e) =>
                    setEditTask((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 font-medium">
                  Column
                </label>
                <select
                  value={editTask?.column || ""}
                  onChange={(e) =>
                    setEditTask((prev) =>
                      prev ? { ...prev, column: e.target.value } : prev
                    )
                  }
                  className={`w-full p-2 rounded-lg border
    ${darkMode
      ? "bg-black text-white border-gray-600"
      : "bg-gray-100 text-black border-gray-300"
    }`}
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="readyForTesting">Ready For Testing</option>
                  <option value="tested">Tested</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="text-center">
                <button onClick={handleUpdate} className="px-4 py-3 my-2 text-white bg-purple-500 hover:bg-purple-600 rounded-lg">
                  Update
                </button>
              </div>
            </form>
          </div>
          {/* <div onClick={onClose}>
            <button className="text-red-500">x</button>
          </div> */}
        </div>
      </div>
    </>
  );
}
