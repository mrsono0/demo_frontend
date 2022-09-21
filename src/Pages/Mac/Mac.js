import React, { Component } from "react";
import LOCATION_MAP from "../Mac/Location_map";
import { Button } from "react-bootstrap";
// if (this.state[value] === false) {
//   value = true
// } else {
//   value = false
// }

// LoadHospital = async () => {
//   axios
//     .get("http://127.0.0.1:8000/emhospital")
//     .then((emhospital) => {
//       this.setState({
//         loading: true,
//         hospital_list: emhospital,
//       });
//     })
//     .catch((e) => {
//       // API 호출이 실패한 경우
//       console.error(e); // 에러표시
//       this.setState({
//         loading: false,
//       });
//     });
// };

//  Park() {

//   try {
//     const response = axios.get("192.168.80.184:8000/park");
//     setPark(response.data);
//   } catch (e) {
//     console.log(e);
//   }
// }
// const { handleClick } = this.state;
// console.log(handleClick);
// console.log(this.state);
// if (this.state.value === false) {
//   console.log("확인");
//   // this.state.value = false
//   this.state.value = true

// }


// Park_handleClick = ({ target: { park, value } }) => {
//   this.setState({ value: true });
// };

class map extends Component {
  state = {
    value: false,
  };
  // Hos_handleClick = ({ target: { hospital, value } }) => {
  //   this.setState({ value: true });
  // };


  render() {

    return (
      <div>
        <section className="internal-page-wrapper top-100 bottom-100">
          <div className="container-xxl">
            <div className="row h-100 align-items-center justify-content-center text-center">
              <div className="col-12">
                <div className="pet_convience">
                  <div>
                    <Button
                      size="sm"
                      name="hospital"
                      width="100px"
                      onClick={this.Hos_handleClick}
                      value={this.state}
                    >
                      동물병원
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      checked={true}
                      size="sm"
                      name="park"
                      width="100px"
                      onClick={this.Park_handleClick}
                    // value={this.state}
                    >
                      공원
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>애견미용 : </span>
                    <Button
                      checked={true}
                      size="sm"
                      name="beauty"
                    // onClick={}
                    ></Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>펫 택시 : </span>
                    <Button
                      checked={true}
                      size="sm"
                      name="taxi"
                    ></Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>펫 호텔 : </span>
                    <Button
                      checked={true}
                      size="sm"
                      name="hotel"
                    ></Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>애견카페 : </span>
                    <Button
                      checked={true}
                      size="sm"
                      name="cafe"
                    ></Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>24시간 동물병원 : </span>
                    <Button
                      checked={true}
                      size="sm"
                      name="24h"
                    ></Button>
                  </div>
                </div>
                <div className="container-fluid">
                  <LOCATION_MAP />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default map;
