import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import Footer from "../components/footer";
import Filters from "../components/Filters";
import { getAdverts } from "../api";
import { FiltersType } from "../models/models";
import { Advert } from "../models/models";

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [filteredAdverts, setFilteredAdverts] = useState<Advert[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Estado para filtros
  const [filters, setFilters] = useState<FiltersType>({
    tag: "all",
    minPrice: "",
    maxPrice: "",
    name: "",
    owner: "",
  });

  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true); // Mostrar spinner
      try {
        const advertsData = await getAdverts(filters); // Llamada a la API con filtros
        console.log(advertsData); 
        setAdverts(advertsData); // Guardar datos en el estado
      } catch (err) {
        console.error(err);
        setError("Error al cargar los anuncios. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false); // Ocultar spinner
      }
    };

    fetchAdverts();
  }, [filters]);

  useEffect(() => {
    const applyFilters = () => {
      let updatedAdverts = [...adverts];

      // Coincidencias parciales para el nombre
      if (filters.name) {
        updatedAdverts = updatedAdverts.filter((advert) =>
          advert.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }

      // Actualizar la lista filtrada
      setFilteredAdverts(updatedAdverts);
    };

    applyFilters();
  }, [filters.name, adverts]);

  // Actualización de filtros
  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };


  return (
    <div className="container-fluid pb-3">
      <div className="row g-3">
        <div className="col-3">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className="col-9">
          <div className="mb-3">
            <Pagination />
          </div>
          <div className="mb-3">
            <h2 className="text-center">Listado de productos</h2>
          </div>
          {loading && <p className="text-center">Cargando anuncios...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {!loading && !error && <ProductList adverts={adverts} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvertsPage;



