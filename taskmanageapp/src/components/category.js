import axios from "axios";
import { Button, Checkbox, Form, Input } from "antd";
import swal from "sweetalert";
import React, { useState, useEffect } from "react";
import AppTable from "./Table/AppTable";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import Editicon from "../image/edit.svg";


export default function Category() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [id,setId]=useState(null);

  const categoryApi = async (data) => {
    try {
      const result = await axios.post(`/category`, data);
      console.log(result.data);
      //alert(result.data.data);
      swal({
        text: "category added successfully...",
      });
      category1Api();
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

const category1Api=async ()=>{
  try{
    const result = await axios.get(`/category`);
    console.log(result.data.data)
    const newData=[] 
    result.data.data.map((ele,index)=>
    { 
      newData.push({...ele,sno:index+1})
     })
     setDataSource(newData);
  }catch(error){
    console.log(error)
  }
}


const categoryUpdateApi=async (data,id) =>{
  try{
    const result =await axios.put(`/category/${id}`,data)
    console.log(result)
    if(result.status===200){
      form.resetFields()
      setId(null)
    //alert(result.data)
    swal({
      text: "Updated  successfully...",
    });
    category1Api();
    }

  }catch(error){
    console.log(error)
  }
}

useEffect(() => {
  category1Api();

}, [1]);


const columns = [
  {
    title:'S.NO',
    dataIndex:'sno',
    key:'sno',
  },
  {
    title: 'Category Name',
    dataIndex:'categoryname',
    key: 'categoryname',
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
  },
  
 
];


  const onFinish = (values) => {
    if(id){
      categoryUpdateApi(values,id)
    }else{
      categoryApi(values);

    }
      
    
    
  };
  return (
    <>
      <div class="category m-2 p-2">
      <div class="row">
          <div class="col-12 col-lg-6">
          <Form
        form={form}
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Category name"
            name="categoryname"
            rules={[
              {
                required: true,
                message: "Enter category name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>
             <Form.Item>
                <Button type="primary" htmlType="submit">
                  {id ? "UPDATE" :"ADD"}
                </Button>
               {id && <Button type="primary" htmlType="button" className="ms-2" danger onClick={()=>{
                form.resetFields()
                setId(null)}}>Cancel</Button>}
              </Form.Item>
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
}
