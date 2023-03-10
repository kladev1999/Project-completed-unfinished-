import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StockService from "../../services/StockService";

const ListStockComponent = () => {
  const [stock, setStock] = useState([]);
  const [search, searchInput] = useState("");
  const navigate = useNavigate();



  const getAllStocks = () => {
    StockService.getStock()
      .then((response) => {
        setStock(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStock = (stock_ID) => {

    window.confirm('Are you sure you want to delete')
    StockService.deleteStock(stock_ID)
      .then((response) => {
        getAllStocks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllStocks();
  }, []);

  const viewStock = (stock_ID) => {
    navigate("/viewStock/" + stock_ID);
  };

  const editStock = (stock_ID) => {
    navigate("/update-Stock/" + stock_ID);
  };

  const addStock = () => {
    navigate("/addStock");
  };

  const addStockType = () => {
    navigate("/addStockType");
  };

  const filterStock = stock.filter((stock) => {
    return stock.stockType_ID.stockType_Name
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const getBackgroundColor = (value) => {
    let color;
    if (value.stock_Qty <= value.stock_Min) {
        color = '#FF6961';
    } 
    return color;
};

  
  return (
    <div className="container">
      <h2 className="text-center">Stock List</h2>
      <div className="">
        <button className="btn btn-primary mr-2 " style={{margin:5}} onClick={addStock}>
          {" "}
          Add Stock
        </button>
        
        <button className="btn btn-primary mr-2 "style={{margin:5}} onClick={addStockType}>
          {" "}
          Add StockType
        </button>

        <input
          type="search"
          placeholder="ค้นหา"
          aria-label="Search"
          onChange={(e) => searchInput(e.target.value)}
        />
      </div>

      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Stock ID </th>
              <th> StockType Name </th>
              <th> Stock Qty </th>
              <th> Stock Cost </th>
              <th> Stock Min </th>
              <th> Stock TimeStamp </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {filterStock.map((stocks) => (
              //  testxxx(stocks)
              <tr key={stocks.stock_ID} style={{backgroundColor: getBackgroundColor(stocks)}}>
                <td>{stocks.stock_ID}</td>
                <td>{stocks.stockType_ID.stockType_Name}</td>
                <td>{stocks.stock_Qty}</td>
                <td>{stocks.stock_Cost}</td> 
                <td>{stocks.stock_Min}</td> 
                 <td>{stocks.stock_TimeStamp}</td>
                <td>
                  <button
                    onClick={() => editStock(stocks.stock_ID)}
                    className="btn btn-info"
                  >
                    Update{" "}
                  </button>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => deleteStock(stocks.stock_ID)}
                    className="btn btn-danger"
                  >
                    Delete{" "}
                  </button>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => viewStock(stocks.stock_ID)}
                    className="btn btn-info"
                  >
                    View{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStockComponent;
