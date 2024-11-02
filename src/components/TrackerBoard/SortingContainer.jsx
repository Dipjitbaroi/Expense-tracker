import { useState } from "react";
import SortingSvg from "../../svgComponent/SortingSvg";
import { handleClickOutSide } from "../../utils/utils";
export default function SortingContainer({
  btnIdentifier,
  menuIdentifier,
  onSortClick,
}) {
  const [openSortingComp, setOpenSortingComp] = useState(false);

  handleClickOutSide(
    btnIdentifier,
    `[role='${menuIdentifier}']`,
    setOpenSortingComp
  );

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          id={btnIdentifier}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => {
            setOpenSortingComp(!openSortingComp);
          }}
        >
          <SortingSvg />
        </button>
      </div>
      <div
        className={`absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  ${
          openSortingComp ? "block" : "hidden"
        } `}
        role={menuIdentifier}
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <ul className="py-1" role="none">
          <li
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onClick={() => onSortClick("lth")}
          >
            Low to High
          </li>
          <li
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onClick={() => onSortClick("htl")}
          >
            High to Low
          </li>
        </ul>
      </div>
    </div>
  );
}
