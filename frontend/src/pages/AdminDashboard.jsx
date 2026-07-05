import { useEffect, useState } from "react";
import api, { API_URL } from "../api.js";
import { getCategoryColor } from "../utils/categoryColors.js";

const CATEGORIES = ["Bike", "Car", "Glass", "Wall", "Helmet", "Other"];

function AdminDashboard() {
  const [designs, setDesigns] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("designs"); // "designs" or "inquiries"

  useEffect(() => {
    loadDesigns();
    loadInquiries();
  }, []);

  async function loadDesigns() {
    try {
      const res = await api.get("/designs");
      setDesigns(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadInquiries() {
    try {
      const res = await api.get("/inquiries");
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    setMessage("");

    if (!imageFile) {
      setMessage("Please choose an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", imageFile);

    setUploading(true);
    try {
      await api.post("/designs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Design uploaded!");
      setTitle("");
      setImageFile(null);
      e.target.reset();
      loadDesigns();
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this design?")) return;
    try {
      await api.delete(`/designs/${id}`);
      loadDesigns();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div className="tabs">
        <button
          className={tab === "designs" ? "tab active" : "tab"}
          onClick={() => setTab("designs")}
        >
          Designs
        </button>
        <button
          className={tab === "inquiries" ? "tab active" : "tab"}
          onClick={() => setTab("inquiries")}
        >
          Inquiries ({inquiries.length})
        </button>
      </div>

      {tab === "designs" && (
        <>
          <form onSubmit={handleUpload} className="form upload-form">
            <label>Design title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dragon Flame Pattern"
              required
            />

            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label>Design image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />

            {message && <p>{message}</p>}

            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Design"}
            </button>
          </form>

          <h3>All Designs ({designs.length})</h3>
          <div className="design-grid">
            {designs.map((design) => (
              <div className="design-card" key={design._id} style={{ "--glow": getCategoryColor(design.category) }}>
                <img src={`${API_URL}${design.imageUrl}`} alt={design.title} />
                <div className="design-card-info">
                  <span className="design-code">#{design.code}</span>
                  <h3>{design.title}</h3>
                  <p className="design-category">{design.category}</p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(design._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "inquiries" && (
        <div className="inquiry-list">
          {inquiries.length === 0 ? (
            <p>No inquiries yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Design Code</th>
                  <th>Design Title</th>
                  <th>Message</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq._id}>
                    <td>{inq.designCode}</td>
                    <td>{inq.designTitle}</td>
                    <td>{inq.message}</td>
                    <td>{new Date(inq.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
