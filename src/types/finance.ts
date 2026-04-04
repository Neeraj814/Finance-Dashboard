export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Food"
  | "Transport"
  | "Entertainment"
  | "Shopping"
  | "Bills"
  | "Health"
  | "Education"
  | "Investment"
  | "Other";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export type Role = "admin" | "viewer";

export const CATEGORIES: Category[] = [
  "Salary", "Freelance", "Food", "Transport", "Entertainment",
  "Shopping", "Bills", "Health", "Education", "Investment", "Other",
];

export const CATEGORY_COLORS: Record<string, string> = {
  Salary: "hsl(222, 47%, 11%)",
  Freelance: "hsl(262, 52%, 47%)",
  Food: "hsl(38, 92%, 50%)",
  Transport: "hsl(200, 70%, 50%)",
  Entertainment: "hsl(330, 70%, 50%)",
  Shopping: "hsl(160, 84%, 39%)",
  Bills: "hsl(0, 72%, 51%)",
  Health: "hsl(280, 60%, 50%)",
  Education: "hsl(190, 70%, 45%)",
  Investment: "hsl(120, 50%, 40%)",
  Other: "hsl(220, 9%, 46%)",
};
