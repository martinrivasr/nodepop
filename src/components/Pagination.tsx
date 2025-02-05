import React from "react";

const Pagination = () => {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-2 mb-3 bg-body-tertiary px-3 py-2">
      {/* Filtros de orden y registros por página */}
      <div className="d-flex align-items-center gap-3">
        <select
          className="form-select text-primary"
          style={{ minWidth: "200px" }}
        >
          <option value="10">Registros por página</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>

        <select
          className="form-select text-primary"
          style={{ minWidth: "150px" }}
        >
          <option value="asc">Ordenar</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <i
          className="bi bi-sort-up fs-4"
          style={{ cursor: "pointer" }}
          title="Orden ascendente"
        ></i>
        <i
          className="bi bi-sort-down fs-4"
          style={{ cursor: "pointer" }}
          title="Orden descendente"
        ></i>
      </div>

      {/* Total de registros y paginación */}
      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">Total registros: <span className="text-info">999</span></span>
        <nav aria-label="Page navigation">
          <ul className="pagination mb-0">
            <li className="page-item disabled">
              <a className="page-link text-secondary" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link text-primary" href="#">1</a></li>
            <li className="page-item"><a className="page-link text-primary" href="#">2</a></li>
            <li className="page-item"><a className="page-link text-primary" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link text-secondary" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        <span className="text-muted">Total páginas: <span className="text-info">100</span></span>
      </div>
    </div>
  );
};

export default Pagination;
