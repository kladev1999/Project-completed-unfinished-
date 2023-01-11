import axios from "axios";

const getOrderMenu = () =>{
    return axios.get("http://localhost:8080/OrderMenu/getOrderMenu");
}
const addOrderMenu = (OrderMenu) =>{
    console.log("addOrderMenu",OrderMenu);
    return axios.post("http://localhost:8080/OrderMenu/addOrderMenu",OrderMenu);
}

const kitchen = () =>{
    return axios.get("http://localhost:8080/OrderMenu/kitchenShow");
}


const addOrderMenus = (OrderMenus) =>{

    let oor = OrderMenus;

        console.log(OrderMenus);
    return axios.post("http://localhost:8080/OrderMenu/addOrderMenus",oor);
}

const getOrderMenuByID = (OrderMenu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/getOrderMenu/"+ OrderMenu_ID);
}
const updateOrderMenu = (OrderMenu_ID,OrderMenu) =>{
    return axios.put("http://localhost:8080/OrderMenu/updateOrderMenu/"+ OrderMenu_ID,OrderMenu);
}

const deleteOrderMenu = (OrderMenu_ID) =>{
    return axios.delete("http://localhost:8080/OrderMenu/deleteOrderMenu/"+ OrderMenu_ID);
}


// LoopStockCut
const loopStockCut = (menu_ID) =>{
    return axios.get("http://localhost:8080/cutLoopStock/"+menu_ID);
}

// หาวัตถุดิบพร้อมเพิ่มสต๊อก
const addLoopStock = (menu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/addLoppStock/"+menu_ID);
}
//เมนู 5 อันดับแรก
const bestseller = () =>{
    return axios.get("http://localhost:8080/OrderMenu/getbestseller");
}

const updateStatus = (orderMenu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/status/"+ orderMenu_ID);
}

const cancelStatus = (orderMenu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/statusCancel/"+ orderMenu_ID);
}

const mergeTable = (totalOrder_ID,pointTable) =>{
    return axios.get("http://localhost:8080/OrderMenu/mergeTable/"+totalOrder_ID+"/"+pointTable);
}



const OrderMenuService = {
    getOrderMenu,
    addOrderMenu,
    addOrderMenus,
    getOrderMenuByID,
    deleteOrderMenu,
    mergeTable,
    updateOrderMenu,
    kitchen,
    loopStockCut,
    addLoopStock,
    bestseller,
    updateStatus,
    mergeTable,
    cancelStatus
}

export default OrderMenuService;

