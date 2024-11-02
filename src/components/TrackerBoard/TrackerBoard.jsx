import { useState } from "react";
import BalanceSummaryBoard from "./BalanceSummaryBoard";
import ExpenseForm from "./ExpenseForm";

const initialValue = {
  id: crypto.randomUUID(),
  type: "expense",
  category: "",
  amount: 0,
  date: new Date().toLocaleDateString("en-CA"),
};

export default function TrackerBoard() {
  const [allExpense, setAllExpense] = useState([]);
  const [allIncome, setAllIncome] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [formValue, setFormValue] = useState(initialValue);
  const [editableItem, setEditableItem] = useState(null);

  const handleDeleteItem = (deletedItem) => {
    if (deletedItem.type === "income") {
      setAllIncome(allIncome.filter((income) => income.id !== deletedItem.id));
      setTotalBalance(totalBalance - deletedItem.amount);
      setTotalIncome(totalIncome - deletedItem.amount);
    }
    if (deletedItem.type === "expense") {
      setAllExpense(
        allExpense.filter((expense) => expense.id !== deletedItem.id)
      );
      setTotalBalance(totalBalance + deletedItem.amount);
      setTotalExpense(totalExpense - deletedItem.amount);
    }
  };

  const handleEditBtnClick = (item) => {
    setEditableItem(item);
    setFormValue(item);
  };

  const handleCancelClick = () => {
    setEditableItem(null);
    setFormValue(initialValue);
  };

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ExpenseForm
          allIncome={allIncome}
          setAllIncome={setAllIncome}
          allExpense={allExpense}
          setAllExpense={setAllExpense}
          totalBalance={totalBalance}
          setTotalBalance={setTotalBalance}
          totalExpense={totalExpense}
          setTotalExpense={setTotalExpense}
          totalIncome={totalIncome}
          setTotalIncome={setTotalIncome}
          initialValue={initialValue}
          formValue={formValue}
          setFormValue={setFormValue}
          editableItem={editableItem}
          handleCancelClick={handleCancelClick}
        />
        <BalanceSummaryBoard
          allIncome={allIncome}
          allExpense={allExpense}
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          onDeleteClick={handleDeleteItem}
          handleEditBtnClick={handleEditBtnClick}
        />
      </section>
    </main>
  );
}
