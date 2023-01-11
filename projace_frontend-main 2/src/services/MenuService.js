import axios from "axios";

const getMenu = () => {
  return axios.get("http://localhost:8080/menu/getMenu");
};

const addMenu = (menu) => {
  console.log(menu);
  return axios.post("http://localhost:8080/menu/addMenu", menu);
};

const getMenuById = (menu_ID) => {
  return axios.get("http://localhost:8080/menu/getMenu/" + menu_ID);
};

const updateMenu = (menu_ID, menu,menu_Pic) => {

 

    menu.menu_Pic = menu_Pic;

  
  return axios.put("http://localhost:8080/menu/updateMenu/" + menu_ID, menu);
};

const deleteMenu = (menu_ID) => {
  return axios.delete("http://localhost:8080/menu/deleteMenu/" + menu_ID);
};

const getMenuType = () => {
    return axios.get("http://localhost:8080/TypeMenu/getTypeMenu");
};

const addMenuType = (typeMenu) => {
    return axios.post("http://localhost:8080/TypeMenu/addTypeMenu",typeMenu);
};


const addPic = (menu_Pic) => {
  return axios.post("http://localhost:8080/file-upload" + menu_Pic);

}


const MenuService = {
  getMenu,
  addMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
  getMenuType,
  addMenuType,
  addPic
};

export default MenuService;
