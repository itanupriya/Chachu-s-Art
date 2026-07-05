import { API_URL } from "../api.js";
import api from "../api.js";
import { getCategoryColor } from "../utils/categoryColors.js";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

function DesignCard({ design }) {
  async function handleEnquire() {
    const message = `Hi Chachu, I am interested in Radium Design #${design.code} (${design.title}). Can you please tell me the price and available sizes?`;

    // log the inquiry in our own DB too, in case customer doesn't actually send the WhatsApp message
    try {
      await api.post("/inquiries", {
        designCode: design.code,
        designTitle: design.title,
        message,
      });
    } catch (err) {
      // not a big deal if this fails, the WhatsApp message is the main thing
      console.error("Could not log inquiry:", err);
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="design-card" style={{ "--glow": getCategoryColor(design.category) }}>
      <img src={`${API_URL}${design.imageUrl}`} alt={design.title} />
      <div className="design-card-info">
        <span className="design-code">#{design.code}</span>
        <h3>{design.title}</h3>
        <p className="design-category">{design.category}</p>
        <button onClick={handleEnquire} className="enquire-btn">
          Enquire on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default DesignCard;
