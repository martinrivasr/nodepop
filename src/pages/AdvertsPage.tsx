
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import Footer from "../components/footer";
import Filters from "../components/Filters";

const AdvertsPage = () => {
  return (
    <div className="container-fluid pb-3">
      <div className="row g-3">
        <div className="col-3">
          <Filters />
        </div>

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
