import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Predict() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/predict.json")
      .then((res) => res.json())
      .then((products) => {
        setProducts(() => products.products);
      });
  }, []);

  console.log(products);
  let order = 1;
  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <div className="title-wraper bold">머신러닝</div>
              <div className="brief-description">반려동물 등록 수 예측</div>
            </div>
          </div>
          {products.map((product) => {
            let id = product.product_url;
            let title = product.product_name;
            let img = product.product_img;
            let img2 = product.product_img2;
            let Brief = product.product_brief_description;
            let StartPrice = product.starting_price;
            let PriceRange = product.price_range;

            let order1 = 1;
            let order2 = 2;
            if (order !== 1) {
              order1 = 2;
              order2 = 1;
              order--;
            } else {
              order++;
            }

            let productDiv = (
              <div
                key={id}
                className="row justify-content-center text-center product-holder h-100 top-100 bottom-100"
              >
                <div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
                  <div className="product-title">{title}</div>
                  <div className="product-brief">{Brief}</div>
                  <div className="starting-price">{StartPrice}</div>
                  <div className="monthly-price">{PriceRange}</div>
                </div>

                <div className={`col-sm-12 col-md-12 order-${order2}`}>
                  <div className="predict-image">
                    <table className="predict-table" cellPadding="10">
                      <tr>
                        <td className="predict-td">
                          <img src={img} alt="" />
                        </td>
                        <td>
                          <img src={img2} alt="" />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            );
            return productDiv;
          })}
        </div>
      </section>
    </div>
  );
}
export default Predict;
