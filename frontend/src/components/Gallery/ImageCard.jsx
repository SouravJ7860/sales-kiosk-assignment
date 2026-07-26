function ImageCard({ image, onClick }) {
  return (
    <div className="gallery-card" onClick={() => onClick(image)}>
      <img src={image.imageUrl} alt={image.title} />

      <h3>{image.title}</h3>
    </div>
  );
}

export default ImageCard;