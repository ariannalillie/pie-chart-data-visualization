declare type ExpenseContext =
  | {
      expenses: Expenses;
      setExpenses: React.Dispatch<React.SetStateAction<Expenses>>;
    }
  | undefined;

declare type Expenses = {
  [key: number]: {
    name: string;
    value: number;
    color: string;
  };
};
