import axios from "axios";

const getTable = () => {
  return axios.get("http://localhost:8080/table/getTable");
};

const addTable = (table) => {
  return axios.post("http://localhost:8080/table/addTable", table);
};

const MixTable = (table_ID) => {
  return axios.get("http://localhost:8080/totalOrder/getMixTable/"+ table_ID);
};

const getTableById = (table_ID) => {
  return axios.get("http://localhost:8080/table/getTable/" + table_ID);
};

const updateTable = (table_ID, table) => {
  return axios.put("http://localhost:8080/table/updateTable/" + table_ID, table);
};

const deleteTable = (table_ID) => {
  return axios.delete("http://localhost:8080/table/deleteTable/" + table_ID);
};

const findTable = () =>{
  return  axios.get("http://localhost:8080/totalOrder/getTableIntotal");
};

const getMoveTable = () => {
  return  axios.get("http://localhost:8080/table/getmoveTable");
}

const MoveTable = (table,totalOrder_ID) =>{
  return axios.get("http://localhost:8080/table/moveTable/" + table + "/" + totalOrder_ID);
}

const TableService = {
  getTable,
  addTable,
  MixTable,
  getTableById,
  getMoveTable,
  updateTable,
  deleteTable,
  MoveTable,
  findTable
};

export default TableService;