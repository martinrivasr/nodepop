import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import { getAdverts } from "../api";
import { FiltersType, Advert } from "../models/models";
import api from "../api"; // Asegúrate de tener el cliente API configurado

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState<FiltersType>({
    tag: "all",
    minPrice: "",
    maxPrice: "",
    name: "",
    owner: "",
  });

  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [order, setOrder] = useState<string>("asc");
  const [sortField, setSortField] = useState<string>("name");
  const [totalRecords, setTotalRecords] = useState<number>(0);

  // Función para obtener el nombre del usuario
  const getUserNameById = async (userId: string): Promise<string> => {
    try {
      const response = await api.get(`/users/${userId}`); // Endpoint para obtener usuario
      return response.data.name || "N/A";
    } catch (err) {
      console.error(`Error al obtener el nombre del usuario con ID ${userId}:`, err);
      return "N/A";
    }
  };

  // Efecto para cargar los anuncios
  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAdverts({ ...filters });

        const total = response.length;
        setTotalRecords(total);

        const offset = (currentPage - 1) * limit;
        const paginatedAdverts = response.slice(offset, offset + limit);

        // Obtener nombres de usuarios asociados a los anuncios
        const advertsWithOwnerName = await Promise.all(
          paginatedAdverts.map(async (advert) => {
            const ownerName = advert.userId
              ? await getUserNameById(advert.userId)
              : "N/A";
            return { ...advert, owner: ownerName };
          })
        );

        // Ordenar los anuncios
        const sortedAdverts = [...advertsWithOwnerName].sort((a, b) => {
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
  );
};

export default AdvertsPage;
