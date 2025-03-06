import { useState } from "react";
import ProductCarts from "./ProductCarts";
import products from "../../data/products.json";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const loadmorProducts = () => {
    setVisibleProducts((prevCart) => prevCart + 4);
  };
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className=" section__subheader">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo commodi
        laborum vero ut rem velit, incidunt esse nam quo!
      </p>

      {/* product carts */}
      <div className="section__margin">
        <ProductCarts products={products.slice(0,visibleProducts)} />
      </div>

      {/* loard more products */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadmorProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
