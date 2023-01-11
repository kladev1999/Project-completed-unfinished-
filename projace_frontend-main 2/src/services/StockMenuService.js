import axios from "axios";


const getStockMenu = () => {
    return axios.get("http://localhost:8080/stock_menu/getStockMenu");
}

const addStockMenu = (stock_menu) => {
    console.log(stock_menu);
    return axios.post("http://localhost:8080/stock_menu/addStockMenu",stock_menu);
}

const updateStockMenu = (stockMenu_ID,stock_menu) => {
    return axios.put("http://localhost:8080/stock_menu/updateStockMenu/"+stockMenu_ID,stock_menu);
}

const deleteStockMenu = (stockMenu_ID) => {
    return axios.delete("http://localhost:8080/stock_menu/deleteStockMenu/"+stockMenu_ID);
}

const StockMenuService = {
    getStockMenu,
    addStockMenu,
    updateStockMenu,
    deleteStockMenu
}

export default StockMenuService;