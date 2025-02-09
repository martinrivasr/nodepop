import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";
import Footer from "../components/footer";
import { getAdverts } from "../api";
import { FiltersType, Advert } from "../models/models";


const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para filtros, paginación y orden
  const [filters, setFilters] = useState<FiltersType>({
    tag: "all",
    minPrice: "",
    maxPrice: "",
    name: "",
    owner: "",
  });

  const [limit, setLimit] = useState<number>(10); // Registros por página
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
  const [order, setOrder] = useState<string>("asc"); // Orden de los resultados
  const [sortField, setSortField] = useState<string>("name"); // Campo para ordenar
  const [totalRecords, setTotalRecords] = useState<number>(0); // Total de registros disponibles

  // Efecto para cargar los anuncios
  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAdverts({ ...filters });
        console.log(response)
        const total = response.length;
        setTotalRecords(total);

        const offset = (currentPage - 1) * limit;
        const paginatedAdverts = response.slice(offset, offset + limit);

        const sortedAdverts = [...paginatedAdverts].sort((a, b) => {
          const valueA = a[sortField as keyof Advert] ?? "";
          const valueB = b[sortField as keyof Advert] ?? "";
          return order === "asc"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
        });

        setAdverts(sortedAdverts);
      } catch (err) {
        console.error("Error al cargar los anuncios:", err);
        setError("Error al cargar los anuncios. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
  }, [filters, limit, currentPage, order, sortField]);

  // Manejadores
  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleOrderChange = (newOrder: string) => {
    setOrder(newOrder);
    setCurrentPage(1);
  };

  const handleSortFieldChange = (field: string) => {
    setSortField(field);
    setCurrentPage(1);
  };

  return (
    <section className="content d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="layout">
          <aside className="aside">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </aside>
          <main className="main">
            <div className="product-list-container">
              <Pagination
                totalRecords={totalRecords}
                limit={limit}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onOrderChange={handleOrderChange}
                sortField={sortField}
                onSortFieldChange={handleSortFieldChange}
              />
              <h2 className="text-center">Listado de productos</h2>
              {loading && <p className="text-center">Cargando anuncios...</p>}
              {error && <p className="text-center text-danger">{error}</p>}
              {!loading && !error && <ProductList adverts={adverts} />}
            </div>

          </main>
          <footer className="footer">
            <Footer />
          </footer>
        </div>
    </section>
    
  );
};

export default AdvertsPage;
