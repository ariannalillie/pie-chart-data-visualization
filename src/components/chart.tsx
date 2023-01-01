import { FC, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export const Chart: FC = () => {
  const [data, setData] = useState([
    { name: "shopping", value: 0 },
    { name: "dining", value: 0 },
    { name: "housing", value: 0 },
    { name: "subscriptions", value: 0 },
  ]);

  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = +e.target.value

  // Find the correct object to update in the `data` array
  const updatedData = data.map((item) => {
    if (item.name === name) {
      return {
        ...item,  // spread the existing properties of the object
        value: value  // update the value property
      };
    }
    return item;  // return the original object if the name does not match
  });

  // Use the `setData` function to update the state with the new array
  setData(updatedData);
    
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div>
      <label>Shopping</label>
      <input name="shopping" onChange={(e) => updateData(e)}></input>
      <label>Dining</label>
      <input name="dining" onChange={(e) => updateData(e)}></input>
      <label>Rent/Morgage</label>
      <input name="housing" onChange={(e) => updateData(e)}></input>
      <label>Subscriptions</label>
      <input name="subscriptions" onChange={(e) => updateData(e)}></input>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
