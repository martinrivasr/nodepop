import React from "react";

const Filters = () => {
  return (
    <aside className="filters bg-light border rounded p-3">
      <h2>Search</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <select id="tag" className="form-select">
            <option value="all">All</option>
            <option value="work">Work</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="motor">Motor</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="min-price" className="form-label">
            Precio mínimo:
          </label>
          <input
            type="number"
            id="min-price"
            className="form-control"
            placeholder="Precio mínimo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="max-price" className="form-label">
            Precio máximo:
          </label>
          <input
            type="number"
            id="max-price"
            className="form-control"
            placeholder="Precio máximo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product-name" className="form-label">
            Nombre del producto:
          </label>
          <input
            type="text"
            id="product-name"
            className="form-control"
            placeholder="Nombre del producto"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="owner" className="form-label">
            Propietario:
          </label>
          <input
            type="text"
            id="owner"
            className="form-control"
            placeholder="Propietario"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Aplicar filtros
        </button>
      </form>
    </aside>
  );
};

export default Filters;
