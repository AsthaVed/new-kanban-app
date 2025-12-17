import { Task, deleteTask } from "@/redux/slice/boardSlice";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  tasks: Task[];
}

export default function TaskCard({ tasks }: TaskCardProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <>
      {tasks.map((task, index) => (
        <Draggable
          key={task.id}
          draggableId={task.id}
          index={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="bg-white p-4 mt-2 rounded-lg border border-gray-300 flex justify-between"
            >
              <div className="flex flex-col min-w-0">
                <h1 className="mb-2 text-md font-bold">
                  {task.title}
                </h1>
                <p className="text-sm truncate">{task.description}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Pencil
                  size={16}
                  className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  onClick={() => setEditingTaskId(task.id)}
                />
                <Trash2
                  size={16}
                  className="text-red-600 hover:text-red-700 cursor-pointer"
                  onClick={() => handleDelete(task.id)}
                />
              </div>
            </div>
          )}
        </Draggable>
      ))}

      {editingTaskId && (
        <EditTaskModal
          editingTaskId={editingTaskId}
          onClose={() => setEditingTaskId(null)}
        />
      )}
    </>
  );
}
