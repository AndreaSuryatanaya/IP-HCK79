import PropTypes from "prop-types";
import "./card.css";

export default function AnimeCard({ anime }) {
  return (
    <div className="card h-100 shadow-lg rounded-3 border-0">
      <img
        src={anime.images.jpg.image_url}
        className="card-img-top rounded-top"
        alt={anime.title}
        style={{ maxHeight: "250px", objectFit: "cover" }} // Membatasi tinggi gambar
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "1rem" }}>
          {anime.title}
        </h5>
        <p className="card-text" style={{ fontSize: "0.875rem" }}>
          ⭐ {anime.score} | 🗓 {anime.year || "Unknown"}
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted">ID: {anime.mal_id}</small>
      </div>
    </div>
  );
}

AnimeCard.propTypes = {
  anime: PropTypes.shape({
    mal_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.shape({
      jpg: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    score: PropTypes.number,
    year: PropTypes.number,
  }).isRequired,
};
