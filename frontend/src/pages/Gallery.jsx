import { useEffect, useState } from "react";
import api from "../api.js";
import CategoryTabs from "../components/CategoryTabs.jsx";
import DesignCard from "../components/DesignCard.jsx";

function Gallery() {
  const [designs, setDesigns] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDesigns();
  }, [category]);

  async function loadDesigns() {
    setLoading(true);
    try {
      const res = await api.get("/designs", { params: { category } });
      setDesigns(res.data);
    } catch (err) {
      console.error("Failed to load designs:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <span className="eyebrow"><h3>Welcome to Chachu's Shop</h3></span>
      <h1>Radium Art Designs </h1>
      <p className="subtitle">
        Browse the collection below and tap "Enquire on WhatsApp" for pricing
        and sizing.
      </p>

      <CategoryTabs active={category} onChange={setCategory} />

      {loading ? (
        <p>Loading designs...</p>
      ) : designs.length === 0 ? (
        <p>No designs in this category yet.</p>
      ) : (
        <div className="design-grid">
          {designs.map((design) => (
            <DesignCard key={design._id} design={design} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
