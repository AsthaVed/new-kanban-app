"use client"

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import { moveTask } from "@/redux/slice/boardSlice";
import { Task } from "@/redux/slice/boardSlice";

interface BoardProps {
  search: string,
  sort: string
}
export default function Board({search, sort}: BoardProps){
    
    const dispatch = useDispatch<AppDispatch>()
    const columnOrder = useSelector((state: RootState) => state.board.columnOrder);

    const task = useSelector((state: RootState) => state.board.tasks);

    // SEARCH
    let filterTask : Task[] = task.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    console.log("filterTask", filterTask);

    // SORT
    filterTask = filterTask.sort((a, b) => {
      if(sort === 'Newest') {
        return b.createdAt - a.createdAt; // newest first
      } else {
        return a.createdAt - b.createdAt; // oldest first
      }
    });


      const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // ❌ drop outside
    if (!destination) return;

    // ❌ same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    dispatch(
      moveTask({
        taskId: draggableId,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        destinationIndex: destination.index,
      })
    );
  };

   return(
    <>
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="flex gap-4 items-start flex-wrap p-4">
        {columnOrder.map((column: string) => {
        return(
            <Column key={column} columnId={column} filterTask={filterTask} />
        )
    })
        }
    </div>
    </DragDropContext>
   
    </>
   )
}


// Board (DragDropContext)
//  └── Column (Droppable)
//       └── TaskCard (Draggable)
// Board → pure app ka drag control

// Column → drop hone ki jagah

// TaskCard → jo drag hota hai