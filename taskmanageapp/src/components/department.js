import React, { useState, useEffect } from "react";
import axios from "axios";
import AppTable from "./Table/AppTable";
import swal from "sweetalert";
import Loader from "./loader/Loader"
import { Alert, Button, Checkbox, Form, Input, Select } from "antd";
import Editicon from "../image/edit.svg";


export default function Department() {
  const initialState = {
    dept_name: "",
    company_id: "",
  };
  const [values, setValues] = useState(initialState);
  const [companyList, setCompanyList] = useState([{ id: "", name: "" }]);
  const [dataSource,setDataSource]=useState([]);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [validation,setValidation]=useState([]);

  //company list for company select field
  const companylistApi = async () => {
    try {
      const result = await axios.get("/company");
      setCompanyList(result.data?.data);

    } catch (error) {
      console.log(error);
    }
  };

  //department information show in table
  const departmentListApi1 = async () => {
    try {
      //setLoading(true)
      const result = await axios.get("/depts");
      console.log(result.data.data)
      //setDataSource(result.data?.data);
      const newData=[] 
      result.data.data.map((ele,index)=>
      { 
        newData.push({...ele,sno:index+1})
       })
  setDataSource(newData);
  //setLoading(false)
      
    } catch (error) {}
  };

  const departmentListApi = async (data) => {
    try {
      const result = await axios.post("/department", data);
      departmentListApi1()
      if (result.status===200)
      {
        setValues(initialState);
        swal({
          text: "Department added successfully...",
          icon:"success",
          timer: 1000,
          button:false
          
        });
      }
      console.log(result)
    } catch (error) {}
  };


  const departmentUpdateApi = async (data, id) => {
    try {
      const result = await axios.put(`/up_dept/${id}`, data);
      console.log(result);
      setId(null);
      setValues(initialState)
      swal({
        text: "Updated  successfully...",
        icon:"success",
        timer: 1000,
        button:false
      });
      departmentListApi1()
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(values.company_id || values.dept_name==="")
    // {
    //   alert("field cannot be null")
    // }
    if(id){
      departmentUpdateApi(values,id)
      }
    else{
      departmentListApi(values);
      
    }
  };

  useEffect(() => {
    companylistApi();
    //departmentListApi();
    departmentListApi1();
  
  }, [1]);

  const inputs = [
    {
      id: 1,
      type: "text",
      value: values.dept_name || "",
      name: "dept_name",
      label: "Department Name",
      col: 6,
      required: true,
      error:'',
    },

    {
      id: 2,
      type: "select",
      value: values.company_id || "",
      name: "company_id",
      label: "Company",
      options: companyList,
      col: 6,
      required: true,
      error:'',
    },
    
  ];

  

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const error=''
    if (!name) {
      error = `${name} field cannot be empty`
      console.log(error)
    }
    setValues({ ...values, [name]: value });
  };
  const selectHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  console.log(values);
  

  const columns = [
    {
      title:'S.NO',
      dataIndex:'sno',
      key:'sno',
    },
    {
      title: 'Department Name',
      dataIndex: 'dept_name',
      key: 'dept_name',
    },
    {
      title: 'Company',
      dataIndex: 'name',
      key: 'name',
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



  return (
    <>
    {/* {loading && <Loader />} */}
      <div className="department">
        <form onSubmit={handleSubmit} data-parsley-validate="">
          <div class="row">
            {inputs.map((ele) => {
              return (
                <div class="col-12 col-lg-5">
                  {ele.type === "text" && (
                    <div key={ele.id}>
                      <label for={ele.label} className="mb-2">
                        {ele.label}
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        placeholder={`Enter ${ele.label}`}
                        onChange={inputHandler}
                        {...ele}
                        className="form-control"
                      />
                       
                    </div>
                  )}

                  {ele.type === "select" && (
                    <div key={ele.id} className={` ${ele.classStyle}`}>
                      <label for={ele.label} className="mb-2">
                        {ele.label}
                        <span class="text-danger">*</span>
                      </label>
                      <select
                        onChange={selectHandler}
                        {...ele}
                        className="form-select"
                      >
                        <option value="">{`Select ${ele.label}`}</option>
                        {ele.options?.map((ele) => {
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
              );
            })}
            <div class="div">
              <Button className="w-10 me-auto mt-3" type="primary" htmlType="submit">
                {id ? "UPDATE" : "ADD"}
              </Button>

              {id && (
                <Button onClick={()=>{setValues(initialState)
                setId(null)}} type="primary" htmlType="reset" className="ms-2 w-10 " danger>
                  
                  Cancel
                </Button>
              )}
              </div>   
          </div>
        </form>
      </div>
      

    <div class="m-1">

   <AppTable data={dataSource} columns={columns}/>
   </div>

    </>
  );
}
