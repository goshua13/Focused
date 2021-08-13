export type TaskType = {
    id: number
    label: string,
    completed: boolean,
    date_due: Date
    edit?: boolean
}

  
  export type HandleTaskLabel = (event: React.InputHTMLAttributes, id: number) => void;  
  export type AddTaskType = (taskLabel: string) => void;