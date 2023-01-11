import React from 'react'

const HeaderComponent = () => {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href='/stock' className='navbar-brand'>System Management</a></div>    
                    <div><a href="/stock" className="navbar-brand">Stock</a></div>
                    <div><a href='/menu' className='navbar-brand'>Menu</a></div> 
                    <div><a href='/stockMenu' className='navbar-brand'>StockMenu</a></div>
                    <div><a href='/TotalOrder' className='navbar-brand'>TaotalOrder</a></div>
                    <div><a href='/table' className='navbar-brand'>Table</a></div>
                    <div><a href='/employee' className='navbar-brand'>Employee</a></div>
                    <div><a href='/Kitchen' className='navbar-brand'>Kitchen</a></div>
                    <div><a href='/promotion' className='navbar-brand'>Promotion</a></div>
                    </nav>
                </header>
            </div>
        )
}

export default HeaderComponent

// import React, { useState } from 'react';
// import {
//     FaTh,
//     FaBars,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList
// }from "react-icons/fa";
// import { NavLink } from 'react-router-dom';


// const HeaderComponent = ({children}) => {
//     const[isOpen ,setIsOpen] = useState(false);
//     const toggle = () => setIsOpen (!isOpen);
//     const menuItem=[
//         {
//             path:"/",
//             name:"Dashboard",
//             icon:<FaTh/>
//         },
//         {
//             path:"/about",
//             name:"About",
//             icon:<FaUserAlt/>
//         },
//         {
//             path:"/analytics",
//             name:"Analytics",
//             icon:<FaRegChartBar/>
//         },
//         {
//             path:"/comment",
//             name:"Comment",
//             icon:<FaCommentAlt/>
//         },
//         {
//             path:"/product",
//             name:"Product",
//             icon:<FaShoppingBag/>
//         },
//         {
//             path:"/productList",
//             name:"Product List",
//             icon:<FaThList/>
//         }
//     ]
//     return (
//         <div className="container">
//            <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
//                <div className="top_section">
//                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
//                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
//                        <FaBars onClick={toggle}/>
//                    </div>
//                </div>
//                {
//                    menuItem.map((item, index)=>(
//                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
//                            <div className="icon">{item.icon}</div>
//                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
//                        </NavLink>
//                    ))
//                }
//            </div>
//            <main>{children}</main>
//         </div>
//     );
// };

// export default HeaderComponent;
