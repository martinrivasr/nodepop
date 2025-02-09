import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdvertById, deleteAdvert } from "../api";
import Message from "../components/message";

const AdvertDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<any>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const data = await getAdvertById(id!);
        setAdvert(data);
      } catch (error) {
        setMessage({ type: "error", text: "Error al cargar el anuncio" });
      }
    };
    fetchAdverts();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteAdvert(id!);
      setMessage({ type: "success", text: "Anuncio eliminado con éxito" });
      navigate("/adverts");
    } catch (error) {
      setMessage({ type: "error", text: "Error al eliminar el anuncio" });
    }
  };

  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);

  if (!advert) return <p>Cargando anuncio...</p>;

  return (
    <section className="content">
      <div className="container py-5">
        <h2>Detalle del producto</h2>
        {message && <Message type={message.type} text={message.text} />}
        <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
          <img
            src={advert.photo || "/imagen.jpg"}
            alt={`Foto del producto ${advert.name}`}
            className="img-fluid mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
          />
          <div className="product-details flex-grow-1">
            <h3>{advert.name}</h3>
            <p><strong>Precio:</strong> ${advert.price}</p>
            <p><strong>Tipo:</strong> {advert.sale ? "Venta" : "Compra"}</p>
            <p><strong>Propietario:</strong> {advert.owner || "N/A"}</p>
            <div>
              <strong>Tags:</strong>{" "}
              {advert.tags.map((tag: string) => (
                <span key={tag} className="badge bg-primary me-2">
                  {tag}
                </span>
              ))}
            </div>
            <button onClick={openConfirmation} className="btn btn-danger mt-3">Eliminar</button>
          </div>
        </div>

        {/* Confirmación dinámica */}
        {showConfirmation && (
          <div className="mt-3 p-3 border rounded bg-light" style={{ width: "24rem" }}>
            <p>¿Estás seguro de que deseas eliminar este anuncio?</p>
            <div>
              <button onClick={handleDelete} className="btn btn-danger me-2">Confirmar</button>
              <button onClick={closeConfirmation} className="btn btn-secondary">Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvertDetailPage;
