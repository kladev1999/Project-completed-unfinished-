import axios from "axios";

const STOCK_API_BASE_URL = "http://localhost:8080/stock";
const STOCKTYPE_API_BASE_URL = "http://localhost:8080/stockType";

const getStockType = () => {
  return axios.get(STOCKTYPE_API_BASE_URL + "/getStockType");
};
const addStockType = (stockType) => {
  return axios.post(STOCKTYPE_API_BASE_URL + "/addStockType",stockType);
};
const getStockTypeById = (stockType_ID) => {
  return axios.get(
    "http://localhost:8080/stockType/getStockType/" + stockType_ID
  );
};
const updateStockType = (stockType, stockType_ID) => {
  return axios.put(
    STOCKTYPE_API_BASE_URL + "/updateStockType/" + stockType_ID,
    stockType
  );
};
const deleteStockType = (stockType_ID) => {
  return axios.delete(
    STOCKTYPE_API_BASE_URL + "/deleteStockType/" + stockType_ID
  );
};

const getStock = () => {
  return axios.get(STOCK_API_BASE_URL + "/getStock");
};

const addStock = (stock) => {
  console.log(stock);
  return axios.post("http://localhost:8080/stock/addStock",stock);
};

const getStockById = (stock_ID) => {
  return axios.get("http://localhost:8080/stock/getStock/" + stock_ID);
};

const updateStock = (stock_ID,stock) => {
  return axios.put(STOCK_API_BASE_URL + "/updateStock/"+stock_ID,stock);
};

const deleteStock = (stock_ID) => {
  return axios.delete(STOCK_API_BASE_URL + "/deleteStock/" + stock_ID);
};

const StockService = {
  getStock,
  addStock,
  getStockById,
  updateStock,
  deleteStock,
  getStockType,
  addStockType,
  getStockTypeById,
  updateStockType,
  deleteStockType,
};

export default StockService;
