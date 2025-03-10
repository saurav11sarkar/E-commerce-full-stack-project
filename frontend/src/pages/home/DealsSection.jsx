import React from "react";
import dealImg from "../../assets/deals.png";

const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealImg} alt="deal image" />
      </div>
      <div className="deals__content">
        <h5>Get UP To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates,
          doloribus? Officiis dolorem illo ab aut nemo laboriosam quis libero
          sapiente quo voluptatem repellendus, suscipit inventore nisi! Magnam,
          voluptatum! Ducimus, maiores.
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>05</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
