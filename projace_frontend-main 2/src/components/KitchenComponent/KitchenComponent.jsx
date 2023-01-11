import React from "react";
import { useEffect, useState } from "react";
import OrderMenuService from "../../services/OrderMenuService";
import { Container } from "reactstrap";
const KitchenComponent = () => {
  const [orderKitchen, setOrderKitchen] = useState([]);
  const [search, searchInput] = useState("");
  const OrderKitchen = () => {
    OrderMenuService.kitchen().then((response) => {
      setOrderKitchen(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    OrderKitchen();
  }, []);
    
    

  const updateState = (orderMenu_ID) => () => {
    OrderMenuService.updateStatus(orderMenu_ID)
      .then((response) => {
        // window.location.reload();
        OrderKitchen();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cancel = (orderMenu_ID) => () => {
    OrderMenuService.cancelStatus(orderMenu_ID)
      .then((response) => {
        // window.location.reload();
        OrderKitchen();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const filterStock = orderKitchen.filter((ok) => {
    return ok.totalOrder_ID.table_ID.table_Zone
      .toLowerCase()
      .includes(search.toLowerCase());
  });


    const getBackgroundColor = (value) => {
        let color;
        
        if (value.status_ID.status_ID === 2) {
            color = '#A7D489';
        } 
        return color;
    };

  const watingCook = (k,index) =>{
    if(k.status_ID.status_ID !== 2){
        return  <tr style={{ backgroundColor: getBackgroundColor(k) }}>
        <th>{index + 1}</th>
        <td>{k.totalOrder_ID.table_ID.table_Zone}</td>
        <td>{k.menu_ID.menu_Name}</td>
        <td>{k.orderMenu_Qty}</td>
        <td>{k.orderMenu_TimeStamp}</td>
        <td>{k.status_ID.status}</td>
        <td>
          <div>
            <button
              type="button"
              class="btn btn-primary"
              disabled={getBackgroundColor(k)}
              onClick={updateState(k.orderMenu_ID)}
            >
              {k.status_ID.status}
            </button>
            <button
              type="button"
              class="btn btn-danger"
              disabled={getBackgroundColor(k)}
              onClick={cancel(k.orderMenu_ID)}
            >
              {" "}
              ยกเลิก{" "}
            </button>
          </div>
        </td>
      </tr> 
    }
  };

  const finishedCook = (k,index) =>{
    if(k.status_ID.status_ID === 2){
        return  <tr style={{ backgroundColor: getBackgroundColor(k) }}>
        <th>{index + 1}</th>
        <td>{k.totalOrder_ID.table_ID.table_Zone}</td>
        <td>{k.menu_ID.menu_Name}</td>
        <td>{k.orderMenu_Qty}</td>
        <td>{k.orderMenu_TimeStamp}</td>
        <td>{k.status_ID.status}</td>
        <td>
          <div>
            <button
              type="button"
              class="btn btn-primary"
              disabled={getBackgroundColor(k)}
              onClick={updateState(k.orderMenu_ID)}
            >
              {k.status_ID.status}
            </button>
            <button
              type="button"
              class="btn btn-danger"
              disabled={getBackgroundColor(k)}
              onClick={cancel(k.orderMenu_ID)}
            >
              {" "}
              ยกเลิก{" "}
            </button>
          </div>
        </td>
      </tr> 
    }
  };




    return (
        <Container style={{textAlign:"Center"}}>
        <div style={{width:"100%" , height:"500px"}}>
            <h2 className="bg-success text-white" style={{padding:5,margin:5}}>ครัว</h2>

            
            <h2 class="text-center"> ทำยังไม่เสร็จ </h2>
            <input
      style={{marginTop:10}}
          type="search"
          placeholder="ค้นหาโต๊ะ..."
          aria-label="Search"
          onChange={(e) => searchInput(e.target.value)}
        />
        <div
        className="card overflow-auto"
        style={{ width: "100%", height: "400px", marginTop: "10px" }}
     >
            <br></br>
        <div
          className="card-header"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> ลำดับที่ </th>
                    <th> โต๊ะที่</th>
                    <th> รายการที่สั่ง</th>
                    <th> จำนวน</th>
                    <th> เวลา</th>
                    <th> สถานะ </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {filterStock?.map((k, index) => {
                    return (

                        watingCook(k,index)
                    
                    );
                  })}
                </tbody>
              </table>
            </li>
          </ul>
           </div>
      </div>
      </div>





      
      <h2 class="text-center"> เสิร์ฟแล้ว </h2>
      <input
      style={{marginTop:10}}
          type="search"
          placeholder="ค้นหาโต๊ะ..."
          aria-label="Search"
          onChange={(e) => searchInput(e.target.value)}
        />
      <div
        className="card overflow-auto"
        style={{ width: "100%", height: "400px", marginTop: "10px" }}
      >
        
        <br></br>
        <div
          className="card-header"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> ลำดับที่ </th>
                    <th> โต๊ะที่</th>
                    <th> รายการที่สั่ง</th>
                    <th> จำนวน</th>
                    <th> เวลา</th>
                    <th> สถานะ </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                
                </tbody>
                {filterStock?.map((k, index) => {
                    return (

                        finishedCook(k,index)

                    );
                  })}
              </table>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default KitchenComponent;
