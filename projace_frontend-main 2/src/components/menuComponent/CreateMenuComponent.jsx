import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import axios from "axios";
import { Button, Spinner } from 'react-bootstrap';

const CreateMenuComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [menu_Name, setmenu_Name] = useState([]);
  const [menu_Price, setmenu_Price] = useState([]);
  const [menu_Qty, setmenu_Qty] = useState([]);
  const [menu_Cost, setmenu_Cost] = useState([]);
  const [menu_Status, setmenu_Status] = useState([]);
  const [menu_Pic, setmenu_Pic] = useState([]);
  const [typeMenu_ID, setTypeMenu_ID] = useState([]);
  const [preview, setPreView] = useState([]);
  const [previewURL, setPreViewURL] = useState([]);


  const [typeMenu, setTypeMenu] = useState([]);
  const url = "http://localhost:8080/file-upload";

  const handleChange = (e) => {

    console.log("name", e.target.files[0].name)
    setPreView([...e.target.files])
    let img = [...menu_Pic];
    for (var i = 0; i < e.target.files.length; i++) {
      img.push(e.target.files[i]);
    }
    setmenu_Pic(img);
  }
  function handleClick(e) {

    setIsLoading(true);

    setTimeout(() =>{
      e.preventDefault();

    var formData = new FormData();
    formData.append("file", menu_Pic[menu_Pic.length - 1]);

    const menu = {
      menu_Name,
      menu_Price,
      menu_Qty,
      menu_Cost,
      menu_Status,
      typeMenu_ID: {
        typeMenu_ID
      }
    };

    axios.post(url, formData).then((res) => {
      console.log('res', res);
    }).catch(e => {
      console.log('Error', e);
    })


    console.log(typeMenu_ID);
    MenuService.addMenu(menu)
      .then((response) => {

        navigate("/menu");
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });




      setIsLoading(false);
    },500)

  }


  const getMenuType = () => {
    MenuService.getMenuType()
      .then((response) => {
        setTypeMenu(response.data);
        setTypeMenu_ID(response.data[0].typeMenu_ID)
        console.log("type = ", response.data[0].typeMenu_ID)
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMenuType();
    if (preview.length < 1) return;
    const newPreviewURL = [];

    preview.forEach(pre => newPreviewURL.push(URL.createObjectURL(pre)))
    setPreViewURL(newPreviewURL);
  }, [preview]);

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div>
                  <label className="form-label"> MenuType Name</label>
                  <select
                    className="custom-select"
                    style={{ width: "200px", marginLeft: "10px" }}
                    name="typeMenu_ID"
                    onChange={(e) => setTypeMenu_ID(e.target.value)}
                  >
                    {typeMenu.map((typeMenu, index) => (
                      <option key={index} value={typeMenu.typeMenu_ID}>
                        {typeMenu.typeMenu_Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Menu Name</label>
                  <input
                    type="text"
                    placeholder="Enter Menu Name"
                    name="menu_Name"
                    className="form-control"
                    value={menu_Name}
                    onChange={(e) => setmenu_Name(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Menu Price</label>
                  <input
                    type="text"
                    placeholder="Enter Menu Price"
                    name="menu_Price"
                    className="form-control"
                    value={menu_Price}
                    onChange={(e) => setmenu_Price(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Menu Qty</label>
                  <input
                    type="text"
                    placeholder="Enter Menu Qty"
                    name="menu_Price"
                    className="form-control"
                    value={menu_Qty}
                    onChange={(e) => setmenu_Qty(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Menu Cost</label>
                  <input
                    type="text"
                    placeholder="Enter Menu Cost"
                    name="menu_Cost"
                    className="form-control"
                    value={menu_Cost}
                    onChange={(e) => setmenu_Cost(e.target.value)}
                  ></input>
                </div>


                <div className="form-group mb-2">
                  <label className="form-label"> Menu Status</label>
                  <input
                    type="text"
                    placeholder="Enter Menu Status"
                    name="menu_Status"
                    className="form-control"
                    value={menu_Status}
                    onChange={(e) => setmenu_Status(e.target.value)}
                  ></input>
                </div>



                <div className="form-group mb-2">
                  <label className="form-label"> Menu Picture</label>
                  <input
                    type="file"
                    placeholder="Enter Menu Picture"
                    name="menu_Pic"
                    className="form-control"
                    // value={menu_Pic}
                    onChange={handleChange}
                  // onChange={(e) => handleChange(e)

                  ></input>
                </div>

                <div className="form-group mb-3">

                  {
                    previewURL.map((ingSrc) => (

                      <img src={ingSrc} width="170" height="170" className="img-thumbnail" />
                    ))
                  }
                </div>

                <Button disabled={isLoading} variant="btn btn-outline-success" onClick={handleClick}>
                  {isLoading ? 'Loading...' : 'Save'}
                  {isLoading && <Spinner animation="border" size="sm" />}
                </Button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/menu")}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMenuComponent;
