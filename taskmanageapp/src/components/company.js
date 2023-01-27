import { Alert, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "./Table/AppTable";
import swal from "sweetalert";
import { EditFilled, EditOutlined }  from '@ant-design/icons';
import Editicon from "../image/edit.svg";

const Company = () => {
  //   const [status, setStatus] = useState(false);
  //   const [errorData, setErrorData] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [id,setId]=useState(null);
  const [data, setData] = useState([]);

  //company form
  const companyApi = async (data) => {
    try {
      const result = await axios.post(`/company`, data);
      //alert(result.data.data)
      swal({
        text: "company added successfully...",
        icon:"success",
        timer: 1000,
        button:false
      });
      form.resetFields()
      companyApi1();
      
    } catch (error) {
      console.log(error);
    }
  };
  const [form] = Form.useForm();

 
 //company information shown in table
  const companyApi1 = async () => { 
    try 
    { 
    const result = await axios.get(`/company`); 
    const newData=[] 
    result.data.data.map((ele,index)=>
    { 
      newData.push({...ele,sno:index+1})
     })
setDataSource(newData);

} catch (error) { 
  console.log(error); 
} 
}
  
  //Update company form fields
  const comapanyUpdateApi=async (data,id) =>{
    try{
      const result =await axios.put(`/up_comp/${id}`,data)
      console.log(result)
      if(result.status===200){
        form.resetFields()
        setId(null)
      //alert(result.data)
      swal({
        text: "Updated  successfully...",
        icon:"success",
        timer: 1000,
        button:false
      });
      companyApi1();
      }

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    companyApi1();
    
  }, [1]);

  const onFinish = (values) => {
   console.log(values)
    if(id){
      comapanyUpdateApi(values,id)
    }else{
      companyApi(values);

    }
  };

  //console.log(dataSource.length)

  //antd table values
  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company description",
      dataIndex: "company_description",
      key: "company_description",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      dataIndex: "action",
      title: <>Action</>,
      render: (value, record) => {
        return (
          <>
            <button
              onClick={() => {
                setId(record.id)
                form.setFieldsValue(record);
                console.log(record)
              }}
              className="btn btn-sm"
            >
             <img src={Editicon}/> 
            </button>
          </>
        );
      },
      key: "action",
    }
  ];

  // columns.push();

  return (
    <>
      <div class="company m-2 p-2">
        <div class="row">
          <div class="col-12 col-lg">
            {/* {errorData && <Alert message={errorData} type="error" showIcon />} */}
            <Form
              form={form}
              name="basic"
              // layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
              onChange={() => {
                //   setErrorData(false);
              }}
            >
              <div class="row">
                <div class="col-lg-5">
                  <Form.Item
                    label="Company name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Enter company name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div class="col-lg-5">
                  <Form.Item
                    label="Company description"
                    name="company_description"
                    rules={[
                      {
                        required: true,
                        message: "Enter company description",
                      },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </div>
                <div class="col-lg-5">
                  <Form.Item label="Company Address">
                    <Form.Item  name="address"
                    rules={[
                      {
                        required: true,
                        message: "Enter company address",
                      },
                    ]}><Input.TextArea /></Form.Item>
                    <span className="compbutton">
                      <Form.Item >

                <Button type="primary" htmlType="submit">
                  {id ? "UPDATE" :"ADD"}
                </Button>

               {id && <span><Button type="primary" htmlType="button" className="ms-2" danger onClick={()=>{
                form.resetFields()
                setId(null)}}>Cancel</Button></span>}
              </Form.Item>
             </span>

                  </Form.Item>
                </div>
              </div>
     
            </Form>
          </div>
        </div>
      </div>

      <div class="m-2">
        <AppTable data={dataSource || []} columns={columns} />
      </div>
    </>
  );
};

export default Company;




// + <Form.Item label="Field">
// +   <Form.Item name="field" noStyle><Input /></Form.Item> // that will bind input
// +   <span>description</span>
// + </Form.Item>