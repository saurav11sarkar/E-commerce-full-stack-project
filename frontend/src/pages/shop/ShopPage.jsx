import { useEffect, useState } from "react";
import productsData from "../../data/products.json";
import ProductCarts from "./ProductCarts";
import ShopFiltering from "./ShopFiltering";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productsData);
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  //   filtering function
  const applyFilter = () => {
    let filteredProdutss = productsData;

    // filter by cate
    if (filterState.category && filterState.category !== "all") {
      filteredProdutss = filteredProdutss.filter(
        (product) => product.category === filterState.category
      );
    }

    //   filter by color
    if (filterState.color && filterState.color !== "all") {
      filteredProdutss = filteredProdutss.filter(
        (product) => product.color === filterState.color
      );
    }

    //   filter by priceRange
    if (filterState.priceRange) {
      const [minPrice, maxPrice] = filterState.priceRange
        .split("-")
        .map(Number);
      filteredProdutss = filteredProdutss.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setProducts(filteredProdutss);
  };
  useEffect(() => {
    applyFilter();
  }, [filterState]);

  const clearFunction = () => {
    setFilterState({ category: "all", color: "all", priceRange: "" });
  };

  return (
    <>
      <section className="section__container bg-[#f4e5ec] ">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Discover the Hottest Picks: with our Curated Collection of Trending
          Women's Fashion Producs.
        </p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilters={clearFunction}
          />

          {/* right side */}
          <div>
            <h3 className="text-xl font-medium">
              Products Available.{products.length}
            </h3>
            <div className="section__margin">
              <ProductCarts products={products} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
