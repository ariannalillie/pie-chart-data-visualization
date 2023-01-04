import { FC, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { createContext } from "react";
import { Expense } from "./expense/expense";

export const ExpenseContext = createContext<ExpenseContext>(undefined);

export const Chart: FC = () => {
  const [expenses, setExpenses] = useState<Expenses>({});

  let randomColor = `hsl(${Math.floor(Math.random() * 360)} 70% 70%)`;

  const handleExpense = () => {
    setExpenses((prev) => {
      return {
        ...prev,
        [Object.values(prev).length]: {
          name: "",
          value: 0,
          color: randomColor,
        },
      };
    });
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: CustomizedLabel) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <ExpenseContext.Provider value={{ expenses, setExpenses }}>
        {Object.values(expenses).map((entry, index) => {
          return <Expense id={index} key={index} />;
        })}
        <button onClick={handleExpense}>+ Add Expense</button>
        <PieChart width={400} height={400}>
          <Pie
            data={Object.values(expenses)}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {Object.values(expenses).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ExpenseContext.Provider>
    </div>
  );
};
