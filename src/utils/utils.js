export const handleClickOutSide = (
  menuButtonId,
  dropdownSelector,
  setState
) => {
  const menuButton = document.getElementById(menuButtonId);
  const dropdown = document.querySelector(dropdownSelector);

  document.addEventListener("click", (event) => {
    if (
      menuButton &&
      dropdown &&
      !menuButton.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      setState(false);
    }
  });
};

export const handleSortData = (a, b, sort) => {
  return sort === "lth" ? a.amount - b.amount : b.amount - a.amount;
};
