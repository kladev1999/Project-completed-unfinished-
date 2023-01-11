import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MenuService from '../../services/MenuService';
import './stly/User.css';
import { Container, Row, Col } from "reactstrap";
import Cart from './Cart'
import OrderMenuService from "../../services/OrderMenuService";
import TotalOrderService from '../../services/TotalOrderService';

const DashboardUser = (props) => {
    let pic = "http://localhost:8080/menu/getimages/";
    const { totalOrder_ID, table_ID, compoSite } = useParams();
    const [menuList, setMenuList] = useState([]);
    const [search, searchInput] = useState("");
    const navigate = useNavigate();
    const [typeMenu_ID, setTypeMenu_ID] = useState([]);
    const [M_tatol, setM_tatol] = useState([]);
    const [totalOrder, setTotalOrder] = useState([]);
    const [BaseSeller, setBaseSeller] = useState();

    //const [orderMenu, setOrderMenu] = useState([]);


    const [typeMenu, setTypeMenu] = useState([]);

    // const [orderMenuQty, setOrderMenuQty] = useState([]);
    // const [employee_ID, setEmployee] = useState(1);



    const getMenuType = () => {
        MenuService.getMenuType()
            .then((response) => {
                setTypeMenu(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const getBaseseller = () => {
        OrderMenuService.bestseller().then((respone) => {
            console.log("bestseller = ", respone.data);
            setBaseSeller(respone.data)
        }).catch((e) => {
            console.log(e)
        });
    };

    const getTotalOrder = (totalOrder_ID) => {
        TotalOrderService.getTotalOrderById(totalOrder_ID)
            .then((response) => {
                setTotalOrder(response.data);
                console.log("GetTotal Order = ", response.data);
            }).catch((e) => {
                console.log(e);
            });

        console.log(totalOrder);
    }

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



    useEffect(() => {
        getBaseseller();
        getAllMenu();
        getMenuType();
        getTotalOrder(totalOrder_ID);

        console.log();

    }, [totalOrder_ID]);

    const filterMenu = menuList.filter((menuList) => {
        return menuList.menu_Name
            .toLowerCase()
            .includes(search.toLowerCase());
    });

    const addToCart = (menu_ID, menu_Name, menu_Price, totalOrder_ID) => {

        let menu = [...M_tatol]
        menu.push({
            menu_ID: menu_ID,
            menu_Name: menu_Name,
            menu_Price: menu_Price,
            menu_Qty: 1,
            totalOrder_ID: totalOrder_ID,
            compoSite: compoSite
        })

        function groupBy(arr, property) {
            return arr.reduce(function (memo, x) {
                if (!memo[x[property]]) {
                    memo[x[property]] = [];
                }
                memo[x[property]].push(x);
                return memo;
            }, {});
        }
        const grouped = groupBy(menu, "menu_ID");
        const keys = Object.keys(grouped);
        var output = [];

        keys.forEach(key => {
            //merge using reduce
            const out = grouped[key].reduce((acc, current) => {
                return {
                    menu_ID: menu_ID,
                    menu_Name: menu_Name,
                    menu_Price: acc.menu_Price + current.menu_Price,
                    menu_Qty: acc.menu_Qty + current.menu_Qty,
                    totalOrder_ID: totalOrder_ID,
                    compoSite: compoSite
                }
            });
            output.push(out);
            setM_tatol(output)
        });

    }


    const title = () => {
        if (totalOrder) {
            return <>
                <Cart M_tatol={M_tatol} />
                <h3 className="text-center">โต๊ะที่ {table_ID}</h3>
            </>

        } else {

            return <h3 className="text-center">รายการทั้งหมด</h3>

        }
    }



    return (
        <section>
            {
                title()
            }
            <Container>

                <Row>
                    <Col lg="12">
                        <div className="row">
                            <div className="col-9">

                                {menuList.length === 0 ? (
                                    <div>
                                        <br></br>
                                        <h2 className="text-center" style={{ color: "red" }}>ไม่มีการสั่งอาหาร</h2>
                                    </div>
                                ) : (
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <Row lg="4" md="4" sm="4" xs="12" className="md-4">
                                                {filterMenu.map((menus, index) => (
                                                    <div className="product__item">
                                                        <div className="product__img">
                                                            <img src={pic + menus.menu_Pic} alt="product-img" width="150" height="135" />
                                                        </div>
                                                        <div className="product__content">
                                                            <h5>
                                                                <Link to={`/viewMenu/` + menus.menu_ID}>{menus.menu_Name}</Link>
                                                            </h5>
                                                            <div className=" d-flex align-items-center justify-content-between ">
                                                                <span className="product__price">ราคา {menus.menu_Price} บาท</span>
                                                                <button className="addTOCart__btn" onClick={() => addToCart(menus.menu_ID, menus.menu_Name, menus.menu_Price, totalOrder_ID)}>
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>


                                                    </div>


                                                ))}
                                            </Row>
                                        </li>
                                    </ul>

                                )}
                            </div>

                            <div className="col-3">
                            <div
                                    className="card overflow-auto"
                                    style={{ width: "150%", height: "450px" }}
                                >
                                    <div
                                        className="card-header"
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <h5>
                                            <b>เมนูแนะนำ / ขายดี</b>
                                        </h5>
                                        
                                        <div
                                            style={{ display: "flex", justifyContent: "center" }}
                                        ></div>
                                    </div>
                                    
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <table className="table table-bordered ">
                                                {BaseSeller?.map((keyName, i) => (
                                                    <thead>
                                                        <td width="180" >
                                                            <img src={pic + keyName[2]} alt="img" width="90" height="90" />
                                                        </td>
                                                        <th>
                                                            {keyName[1]}
                                                        </th>
                                                    </thead>
                                                ))}
                                            </table>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    );
};

export default DashboardUser


