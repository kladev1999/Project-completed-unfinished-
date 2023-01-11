import React, { useState, useEffect } from "react";
import TableService from "../../services/TableService";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import TotalOrderService from '../../services/TotalOrderService';

function TebleComponent() {
  const [table, setTabel] = useState([]);
  const navigate = useNavigate();

  const [totalOrder_Status, setTotalOrder_Status] = useState(0)
  const [disCount, setDisCount] = useState(0)
  const [totalPrice, settotalPrice] = useState(0)
  
  
 
  const [totalOrder,setTotalOrder] = useState([]);
  const [totalTab,setTotalTab] = useState([]);

  const getTotalOrder = () =>{
    TotalOrderService.getTotalOrders()
    .then((response) =>{
      setTotalOrder(response.data);
      console.log("total Order = ",response.data);
    })
    .catch((e) =>{
      console.log(e);
    });
  }

  const getAllTebles = () => {
    TableService.getTable()
      .then((response) => {
        setTabel(response.data);
        console.log("table = ",response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findTable =  async () =>{
    TableService.findTable()
   .then( (response) =>{
     console.log("======= ",totalTab);
     setTotalTab(response.data);
   })
   .catch((e)=>{
     console.log(e);
   });

 };

 const deleteTabel = (table_ID) => {
  if (window.confirm("Are you sure you want to delete table")) {
    TableService.deleteTable(table_ID)
      .then(() => {
        getAllTebles();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
const AddTable = () => {
  navigate("/CreateTableComponent");
};

  useEffect(() => {
    getAllTebles();
    getTotalOrder();
    findTable();
  },[]);

  useEffect(()=>{
    console.log("=======2 ",totalTab);

  },[totalTab]);

  const checkInTable = (e,table_ID) => {

    e.preventDefault();
      const totalOrderState = {
        totalPrice,
        disCount,
        totalOrder_Status,
        compoSite: table_ID,
        table_ID: {
          table_ID,
        },
      };
      
      TotalOrderService.addTotalOrder(totalOrderState)
      .then((response) => {
        navigate("/TotalOrder");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(totalOrderState);
      });
  }
    
    const OrderMenu = (totalOrder,table_ID) => {
    navigate("/DashboardUser/"+totalOrder.totalOrder_ID+"/"+table_ID) ;
  };

  const mixTable = (table_ID) => {
    navigate("/MixTable/"+table_ID);
  }

  const disableButton = (Tab) =>{
    const check = totalOrder.find((item)=>{
        return item.table_ID.table_ID === Tab
      })
      if(check){
        return true;
      }else{
        return false;
      }
    };

    const disableButtonNotOpentable = (Tab) =>{
      const check = totalOrder.find((item)=>{
          return item.table_ID.table_ID === Tab
        })
        if(check){
          return false;
        }else{
          return true;
        }
      };

  return (
    <Container>
      <Row>
        <Row lg="6" md="6" sm="6" xs="12">
          <div className="search__widget d-flex align-items-center justify-content-between ">
            <span>
              <i class="ri-search-line"></i>
            </span>
          </div>
        </Row>
        <div>
          <button className="btn btn-primary mr-2 " style={{marginTop:10}} onClick={AddTable}>
            {" "}
            Add Table
          </button>
        </div>

        {table?.map((t) => {
          return (
            <Col
              lg="3"
              md="12"
              sm="12"
              xs="12"
              key={t.table_ID}
              className="md-4"
            >
              <div className="product__item">
                <div className="product__content">
                  <h5>
                    <h2>โต๊ะ {t.table_ID}</h2>
                    <h4> Zone {t.table_Zone}</h4>
                  </h5>
                  <div className=" d-flex align-items-center justify-content-between ">

                    <button
                      className="btn btn-primary"
                      disabled =   {disableButton(t.table_ID)}
                      onClick={(e) => checkInTable(e,t.table_ID)}
                    > เปิดโต๊ะ 
                    </button>
                  
                    <button
                      disabled = {disableButtonNotOpentable(t.table_ID)}
                      className="btn btn-success"
                      onClick={(e) => OrderMenu(e,t.table_ID)}
                    >
                        สั่งอาหาร
                    </button>
                    <button
                    disabled = {disableButtonNotOpentable(t.table_ID)}
                      className="btn btn-info"
                      onClick={() => mixTable(t.table_ID)}
                    >
                      รวมโต๊ะ
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default TebleComponent;
