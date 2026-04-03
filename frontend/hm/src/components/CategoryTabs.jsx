const categories = ["WOMENS", "MENS", "KIDS"];

const CategoryTabs = ({ active, setActive }) => {
  return (
    <div className="flex justify-center gap-10 mb-10 border-b pb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`text-sm tracking-widest ${
            active === cat
              ? "border-b-2 border-black pb-2 font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};