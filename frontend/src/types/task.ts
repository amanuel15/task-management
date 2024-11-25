export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type OrderDirection = "asc" | "desc";
export type OrderBy = {
  dueDate?: OrderDirection;
  priority?: OrderDirection;
  status?: OrderDirection;
};

export type OrderKey = keyof OrderBy;
