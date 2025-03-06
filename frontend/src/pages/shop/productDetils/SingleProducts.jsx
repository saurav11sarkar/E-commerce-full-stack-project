import React from "react";
import { Link, useParams } from "react-router";
import RattingStars from "../../../components/RattingStars";

const SingleProducts = () => {
  const { id } = useParams();

  return (
    <>
      <section className="section__container bg-[#f4e5ec] ">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-[#ed3849]">
            <Link to={"/"}>Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-[#ed3849]">
            <Link to={"/shop"}>Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-[#ed3849]">product name</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product img */}
          <div className="md:w-1/2 w-full">
            <img
              src="https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="rounded-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3
              className="text-2xl font-semibold"
              style={{ marginBottom: "16px" }}
            >
              Product Name
            </h3>
            <p
              className="text-xl text-[#ed3849]"
              style={{ marginBottom: "16px" }}
            >
              $100 <s>$130</s>
            </p>
            <p className="text-gray-400" style={{ marginBottom: "16px" }}>
              This is an product description
            </p>

            {/* aditional product info */}
            <div>
              <p>
                <strong>Category:</strong> accessories
              </p>
              <p>
                <strong>Color:</strong> beige
              </p>
              <div className="flex gap-1 items-center">
                <strong>Ratting: </strong>
                <RattingStars rating={"4"} />
              </div>
            </div>

            <button
              className="  bg-[#ed3849] text-white rounded-md"
              style={{ marginTop: "1.5rem", padding: "8px 16px" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* display review */}
      {/* Todo */}
      <section className="section__container" style={{marginTop:'2rem'}}>Review</section>
    </>
  );
};

export default SingleProducts;
