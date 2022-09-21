import React, { Component } from "react";
import $ from "jquery";
import "../../js/custom.js";
import flag from "../../images/icons/16.png";
import ai_logo from "../../images/icons/ai_logo.png";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="upper-text-container"></div>
        <div className="footer-links-wrapper row"></div>
        <span>(주)어디개 어디냥</span>
        <br />
        <span>조 이름: 슬랙봐줘</span>

        <div className="copyright-wrapper row">
          <div className="copyright col-sm-12 order-2 col-md-8 order-md-1 col-lg-4 order-lg-1">
            Copyright &copy; 2020 Apple Inc. All rights reserved.
          </div>
          <div className="footer-links-terms  col-sm-12 order-3 col-lg-6 order-lg-2">
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Sales and Refunds</a>
              </li>
              <li>
                <a href="#">Legal</a>
              </li>
              <li>
                <a href="#">Site Map</a>
              </li>
            </ul>
          </div>
          <div className="footer-country  col-sm-12 order-1 col-md-4 order-md-2 text-md-right col-lg-2 order-lg-3">
            <div className="flag-wrapper">
              <img src={ai_logo} alt="" />
            </div>{" "}
            <div className="footer-country-name">Gwang-ju AI School</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
