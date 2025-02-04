import React from "react";

const ProductList = () => {
  return (
    <section className="content">
      <div className="row">
        {[1, 2, 3, 4].map((product) => (
          <div className="col-12 mb-3" key={product}>
            <div className="product bg-body-tertiary border rounded-3 p-3 d-flex align-items-center">
              <img
                src="/uploads/imagen.jpg"
                alt="Foto del producto"
                className="product-image me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="product-details">
                <h4 className="product-name">Producto {product}</h4>
                <p className="product-owner">Propietario: Juan Pérez</p>
                <p className="product-price">Precio: $100</p>
                <div className="product-tags mb-2">
                  <span className="badge bg-primary me-1">Tag</span>
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
