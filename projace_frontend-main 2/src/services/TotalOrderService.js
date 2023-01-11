import axios from "axios";

const getTotalOrders = () =>{
    return axios.get("http://localhost:8080/totalOrder/getTotalOrder");
}

const addTotalOrder = (totalOrder) =>{
    return axios.post("http://localhost:8080/totalOrder/addTotalOrder",totalOrder);
}

const getTotalOrderById = (totalOrder_ID) =>{
    return axios.get("http://localhost:8080/totalOrder/getTotalOrder/" + totalOrder_ID);
}

const getTotalListOrderById = (totalOrder_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/getListOrderMenu/" + totalOrder_ID);
}
const checkPay = (status)=>{
    return axios.get("http://localhost:8080/totalOrder/checkPay/1");
}
const updateTotalprice = (totalPrice,total_order_id)=>{
    return axios.get("http://localhost:8080/totalOrder/Update_TotalPrice/"+totalPrice+"/"+total_order_id);
}

const updateTotalOrder = (totalOrder_ID, totalOrder)   =>{
    const totalOrderState = {
        totalOrder_ID : totalOrder.totalOrder_ID,
        totalPrice: totalOrder.totalPrice,
        disCount: totalOrder.disCount,
        totalOrder_Status: totalOrder.totalOrder_Status,
        table_ID: {
            table_ID:totalOrder.table_ID,
            table_Zone:totalOrder.table_Zone
        }
      };
    console.log(totalOrderState);
    return axios.put("http://localhost:8080/totalOrder/updateTotalOrder/"+totalOrder_ID,totalOrderState);
}

const deleteTotalOrder = (totalOrder_ID) =>{
    return axios.delete("http://localhost:8080/totalOrder/deleteTotalOrder/"+ totalOrder_ID);
}
const getTable =()=>{
    return axios.get("http://localhost:8080/table/getTable");
}

const totalPrice = (totalPrice,totalOrder_ID)=>{
    return axios.get("http://localhost:8080/totalOrder/totalPrice/"+totalPrice+"/"+totalOrder_ID);
}

const Update_Discount = (discount_id,totalOrder_ID)=>{
    return axios.get("http://localhost:8080/totalOrder/Update_Discount/"+discount_id+"/"+totalOrder_ID);
}
const UpdateStatusPay = (totalOrder_ID)=>{
    return axios.get("http://localhost:8080/totalOrder/UpdateStatusPay/"+totalOrder_ID);
}
const UpdateSlip = (totalOrder_ID)=>{
    return axios.get("http://localhost:8080/totalOrder/UploadSlip/"+totalOrder_ID);
}

const TotalOrderService = {
    getTotalOrders,
    addTotalOrder,
    getTotalOrderById,
    UpdateStatusPay,
    Update_Discount,
    updateTotalOrder,
    deleteTotalOrder,
    UpdateSlip,
    getTable,
    getTotalListOrderById,
    checkPay,
    updateTotalprice,
    totalPrice
};

export default TotalOrderService;
