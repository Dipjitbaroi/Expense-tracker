import { useState } from "react";
import FilterSvg from "../../svgComponent/FilterSvg";
import { categoryItems } from "../../utils/constant";
import { handleClickOutSide } from "../../utils/utils";
export default function FilteringContainer({
  btnIdentifier,
  menuIdentifier,
  type,
  filteredCategory,
  setFilteredCategory,
}) {
  const [openFilterComp, setOpenFilterComp] = useState(false);

  handleClickOutSide(
    btnIdentifier,
    `[role="${menuIdentifier}"]`,
    setOpenFilterComp
  );
  const handleFilterClick = (selectedCategory) => {
    const exist = filteredCategory.find(
      (category) => category === selectedCategory
    );

    if (exist) {
      setFilteredCategory(
        filteredCategory.filter((category) => category !== selectedCategory)
      );
    } else {
      setFilteredCategory([...filteredCategory, selectedCategory]);
    }
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          id={btnIdentifier}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setOpenFilterComp(!openFilterComp)}
        >
          <FilterSvg />
        </button>
      </div>
      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          openFilterComp ? "block" : "hidden"
        }`}
        role={menuIdentifier}
        aria-orientation="vertical"
        aria-labelledby="filter-button"
        tabIndex="-1"
        id="filter-dropdown"
      >
        <div className="py-1" role="none">
          {categoryItems
            .filter((item) => item.type === type)
            .map((item) => (
              <label
                key={item.id}
                className="inline-flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                  id="filter-option-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterClick(item.name);
                  }}
                  checked={filteredCategory.includes(item.name)}
                />
                <span className="ml-2">{item.name}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
}
