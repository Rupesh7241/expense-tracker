// import React, { useState } from 'react'
// import Input from "../Inputs/Input";
// import EmojiPickerPopup from '../EmojiPickerPopup';

// const AddExpenseForm = ({onAddExpense}) => {
//     const [income, setIncome] = useState({
//         category: "",
//         amount: "",
//         date: "",
//         icon: "",
//     });

//     const handleChange = (key, value) => setIncome({ ...income, [key]: value });
//   return <div>
//     <EmojiPickerPopup
//     icon={income.icon}
//     onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
//     />

//     <Input
//     value={income.category}
//     onChange={({ target }) => handleChange("category", target.value)}
//     label="Category"
//     placeholder="Rent, Groceries, etc"
//     type="text"
//     />

//     <Input
//     value={income.amount}
//     onChange={({ target }) => handleChange("amount", target.value)}
//     label="Amount"
//     placeholder=""
//     type="number"
//     />

//     <Input
//     value={income.date}
//     onChange={({ target }) => handleChange("date", target.value)}
//     label="Date"
//     placeholder=""
//     type="date"
//     />

//     <div className="flex justify-end mt-6">
//         <button
//         type="button"
//         className="add-btn add-btn-fill"
//         onClick={()=>onAddExpense(income)}
//         >
//             Add Expense
//         </button>
//     </div>
       
//   </div>
// };

// export default AddExpenseForm;

import React, { useState } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => {
        setExpense(prev => ({
            ...prev,
            [key]: key === "amount" ? Number(value) : value,
        }));
    };

    const handleSubmit = () => {
        const { category, amount, date } = expense;
        if (!category || !amount || !date) {
            alert("Please fill all required fields.");
            return;
        }
        onAddExpense(expense);
        // Optionally reset form
        setExpense({
            category: "",
            amount: "",
            date: "",
            icon: "",
        });
    };

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Rent, Groceries, etc"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="0.00"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={handleSubmit}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
