import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { deleteTask, getTasks } from "../../../services/taskService";
import { useState } from "react";
import CreateTaskDialog from "./CreateTaskDialog";
import { OrderBy, OrderKey, Task } from "../../../types/task";
import UpdateTaskDialog from "./UpdateTaskDialog";
import { UpdateTaskSchema } from "../taskSchema";
import { useToast } from "../../../hooks/use-toast";
import { FilterDropdown } from "./FilterDropdown";

export default function TaskTable() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [orderBy, setOrderBy] = useState<OrderBy>({});
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", orderBy, selectedStatuses, selectedPriorities],
    queryFn: () =>
      getTasks({
        orderBy,
        status: selectedStatuses,
        priority: selectedPriorities,
      }),
  });

  const handleOrderClicked = (field: OrderKey) => {
    const direction = orderBy[field] === "desc" ? "asc" : "desc";
    setOrderBy({ ...orderBy, [field]: direction });
  };

  const { isLoading: isDeleting, mutate } = useMutation(deleteTask, {
    onError: () => {
      toast({
        title: "Task Deletion Failed",
      });
    },
    onSuccess: () => {
      toast({
        title: "Task Deleted Successfully",
      });
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleEdit = (task: Task) => {
    setOpenTask(task);
  };

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <div className="flex justify-between items-center my-4">
        <div className="flex flex-row gap-4">
          <FilterDropdown
            label="Status"
            options={["PENDING", "IN_PROGRESS", "COMPLETED"]}
            selected={selectedStatuses}
            setSelected={setSelectedStatuses}
          />
          <FilterDropdown
            label="Priority"
            options={["HIGH", "MEDIUM", "LOW"]}
            selected={selectedPriorities}
            setSelected={setSelectedPriorities}
          />
        </div>
        <Button
          onClick={() => {
            setOpenCreateDialog(true);
          }}
          disabled={isDeleting}
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
            <TableHead>
              <button
                onClick={() => handleOrderClicked("priority")}
                className="flex items-center"
                aria-label={`Sort by priority ${
                  orderBy.priority === "desc" ? "descending" : "ascending"
                }`}
              >
                Priority
                {orderBy.priority === "desc" ? (
                  <ChevronDown className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronUp className="ml-2 h-4 w-4" />
                )}
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleOrderClicked("status")}
                className="flex items-center"
                aria-label={`Sort by status ${
                  orderBy.status === "desc" ? "descending" : "ascending"
                }`}
              >
                Status
                {orderBy.status === "desc" ? (
                  <ChevronDown className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronUp className="ml-2 h-4 w-4" />
                )}
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleOrderClicked("dueDate")}
                className="flex items-center"
                aria-label={`Sort by due date ${
                  orderBy.dueDate === "desc" ? "descending" : "ascending"
                }`}
              >
                Due Date
                {orderBy.dueDate === "desc" ? (
                  <ChevronDown className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronUp className="ml-2 h-4 w-4" />
                )}
              </button>
            </TableHead>
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
