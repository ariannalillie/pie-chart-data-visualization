import { useContext, useState } from "react";
import { ExpenseContext } from "./chart";
import { FC } from "react";

export interface ExpenseProp {
  id: number;
}

export const Expense: FC<ExpenseProp> = ({ id }) => {
  const { expenses, setExpenses } = useContext(ExpenseContext)!;
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [color, setColor] = useState(expenses[id].color);

  const handleUpdate = () => {
    setExpenses((prev: Expenses) => {
      return {
        ...prev,
        [id]: {
          name,
          value,
          color,
        },
      };
    });
  };

  return (
    <div>
      <div
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          backgroundColor: color,
        }}
      ></div>
      <label>Expense Type:</label>
      <input onChange={(e) => setName(e.target.value)} value={name}></input>
      <label>Value:</label>
      <input onChange={(e) => setValue(+e.target.value)} value={value}></input>
      <label>Color:</label>
      <input onChange={(e) => setColor(e.target.value)} value={color}></input>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
