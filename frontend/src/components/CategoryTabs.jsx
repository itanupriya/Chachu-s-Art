const CATEGORIES = ["All", "Bike", "Car", "Glass", "Wall", "Helmet", "Other"];

function CategoryTabs({ active, onChange }) {
  return (
    <div className="category-tabs">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={cat === active ? "tab active" : "tab"}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
