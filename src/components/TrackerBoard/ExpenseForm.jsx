import { categoryItems } from "../../utils/constant";
export default function ExpenseForm({
  allIncome,
  setAllIncome,
  allExpense,
  setAllExpense,
  totalBalance,
  setTotalBalance,
  totalExpense,
  setTotalExpense,
  totalIncome,
  setTotalIncome,
  formValue,
  setFormValue,
  initialValue,
  editableItem,
  handleCancelClick,
}) {
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (type) => {
    // when user change the type of the record that time we have to reset the form otherwise category can be mismatch. For that i destructure initialValue instead of formValue
    setFormValue({ ...initialValue, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //form validation
    if (!formValue.category.length) {
      alert("Please select a category");
      return;
    }
    if (!formValue.amount || Number(formValue.amount) < 1) {
      alert("Please give amount");
      return;
    }

    // update or add new income
    if (formValue.type === "income") {
      if (editableItem !== null) {
        updateItemFunc(
          totalIncome,
          allIncome,
          setAllIncome,
          setTotalIncome,
          "income"
        );
      } else {
        setAllIncome([
          ...allIncome,
          {
            ...formValue,
            amount: Number(formValue.amount),
            id: crypto.randomUUID(),
          },
        ]);
        setTotalBalance(totalBalance + Number(formValue.amount));
        setTotalIncome(totalIncome + Number(formValue.amount));
      }
    }

    //update or add new expense
    if (formValue.type === "expense") {
      if (editableItem !== null) {
        updateItemFunc(
          totalExpense,
          allExpense,
          setAllExpense,
          setTotalExpense,
          "expense"
        );
      } else {
        setAllExpense([
          ...allExpense,
          {
            ...formValue,
            amount: Number(formValue.amount),
            id: crypto.randomUUID(),
          },
        ]);
        setTotalBalance(totalBalance - Number(formValue.amount));
        setTotalExpense(totalExpense + Number(formValue.amount));
      }
    }

    setFormValue(initialValue);
  };

  const updateItemFunc = (
    totalSpecificBalance, // total expense or income
    allItems, // all expense or income
    setSpecificItemsState, //setAllIncome or setAllExpense
    setSpecificBalanceState, // setTotalIncome or setTotalExpense
    type // expense or income
  ) => {
    // adding or removing selected item amount form total amount so that we can update total amount with updated value.
    const totalBalanceWithoutEditedItem =
      type === "income"
        ? totalBalance - editableItem.amount
        : totalBalance + editableItem.amount;

    //removing selected amount form total expense or total income so that we can update it with new expense or income value
    const totalSpecificBalanceWithoutEditedItem =
      totalSpecificBalance - editableItem.amount;

    const updatedItems = [...allItems];

    const index = updatedItems.findIndex((item) => item.id === formValue.id);

    // updating items
    updatedItems.splice(index, 1, {
      ...formValue,
      amount: Number(formValue.amount),
    });

    setSpecificItemsState(updatedItems);

    // update total balance
    setTotalBalance(
      type === "income"
        ? totalBalanceWithoutEditedItem + Number(formValue.amount)
        : totalBalanceWithoutEditedItem - Number(formValue.amount)
    );

    //update total expense or income
    setSpecificBalanceState(
      totalSpecificBalanceWithoutEditedItem + Number(formValue.amount)
    );

    // reset the form
    handleCancelClick();
  };

  return (
    <section className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <button
            type="button"
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              formValue.type === "expense" && "active"
            }`}
            onClick={() => handleTypeChange("expense")}
          >
            Expense
          </button>
          <button
            type="button"
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              formValue.type === "income" && "active"
            }`}
            onClick={() => handleTypeChange("income")}
          >
            Income
          </button>
        </div>

        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              autoComplete="category-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={formValue.category}
              onChange={handleChange}
            >
              <option value={""}>Select a category</option>
              {categoryItems
                .filter((item) => item.type === formValue.type)
                .map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={formValue.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={formValue.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-5">
          {editableItem !== null && (
            <button
              onClick={handleCancelClick}
              type="button"
              className="mt-6 rounded-md bg-red-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 w-full"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
          >
            {editableItem !== null ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
