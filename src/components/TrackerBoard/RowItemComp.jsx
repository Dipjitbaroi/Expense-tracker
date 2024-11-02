import DeleteSvg from "../../svgComponent/DeleteSvg";
import PencilSvg from "../../svgComponent/PencilSvg";
export default function RowItemComp({
  id,
  category,
  type,
  amount,
  date,
  onDeleteClick,
  handleEditBtnClick,
}) {
  return (
    <div className="flex justify-between items-center py-2 relative group cursor-pointer">
      <div>
        <h3 className="text-base font-medium leading-7 text-gray-600">
          {category}
        </h3>
        <p className="text-xs text-gray-600">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
          BDT {amount}
        </p>

        <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
          <button
            className="hover:text-teal-600"
            role="button"
            title="Edit Button"
            onClick={() =>
              handleEditBtnClick({ id, type, category, amount, date })
            }
          >
            <PencilSvg />
          </button>

          <button
            onClick={() => onDeleteClick({ type, id, amount })}
            className="hover:text-red-600"
            role="button"
            title="Delete"
          >
            <DeleteSvg />
          </button>
        </div>
      </div>
    </div>
  );
}
