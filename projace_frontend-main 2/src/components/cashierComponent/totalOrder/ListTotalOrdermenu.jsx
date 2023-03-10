import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TotalOrderService from "../../../services/TotalOrderService";
import { Container, Row, Col } from "react-grid-system";
function ListTotalOrdermenu() {
  const { compoSite, table_ID, totalOrder_ID } = useParams();
  const navigate = useNavigate();
  const [totalOrder, setTotalOrder] = useState([]);
  const [list, setlist] = useState([]);

  const [checkPay, setCheckPay] = useState([]);
  let TotalPrice = list?.reduce(
    (prev, cur) => prev + cur.menu_ID.menu_Price * cur.orderMenu_Qty,
    0
  );

  const getListOrderMenu = (compoSite) => {
    TotalOrderService.getTotalListOrderById(compoSite)
      .then((response) => {
        setlist(response.data);
        console.log("list = ", response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const UpdateTotalPrice = (Price) => {
    TotalOrderService.updateTotalprice(Price, totalOrder_ID).then(
      (response) => {
        console.log("updateTotalPrice");
        console.log("totalprice = ", Price);
      }
    );
  };

  const getTotalOrder = () => {
    TotalOrderService.getTotalOrderById(compoSite)
      .then((respone) => {
        setTotalOrder(respone.data);
        console.log("Total Order = ", totalOrder);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Back = () => {
    navigate("/TotalOrder");
  };

  useEffect(() => {
    UpdateTotalPrice();
    getListOrderMenu(compoSite);
    getTotalOrder(compoSite);
  }, [compoSite]);

  const checkStatus = () => {
    TotalOrderService.checkPay()
      .then((response) => {
        setCheckPay(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const status = (value) => {
    if (value.status_ID.status === "เสิร์ฟแล้ว") {
      return (
        <td className="text-center" style={{ backgroundColor: "#A7D489" }}>
          {value.status_ID.status}
        </td>
      );
    } else {
      return <td className="text-center">{value.status_ID.status}</td>;
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const title = () => {
    if ((compoSite, table_ID)) {
      return (
        <h2 className="text-center"> รายการที่สั่งของโต๊ะที่ {table_ID} </h2>
      );
    } else {
      return (
        <div>
          <h2 className="text-center">รายการที่สั่งของโต๊ะที่ {table_ID}</h2>
        </div>
      );
    }
  };

  const ChechBNT = () => {
    if (list.length > 0) {
      return (
        <div>
          <button
            style={{ marginLeft: "5px" }}
            onClick={() => Back()}
            className="btn btn-outline-primary"
          >
            กลับ
          </button>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <Container>
      {title()}

      <Container>
        <Row>
          <Col>
            {list.length === 0 ? (
              <div>
                <br></br>
                <h2 className="text-center" style={{ color: "red" }}>
                  ไม่มีการสั่งอาหาร
                </h2>
                <br></br>
              </div>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-center"> ลำดับที่ </th>
                    <th className="text-center"> โต๊ะที่สั่ง </th>
                    <th className="text-center"> สถานะ </th>
                    <th className="text-center"> เวลาที่สั่ง </th>
                    <th className="text-center"> เมนูที่สั่ง </th>
                    <th className="text-center"> จำนวน </th>
                    <th className="text-center"> ราคา </th>
                    <th className="text-center"> พนักงานที่รับ </th>
                  </tr>
                </thead>

                <tbody>
                  {list?.map((d, index) => (
                    <tr>
                      <th className="text-center">{index + 1}</th>
                      <td className="text-center">
                        {d.totalOrder_ID.table_ID.table_ID}
                      </td>
                      {/* <td className="text-center">{d.status_ID.status}</td> */}
                      {status(d)}
                      <td className="text-center">{d.orderMenu_TimeStamp}</td>
                      <td className="text-center">{d.menu_ID.menu_Name}</td>
                      <td className="text-center">{d.orderMenu_Qty}</td>
                      <td className="text-center">
                        {d.menu_ID.menu_Price * d.orderMenu_Qty}
                      </td>
                      <td className="text-center">{d.id.name_Emp}</td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
            )}

            <h2 className="text-end">
                  {UpdateTotalPrice(TotalPrice)}
                  ราคารวม {Intl.NumberFormat().format(TotalPrice)}
                </h2>
            {ChechBNT()}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ListTotalOrdermenu;
