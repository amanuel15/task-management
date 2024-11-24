import { useQuery } from "react-query";
import { Loader2, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTasks } from "@/services/taskService";
import { useState } from "react";
import CreateTaskDialog from "./CreateTaskDialog";
import { Task } from "@/types/task";
import UpdateTaskDialog from "./UpdateTaskDialog";
import { UpdateTaskSchema } from "../taskSchema";

export default function TaskTable() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  // const [tableData, setTableData] = useState<Task[]>(data?.data || []);

  const handleEdit = (task: Task) => {
    setOpenTask(task);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete task ${id}`);
    // setTableData((prevData) =>
    //   prevData.filter((item) => item.invoice !== invoice)
    // );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button
          onClick={() => {
            setOpenCreateDialog(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Loader2 />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={6}>
                <h3 className="text-red-500 text-3xl text-center my-6">
                  Something went wrong
                </h3>
              </TableCell>
            </TableRow>
          ) : (
            (data?.data || []).map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.description ?? ""}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {task.dueDate ? formatDistanceToNow(task.dueDate) : null}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(task)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(task.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {data?.data.length ?? 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <CreateTaskDialog open={openCreateDialog} setOpen={setOpenCreateDialog} />
      {!!openTask && (
        <UpdateTaskDialog
          open={!!openTask}
          setOpen={() => setOpenTask(null)}
          task={openTask as Task & UpdateTaskSchema}
        />
      )}
    </div>
  );
}
