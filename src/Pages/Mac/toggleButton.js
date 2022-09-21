/*global kakao*/
import { Component, useState, useEffect } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";
import { Button } from "react-bootstrap";

function Toggle() {
  const [hospital, sethospital] = useState();
  const Hospital = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/emhospital");
      sethospital(response.data);
      console.log(JSON.stringify(hospital, null, 2));
    } catch (e) {
      console.log(e);
    }
  };
  const [park, setPark] = useState();
  const Park = async () => {
    try {
      const response = await axios.get("127.0.0.1:8000/park");
      setPark(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Button size="sm" name="hospital" width="100px" onClick={Hospital}>
        동물병원
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button checked={true} size="sm" name="park" width="100px" onClick={Park}>
        공원
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>애견미용 : </span>
      <BootstrapSwitchButton
        checked={true}
        size="sm"
        onstyle="outline-primary"
        offstyle="outline-secondary"
        name="beauty"
      // onClick={}
      ></BootstrapSwitchButton>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>펫 택시 : </span>
      <BootstrapSwitchButton
        checked={true}
        size="sm"
        onstyle="outline-primary"
        offstyle="outline-secondary"
        name="taxi"
      ></BootstrapSwitchButton>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>펫 호텔 : </span>
      <BootstrapSwitchButton
        checked={true}
        size="sm"
        onstyle="outline-primary"
        offstyle="outline-secondary"
        name="hotel"
      ></BootstrapSwitchButton>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>애견카페 : </span>
      <BootstrapSwitchButton
        checked={true}
        size="sm"
        onstyle="outline-primary"
        offstyle="outline-secondary"
        name="cafe"
      ></BootstrapSwitchButton>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>24시간 동물병원 : </span>
      <BootstrapSwitchButton
        checked={true}
        size="sm"
        onstyle="outline-primary"
        offstyle="outline-secondary"
        name="24h"
      ></BootstrapSwitchButton>
    </div>
  );
}

export default Toggle;
