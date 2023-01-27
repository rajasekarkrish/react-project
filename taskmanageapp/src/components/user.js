import { Alert, Button, Checkbox, Form, Input, Select } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useSelect } from "react";
import AppTable from "./Table/AppTable";
import swal from "sweetalert";
import { EditFilled, EditOutlined }  from '@ant-design/icons';
import Editicon from "../image/edit.svg";
import { useForm } from "react-hook-form";

// const { Option } = Select;

const User = () => {
  const initialState = {
    company_id: "",
    department_id: "",
    confirm_password:"",
    assign_to_id: "",
    is_active: 0,
    is_staff: 0,
  };

  const [status, setStatus] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const [values, setValues] = useState(initialState);
  const [value, setValue] = useState([]);
  const [tableValue, setTable] = useState([]);
  const [id, setId] = useState(null);
  const [error, setError] = useState(false);
  const [companyList, setCompanyList] = useState([{ id: "", name: "" }]);
  const [departmentList, setDepartmentList] = useState([{ id: "", name: "" }]);
  const [userList, setUserList] = useState([{ id: "", name: "" }]);
  const Option = Select.Option;
  const [user, setUser] = useState([{ id: "", user_name: "" }]);
  const { register,  formState: { errors } } = useForm();

  //api call for consuming restapi
  const SignUpApi = async (data) => {
    try {
      const result = await axios.post("/user/register/", data);
      console.log(result);
      if (result.status === 201) {
        setStatus("user created successfully");
        swal({
          text: "user created successfully...",
        });
        setValues(initialState)
        userApi();
        userListApi()
        form.resetFields();
        
      }
    } catch (error) {
      console.log(error);
      setErrorData("user already exist");
      swal({
        text: "user already exist...",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  const [form] = Form.useForm();

  const userApi = async () => {
    const result = await axios.get("/userlist");
    try {
      console.log(result.data.data);

      //setTable(result.data.data)

      const newData = [];
      result.data.data.map((ele, index) => {
        newData.push({ ...ele, sno: index + 1 });
      });
      setTable(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const userUpdateApi = async (data, id) => {
    try {
      const result = await axios.put(`/userupdate/${id}`, data);
      console.log(result);
      setId(null);
      userApi();
      setValues(initialState)
    } catch (error) {
      console.log(error);
    }
  };
  const assignApi = async () => {
    
    try {
      const result = await axios.get("/userlist");
      console.log(result.data.data);
      setUser(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const companylistApi = async () => {
    try {
      const result = await axios.get("/company");
      console.log(result);
      setCompanyList(result.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const departmentListApi = async (id) => {
    try {
      const result = await axios.get(`/get_dept/${id}`);

      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.dept_name });
      });

      setDepartmentList(newData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(departmentList);
  const userListApi = async () => {
    try {
      const result = await axios.get("/users");

      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.user_name });
      });

      setUserList(newData);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userApi();
    assignApi();
    companylistApi();
    userListApi();
  }, [1]);

  const inputs = [
    {
      id: 1452,
      type: "email",
      value: values.email || "",
      name: "email",
      label: "Email",
      col: 4,
      required: true,
    },
    {
      id: 17521,
      type: "text",
      value: values.user_name || "",
      name: "user_name",
      label: "Name",
      col: 4,
      required: true,
    },
    {
      id: 85245,
      type: "password",
      value: values.password || "",
      name: "password",
      label: "Password",
      col: 4,
      required: true,
    },
    {
      id: 17521,
      type: "password",
      value: values.confirm_password || "",
      name: "confirm_password",
      label: "Confirm Password",
      col: 4,
      required: true,
    },
    {
      id: 1,
      type: "select",
      value: values.company_id || "",
      name: "company_id",
      label: "Company",
      options: companyList,
      col: 4,
      required: true,
    },
    {
      id: 2,
      type: "select",
      value: values.department_id || "",
      name: "department_id",
      label: "Department",
      options: departmentList,
      col: 4,
      required: true,
    },
    {
      id: 3,
      type: "select",
      value: values.assign_to_id || "",
      name: "assign_to_id",
      label: "Reporting To",
      options: userList,
      col: 4,
      required: true,
    },
  ];

  const onFinish = (data) => {
    //calling and sending req for create customer
   

    if (id) {
      userUpdateApi({ ...values, ...value }, id);
    } else {
      userApi();
    }
  };

  // const selectHandler = (e) => {
  //  // const { name, value } = e.target;
  //   assignApi(e.target.value);

  // };
  // const onChange = (value) => {
  //   console.log(`selected ${value}`);
  //   //setUser(`selected ${value}`)
  //   setUser(value)

  // };
  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "User Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (value) => {
        return String(value);
      },
    },
    {
      title: "User type",
      dataIndex: "is_staff",
      key: "is_staff",
      render: (value) => {
        return String(value);
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Report To",
      dataIndex: "assign_to",
      key: "assign_to",
    },

    {
      dataIndex: "action",
      title: <>Action</>,
      render: (value, record) => {
        return (
          <>
            <button
              onClick={() => {
                setId(record.id);
                console.log(record.id)
                setValues({
                  ...values,
                 ...record
                });
                
                
              }}
              className="btn btn-sm"
            >
               <img src={Editicon}/>
            </button>
          </>
        );
      },
      key: "action",
    },
  ];

  const selectHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (name === "company_id") {
      departmentListApi(Number(value));
      setValues({ ...values, company_id: value });
    }
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(values.confirm_password===values.password){
      SignUpApi(values);
      if(id){
        userUpdateApi(values, id)
      }
    }
    else{
      alert("Password not matching")
    }
  };
  

  return (
    <>
      <div class="user">
        <div class="row">
          <div class="col-12 bg-white p-3">
            {
              //added custom status alert for user creation
              // status && <Alert message={status} type="success" showIcon />
            }
            {/* {errorData && <Alert message={errorData} type="error" showIcon />} */}

            <form onSubmit={handleSubmit} className="row">
              {inputs.map((input) => (
                <div key={input.id} className={`col-12 col-lg-${input.col}`}>
                  {/* //select  */}
                  {(input.type === "text" ||
                    input.type === "password" ||
                    input.type === "email") && (
                    <>
                      <label for={input.label} className="mt-2 mb-2">
                        {input.label}
                        <span class="text-danger">*</span>
                      </label>
                      <input onChange={(e)=>{setValues({...values,[input.name]:e.target.value})}} className="form-control" {...input} />
                    </>
                  )}
                  {input.type === "select" && (
                    <div key={input.id} className={` ${input.classStyle}`}>
                      <label for={input.label} className="mt-2 mb-2">
                        {input.label}
                        <span class="text-danger">*</span>
                      </label>
                      <select
                        onChange={selectHandler}
                        {...input}
                        className="form-select"
                      >
                        <option value="">{`Select ${input.label}`}</option>
                        {input.options?.map((ele) => {
                          return (
                            <option value={ele.id} key={ele.id}>
                              {ele.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
              ))}
              <div class="col-12 col-lg-4 mt-2 pt-4">
                <Form.Item>
                  <Checkbox
                   checked={values.is_active}
                    name="is_active"
                    onChange={(e) => {
                      setValues({
                        ...values,
                        is_active: e.target.checked ? 1 : 0,
                      });
                    }}
                  >
                    is active
                  </Checkbox>
                  <Checkbox
                   checked={values.is_staff}
                    name="is_staff"
                    onChange={(e) => {
                      setValues({
                        ...values,
                        is_staff: e.target.checked ? 1 : 0,
                      });
                    }}
                  >
                    is staff
                  </Checkbox>
                </Form.Item>
              </div>
              <div class="div">
              <Button className="w-25 me-auto" type="primary" htmlType="submit">
                {id ? "UPDATE" : "ADD"}
              </Button>
              {id && (
                <Button onClick={()=>{setValues(initialState)
                setId(null)}} type="primary" htmlType="reset" className="ms-2 w-25 " danger>
                  
                  Cancel
                </Button>
              )}
              </div>   
             
            </form>
          </div>
        </div>
      </div>
      <div class="">
        <AppTable data={tableValue} columns={columns} />
      </div>
    </>
  );
};

export default User;

