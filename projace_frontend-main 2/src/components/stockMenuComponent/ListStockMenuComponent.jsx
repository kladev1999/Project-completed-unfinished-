import React from "react";
import StockMenuService from "../../services/StockMenuService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListStockMenuComponent = () => {
  const [stockMenu, setStockMenu] = useState([]);
  const [search, searchInput] = useState("");
  const navigate = useNavigate();

  const getAllStockMenu = () => {
    StockMenuService.getStockMenu()
      .then((response) => {
        setStockMenu(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStockMenu = (stockMenu_ID) => {
    StockMenuService.deleteStockMenu(stockMenu_ID)
      .then((response) => {
        getAllStockMenu();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllStockMenu();
  }, []);

  const filterStockMenu = stockMenu.filter((stockMenu) => {
    return stockMenu.menu_ID.menu_Name
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const viewStockMenu = () => {
    navigate("/viewStockMenu");
  };
  const updateStockMenu = () => {
    navigate("/updateStockMenu");
  };

  const backToMenu = () => {
    navigate("/menu");
  }

  
  return (
    <div className="container">
      <h2 className="text-center"> StockMenu List </h2>
        <div>
        <button className="btn btn-primary mr-2 " style={{marginRight:5}} onClick={backToMenu}>
   
         Menu
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
              <th> StockMenu ID </th>
              <th> StockMenu Qty </th>
              <th> StockMenu Status </th>
              <th> StockMenu TimeStamp </th>
              <th> Menu Name </th>
              <th> Stock Name </th>
              <th> Action </th>
            </tr>
          </thead>

          <tbody>
            {filterStockMenu.map((stockMenu) => (
              <tr key={stockMenu.stockMenu_ID}>
                <td>{stockMenu.stockMenu_ID}</td>
                <td>{stockMenu.stockMenu_Qty}</td>
                <td>{stockMenu.stockMenu_Status}</td>
                <td>{stockMenu.stockMenu_TimeStamp}</td>
                <td>{stockMenu.menu_ID.menu_Name}</td>
                <td>{stockMenu.stockType_ID.stockType_Name}</td>
                <td>
                  <button
                    onClick={() => updateStockMenu(stockMenu.stockMenu_ID)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => viewStockMenu(stockMenu.stockMenu_ID)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteStockMenu(stockMenu.stockMenu_ID)}
                    className="btn btn-danger"
                  >
                    Delete
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

export default ListStockMenuComponent;
