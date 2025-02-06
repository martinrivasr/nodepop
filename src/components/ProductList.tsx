import React from "react";
import { Advert } from "../models/models"; // Asegúrate de importar Advert

interface ProductListProps {
  adverts: Advert[];
}

const ProductList: React.FC<ProductListProps> = ({ adverts }) => {
  return (
    <section className="content">
      <div className="row">
        {adverts.map((product) => (
          <div className="col-12 mb-3" key={product.id}>
            <div className="product bg-body-tertiary border rounded-3 p-3 d-flex align-items-center">
              <img
                src={product.photoUrl || "/uploads/imagen.jpg"}
                alt={`Foto del producto ${product.name}`}
                className="product-image me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="product-details">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-owner">Propietario: {product.owner || "N/A"}</p>
                <p className="product-price">Precio: ${product.price}</p>
                <div className="product-tags mb-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="badge bg-primary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
