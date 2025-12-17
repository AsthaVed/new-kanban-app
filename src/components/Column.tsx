import { Droppable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { addTask, Task } from "@/redux/slice/boardSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface ColumnProps {
  columnId: string,
  filterTask: Task[]
}

export default function Column({ columnId, filterTask }: ColumnProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const column = useSelector(
    (state: RootState) => state.board.columns[columnId]
  );

  // const tasks = useSelector((state: RootState) =>
  //   state.board.tasks.filter((task) => column.taskIds.includes(task.id))
  // );

  const columnTasks = filterTask.filter((task) => column.taskIds.includes(task.id));

  return (
    <>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full sm:w-68 bg-gray-100 p-3 rounded min-h-[200px]"
          >
            <div className="flex justify-between mb-2">
              <p className="font-bold">{column.title}</p>
              <button onClick={() => setModalOpen(true)}>
                <Plus />
              </button>
            </div>

            <TaskCard tasks={columnTasks} />

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {modalOpen && (
        <AddTaskModal columnId={columnId}
          onClose={() => setModalOpen(false)}
          onAdd={(task) => dispatch(addTask(task))}
        />
      )}
    </>
  );
}
