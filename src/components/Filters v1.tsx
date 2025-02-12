import React from "react";
import { FiltersType } from "../models/models";

interface FiltersProps {
  filters: FiltersType;
  onFilterChange: (newFilters: FiltersType) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    const parsedValue =
      name === "minPrice" || name === "maxPrice" ? (value ? Number(value) : "") : value;
  
    onFilterChange({ ...filters, [name]: parsedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onFilterChange(filters); 
  };

  return (
    <aside className="filters bg-light border rounded p-3">
      <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <select
              id="tag"
              name="tag"
              className="form-select"
              multiple
              value={filters.tag}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  tag: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
            >
            <option value="work">Work</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="motor">Motor</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="minPrice" className="form-label">
            Precio mínimo:
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            className="form-control"
            placeholder="Precio mínimo"
            value={filters.minPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maxPrice" className="form-label">
            Precio máximo:
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            className="form-control"
            placeholder="Precio máximo"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre del producto:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Nombre del producto"
            value={filters.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="owner" className="form-label">
            Propietario:
          </label>
          <input
            type="text"
            id="owner"
            name="owner"
            className="form-control"
            placeholder="Propietario"
            value={filters.owner}
            onChange={handleInputChange}
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
