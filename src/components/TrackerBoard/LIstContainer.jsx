import { useState } from "react";
import { handleSortData } from "../../utils/utils";
import FilteringContainer from "./FilteringContainer";
import RowItemComp from "./RowItemComp";
import SortingContainer from "./SortingContainer";
export default function ListContainer({
  allList,
  onDeleteClick,
  title,
  type,
  Icon,
  handleEditBtnClick,
}) {
  const [sort, setSort] = useState("lth");
  const [filteredCategory, setFilteredCategory] = useState([]);

  const handleSortChange = (value) => {
    setSort(value);
  };
  return (
    <div className="border rounded-md relative">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div
            className={`h-10 w-10  text-white rounded-md text-center object-center place-content-center text-base ${
              type === "income" ? "bg-teal-600" : "bg-pink-600"
            }`}
          >
            <Icon />
          </div>

          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              {title}
            </h3>
          </div>
        </div>
        <div>
          <SortingContainer
            btnIdentifier={`sorting-button-${type}`}
            menuIdentifier={`sorting-menu-${type}`}
            onSortClick={handleSortChange}
          />

          <FilteringContainer
            btnIdentifier={`filtering-button-${type}`}
            menuIdentifier={`filtering-menu-${type}`}
            type={type}
            filteredCategory={filteredCategory}
            setFilteredCategory={setFilteredCategory}
          />
        </div>
      </div>

      <div className="p-4 divide-y">
        {allList
          .filter((listItem) => {
            if (filteredCategory.length) {
              return filteredCategory.includes(listItem.category);
            }
            return true;
          })
          .sort((a, b) => handleSortData(a, b, sort))
          .map((listItem) => (
            <RowItemComp
              key={listItem.id}
              {...listItem}
              onDeleteClick={onDeleteClick}
              handleEditBtnClick={handleEditBtnClick}
            />
          ))}
      </div>
    </div>
  );
}
