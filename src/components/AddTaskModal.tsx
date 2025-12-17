'use client'
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react"

    interface TaskModalProps{
        onClose: () => void,
        onAdd: (updatedTask: {
        id: string
        title: string;
        description: string;
        column: string,
        createdAt: number
        }) => void,
        columnId: string | null
    }

export default function AddTaskModal({onClose, onAdd, columnId}: TaskModalProps){

    const [addTask, setAddTask] = useState({title: '', description: '', column: columnId ? columnId: 'todo'});
    const [error, setError] = useState<string>('');
    const {darkMode} = useTheme();

const handleSave = () => {
    if(!addTask.title || !addTask.description){
        setError("Enter all the fields");
        return;
    }else{
        setError('');
    }
    const id = crypto.randomUUID();
    const task = {
    id: id,
    title: addTask.title,
    description: addTask.description,
    column: addTask.column,
    createdAt: Date.now(),
  };
    onAdd(task);
    setAddTask({title: '', description: '', column: 'todo'})
    onClose();
}
    
    
    return(
        <>
        {/* fixed inset-0 means top, bottom, left, right is 0 - isse modal k andar interactions kaam krte h or bg freeze ho jata h if hum chahte h background bhi kaam kre toh pointer-events-none krna hoga*/}
        <div className={`fixed inset-0 z-50 flex items-center justify-center px-2 bg-black/50`}>
        <div className={`w-full max-w-md p-6 sm:p-4 xs:p-3 rounded-lg shadow-lg ${darkMode ? "bg-black text-white placeholder-gray-500" : "bg-gray-100 text-black placehoder-black"}`}>
            <div className="mb-3 flex items-center justify-between">
                <h1 className="text-xl font-bold">Add Task</h1>
                <div onClick={onClose}>
                    <button className={`text-2xl ${darkMode ? "text-white": "text-red-500 hover:text-red-600"}`}>x</button>
                </div>
            </div>
            {error && (<p className="text-red-500 mb-4">{error}</p>)}
            <div className="space-y-4">
                <div>
                    <label className="mb-2" htmlFor="title">Title</label>
                    <input type="text" name="title"   className={`w-full rounded-lg p-2 border
${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:outline-none`} id="title" value={addTask.title} placeholder="Enter title" onChange={(e) => setAddTask({...addTask, title: e.target.value})} />
                </div>
                <div>
                    <label className="mb-2" htmlFor="description">Description</label>
                    <input type="text" name="description"   className={`w-full rounded-lg p-2 border
${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:outline-none`} id="description" value={addTask.description} placeholder="Enter Description" onChange={(e) => setAddTask({...addTask, description: e.target.value})} />
                </div>
                 <div className="mb-5">
              <label className="block text-sm font-medium mb-1">
                Column
              </label>
              <select
                value={addTask.column}
                onChange={(e) => setAddTask({...addTask, column: e.target.value})}
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
                    <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white rounded-lg mt-3 mb-3" onClick={handleSave}>Add</button>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}