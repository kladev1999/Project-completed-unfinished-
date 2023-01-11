import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuService from '../../services/MenuService';
const ListMenuComponent  = () => {
  const [menuList,setMenuList] = useState([]);
  const [search,searchInput] = useState("");
  const navigate = useNavigate();
  let pic = "http://localhost:8080/menu/getimages/";
  
    const getAllMenu = () => {
       MenuService.getMenu()
      .then((response) => {
        setMenuList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    };




    const deleteMenu = (menu_ID) => {
        MenuService.deleteMenu(menu_ID)
          .then((response) => {
            getAllMenu();
          })
          .catch((error) => {
            console.log(error);
          });
      };

    useEffect(() => {

      getAllMenu();

      }, []);


      const viewMenu = (menu_ID) => {
        navigate("/viewMenu/" + menu_ID);
      };
    
      const editMenu = (menu_ID) => {
        navigate("/update-Menu/" + menu_ID);
      };
    
      const addMenu = () => {
        navigate("/addMenu");
      };
    
      const addMenuType = () => {
        navigate("/addMenuType");
      };

      const editStockMenu = (menu_ID) => {
        navigate("/addStockMenu/"+menu_ID);
      }

      const filterMenu = menuList.filter((menuList) => {
        return menuList.typeMenu_ID.typeMenu_Name
          .toLowerCase()
          .includes(search.toLowerCase());
      });



  return (
    <div className="container">
      <h2 className="text-center">Menu List</h2>
      <div className="">
        <button className="btn btn-primary mr-2 " style={{margin:5}} onClick={addMenu}>
          {" "}
          Add Menu
        </button>
        <button className="btn btn-primary mr-2 " style={{margin:5}} onClick={addMenuType}>
          {" "}
          Add MenuType
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
        <table className="table table-striped table-bordered ">
          <thead>
            <tr>
              <th> Menu ID </th>
              <th> Menu Picture </th>
              <th> Menu Name </th>
              <th> Menu Price </th>
              <th> Menu Qty </th>
              <th> Menu Cost </th>
              <th> Menu Status </th>
              <th> Menu Type </th>
              <th> Menu TimeStamp </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {filterMenu.map((menus) => (
              <tr key={menus.menu_ID}>
                <td>{menus.menu_ID}</td>
                <td width="100" >
                <img src={pic+menus.menu_Pic} alt="img" width="80" height="70" />
                </td>
                <td>{menus.menu_Name}</td>
                <td>{menus.menu_Price}</td>
                <td>{menus.menu_Qty}</td>
                <td>{menus.menu_Cost}</td>
                <td>{menus.menu_Status}</td>
                <td>{menus.typeMenu_ID.typeMenu_Name}</td>
                <td>{menus.menu_TimeStamp}</td>
                <td>
                
                  <button
                    onClick={() => editMenu(menus.menu_ID)}
                    className="btn btn-info"
                  >
                    Update{" "}
                  </button>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => deleteMenu(menus.menu_ID)}
                    className="btn btn-danger"
                  >
                    Delete{" "}
                  </button>
             
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => viewMenu(menus.menu_ID)}
                    className="btn btn-info"
                  >
                    View{" "}
                  </button>

                  <button
                    style={{ marginTop: "5px" }}
                    onClick={() => editStockMenu(menus.menu_ID)}
                    className="btn btn-info"
                  >
                    Edit{" "}
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

export default ListMenuComponent;