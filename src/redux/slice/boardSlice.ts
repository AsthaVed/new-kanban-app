import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task{
    id: string,
    title: string,
    description: string,
    column: string,
    createdAt: number,
    updatedAt?: number
}

interface Column{
    id: string,
    title: string,
    taskIds: string[]
}

interface BoardState{
    tasks: Task[],
    columns: Record<string, Column>,
    columnOrder: string[]
}
// Record TypeScript ka utility type hai.
// Record<K, T>
// ➡️ Ek object
// jisme keys ka type K hota hai
// aur har key ki value ka type T hota hai

const initialState: BoardState = {
  tasks: [],
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: [] },
    inProgress: { id: "inProgress", title: "In Progress", taskIds: [] },
    readyForTesting: { id: "readyForTesting", title: "Ready for Testing", taskIds: [] },
    tested: { id: "tested", title: "Tested", taskIds: [] },
    completed: { id: "completed", title: "Completed", taskIds: [] },
  },
  columnOrder: ["todo", "inProgress", "readyForTesting", "tested", "completed"],
};

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>){
            const task = action.payload;
            // task array me full object push
            state.tasks.push(task)
            // column ke taskIds me sirf id
            state.columns[task.column].taskIds.push(task.id)
            
        },
        updateTask(state, action: PayloadAction<Task>){
            const task = state.tasks.find(t => t.id == action.payload.id);
            if(task){
                task.title = action.payload.title,
                task.description = action.payload.description,
                task.column = action.payload.column,
                task.updatedAt = Date.now()
            }
        },
        deleteTask(state, action: PayloadAction<string>){
            const taskId = action.payload;

              // remove from tasks array
            state.tasks = state.tasks.filter(t => t.id != taskId)
            
              // remove from column.taskIds
            Object.values(state.columns).forEach(col => {
                col.taskIds = col.taskIds.filter(id => id !== taskId);
            });
        },
        moveTask: (state, action) => {
  const {
    taskId,
    sourceColumnId,
    destinationColumnId,
    destinationIndex,
  } = action.payload;

  const sourceColumn = state.columns[sourceColumnId];
  const destinationColumn = state.columns[destinationColumnId];

  // remove from source
  sourceColumn.taskIds = sourceColumn.taskIds.filter(
    (id) => id !== taskId
  );

  // add to destination
  destinationColumn.taskIds.splice(destinationIndex, 0, taskId);
},

    }
})

export const {addTask, updateTask, deleteTask, moveTask} = boardSlice.actions
export default boardSlice.reducer;