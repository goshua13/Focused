export type TaskType = {
  id: number
  label: string,
  date_created: Date
  edit?: boolean
}
export type handleReorderType = { oldIndex: number, newIndex: number }


export type AddTaskType = (taskLabel: string) => void;