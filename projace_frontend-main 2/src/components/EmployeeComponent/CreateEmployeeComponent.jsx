import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import RoleService from "../../services/RoleService";
import axios from "axios";
import EmployeeService from "../../services/EmployeeService";
import { Button, Spinner } from "react-bootstrap";

const CreateEmployeeComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, SetImage] = useState([]);
  const [ImageUpload, SetImageUpload] = useState([]);
  const [name_Emp, setName] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [line, setLine] = useState([]);
  const [role_id, setRole_id] = useState([]);
  const [idRole, setRole] = useState([]);
  const Navigate = useNavigate();
  const [preview, setPreView] = useState([]);
  const [previewURL, setPreViewURL] = useState([]);
  const { id } = useParams();
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const url = "http://localhost:8080/file-upload-imageEmployees";
  let pic = "http://localhost:8080/menu/getimagesEmp/";

  const handleChange = (e) => {
    console.log("name", e.target.files[0].name);
    console.log(e.target.files);

    setPreView([...e.target.files]);

    let img = [...ImageUpload];
    for (var i = 0; i < e.target.files.length; i++) {
      img.push(e.target.files[i]);
    }
    SetImageUpload(img);
  };

  function handleClick(e) {
    setIsLoading(true);
    // perform some action here, then set isLoading back to false
    setTimeout(() => {
      e.preventDefault();

      var formData = new FormData();
      formData.append("file", ImageUpload[ImageUpload.length - 1]);

      axios
        .post(url, formData)
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => {
          console.log("Error", e);
        });

      if (id) {
        if (ImageUpload.length >= 1) {
          const employee = {
            name_Emp,
            username,
            password,
            phone,
            address,
            line,
            idRole: {
              idRole,
            },
          };
          EmployeeService.updateEmployee(id, employee)
            .then((response) => {
              console.log(response.data);
              console.log("ssssssssssssssssssssssssss");
              Navigate("/employee");
            })
            .catch((error) => {
              console.log(employee);
              // console.log(employee.idRole)
              console.log(error);
            });
        } else {
          const employee = {
            name_Emp,
            username,
            password,
            phone,
            address,
            image: image,
            line,
            idRole: {
              idRole,
            },
          };
          EmployeeService.updateEmployee(id, employee)
            .then((response) => {
              console.log(response.data);
              Navigate("/employee");
            })
            .catch((error) => {
              console.log(employee);
              // console.log(employee.idRole)
              console.log(error);
            });
        }
      } else {
        const employee = {
          name_Emp,
          username,
          password,
          phone,
          address,
          line,
          idRole: {
            idRole,
          },
        };
        EmployeeService.createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            Navigate("/employee");
          })
          .catch((error) => {
            console.log(employee);
            // console.log(employee.idRole)
            console.log(error);
          });
      }
      Navigate("/employee");
      // perform some action here
      setIsLoading(false);
    }, 500);
  }

  const getEmployeeRoles = () => {
    RoleService.getAllRoles().then((response) => {
      setRole(response.data[0].idRole);
      setRole_id(response.data);
    });
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        console.log("Role = ", response.data);
        setName(response.data.name_Emp);
        setUsername(response.data.username);
        setPassword(response.data.password);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setLine(response.data.line);
        SetImage(response.data.image);
        setRole(response.data.idRole.idRole);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(formErrors);
    getEmployeeRoles();

    if (preview.length < 1) return;
    const newPreviewURL = [];

    preview.forEach((pre) => newPreviewURL.push(URL.createObjectURL(pre)));
    setPreViewURL(newPreviewURL);
  }, [preview]);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  const Updateimg = () => {
    if (id) {
      return (
        <div className="form-group mb-2">
          <label className="form-label"> Original : </label>
          <img
            src={pic + image}
            width="170"
            height="170"
            className="img-thumbnail"
          />
        </div>
      );
    }
  };

  const Newimage = () => {
    if (id) {
      return <span>New </span>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form onSubmit={handleClick}>
                <div className="form-group mb-2">
                  <select
                    className="custom-select"
                    style={{ width: "300px", marginLeft: "10px" }}
                    id="idRole"
                    name="idRole"
                    value={idRole}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {role_id.map((role_id, index) => (
                      <option key={index} value={role_id.idRole}>
                        {role_id.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Name :</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="Name"
                    className="form-control"
                    value={name_Emp}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Username:</label>
                  <input
                    type="text"
                    placeholder="Username"
                    name="Username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Password :</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Phone :</label>
                  <input
                    placeholder="Phone"
                    name="Phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Address :</label>
                  <input
                    placeholder="Address"
                    name="Address"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Line :</label>
                  <input
                    placeholder="Line"
                    name="Line"
                    className="form-control"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                  ></input>
                </div>

                {Updateimg()}

                <div className="form-group mb-2">
                  <label className="form-label"> {Newimage()}Picture :</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    placeholder="Picture"
                    name="image"
                    className="form-control"
                    // value={image}
                    onChange={handleChange}
                    // onChange={(e) => handleChange(e)
                  ></input>
                </div>

                <div className="form-group mb-3">
                  {previewURL.map((ingSrc) => (
                    <img
                      src={ingSrc}
                      width="170"
                      height="170"
                      className="img-thumbnail"
                    />
                  ))}
                </div>

                <Button
                  disabled={isLoading}
                  variant="btn btn-outline-success"
                  onClick={handleClick}
                >
                  {isLoading ? "Loading..." : "Save"}
                  {isLoading && <Spinner animation="border" size="sm" />}
                </Button>
                <Link to="/employee" className="btn btn-outline-danger mx-2">
                  {" "}
                  Cancel{" "}
                </Link>
                <button className="fluid ui button blue">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
