const categories = ["MENS", "WOMENS", "KIDS"];

const CategoryTabs = ({ active, setActive }) => {
return (
    <div className="flex gap-4 justify-center mb-6">
        {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full border ${active === cat? "bg-black text-white": "bg-white text-black"}`}
            >
            {cat}
            </button>
        ))}
    </div>
);
};


export default CategoryTabs;