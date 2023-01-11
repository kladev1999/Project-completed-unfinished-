import axios from "axios";

const getDisPromotion = () => {
    return axios.get("http://localhost:8080/discountPromotion/getDiscount");
}
const getDisPromotionByID = (discount_ID) => {
    return axios.get("http://localhost:8080/discountPromotion/getDiscountByID/" + discount_ID);
}

const AddDiscount = (Discount) => {
    return axios.post("http://localhost:8080/discountPromotion/addDiscount", Discount)
}

const DeleteDiscount = (discount_ID) => {
    return axios.delete("http://localhost:8080/discountPromotion/deleteMenu/" + discount_ID);
}

const UpdateDiscount = (discount_ID, Discount) => {
    return axios.put("http://localhost:8080/discountPromotion/updatePromo/" + discount_ID, Discount)
}

const DisPromotionService = {
    getDisPromotion,
    AddDiscount,
    DeleteDiscount,
    UpdateDiscount,
    getDisPromotionByID
}

export default DisPromotionService;