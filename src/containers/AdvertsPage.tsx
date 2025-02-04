
import Pagination from "../components/Pagination/Pagination";
import ProductList from "../components/ProductList/ProductList";
import Footer from "../components/Footer/footer";
import Filters from "../components/Filters";

const AdvertsPage = () => {
  return (
    <div className="container-fluid pb-3">
      <div className="row g-3">
        {/* Columna de filtros */}
        <div className="col-3">
          <Filters /> {/* Usamos el componente de filtros aquí */}
        </div>

        {/* Columna de productos */}
        <div className="col-9">
          <div className="mb-3">
            <Pagination />
          </div>
          <div className="mb-3">
            <h2 className="text-center">Listado de productos</h2>
          </div>
          <ProductList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvertsPage;
