import { navbarItems } from "../utils/constant";
const Navbar = () => {
  return (
    <nav className="flex max-w-7xl items-center bg-[#F9FAFB] w-full justify-between py-1 mt-2 border px-4 rounded-md mx-auto">
      <div className="p-[1em] rounded-full bg-gray-200">
        <p>E T</p>
      </div>

      <div className="hidden md:block">
        <ul className="flex gap-4 text-gray-500 font-medium">
          {navbarItems.map((item) => (
            <a href={item.link} key={item.id}>
              {item.name}
            </a>
          ))}
        </ul>
      </div>

      <button className="px-6 py-2 bg-teal-600 text-white w-fit rounded-md">
        Get App
      </button>
    </nav>
  );
};

export default Navbar;
