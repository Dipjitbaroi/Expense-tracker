import ExpenseSvg from "../../svgComponent/ExpenseSvg";
import WalletSvg from "../../svgComponent/WalletSvg";
import BalanceComponent from "./BalanceComponent";
import ListContainer from "./LIstContainer";
export default function BalanceSummaryBoard({
  allIncome,
  allExpense,
  totalBalance,
  totalIncome,
  totalExpense,
  onDeleteClick,
  handleEditBtnClick,
}) {
  return (
    <div className="lg:col-span-2">
      <BalanceComponent
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <ListContainer
          allList={allIncome}
          Icon={WalletSvg}
          onDeleteClick={onDeleteClick}
          title={"Income"}
          type={"income"}
          handleEditBtnClick={handleEditBtnClick}
        />
        <ListContainer
          allList={allExpense}
          Icon={ExpenseSvg}
          onDeleteClick={onDeleteClick}
          title={"Expense"}
          type={"expense"}
          handleEditBtnClick={handleEditBtnClick}
        />
      </div>
    </div>
  );
}
