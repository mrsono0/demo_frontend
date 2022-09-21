import React, { Component } from "react";

import Location from "./location";
import video from "../../images/video/dog.mp4";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import image from "../../images/icons/main_image.png";
function Main() {
  return (
    <div>
      <section className="alert-section top-50">
        <video
          className="running dog"
          src={video}
          autoPlay={true}
          loop
          muted={true}
        ></video>
        <div className="container">
          <div className="alert-text">
            <br />
          </div>
        </div>
      </section>
      <section className="second-hightlight-wrapper">
        반려동물과 살기 좋은 지역
        <div className="container-xxl">
          <div className="title-wraper bold black">
            <Location />
            <Nav.Link className="nav-link" href="/map">
              <Button type="button" variant="outline-primary" className="move">
                이동
              </Button>
            </Nav.Link>
          </div>
        </div>
      </section>
      <section className="fourth-heghlight-wrapper">
        <div className="container-fluid">
          <div className="title-wraper">서울특별시</div>
          <a href="./predict">
            <img src={image} alt="" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Main;
