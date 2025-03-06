import { useEffect, useState } from "react";
import { useParams } from "react-router";
import products from "../../data/products.json";
import ProductCarts from "../shop/ProductCarts";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryName.toLowerCase()
    );
    setFilterProducts(filtered);
  }, [categoryName]);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
      <section className="section__container bg-[#f4e5ec] ">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dress to versitile
          asscories Elevate your style today
        </p>
      </section>
      {/* products card */}

      <div className="section__container">
        <ProductCarts products={filterProducts}/>
      </div>
    </>
  );
};

export default CategoryPage;
