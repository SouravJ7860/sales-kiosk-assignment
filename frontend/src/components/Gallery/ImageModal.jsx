function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="image-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.imageUrl} alt={image.title} />

        <h2>{image.title}</h2>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ImageModal;