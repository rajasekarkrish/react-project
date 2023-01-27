import axios from "axios";
import { Button, Checkbox, Form, Input,Table } from "antd";
import swal from "sweetalert";
import React, { useState, useEffect } from "react";
import AppTable from "./Table/AppTable";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import Editicon from "../image/edit.svg";


export default function Category() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [id,setId]=useState(null);

  const frequencyApi = async (data) => {
    try {
      const result = await axios.post(`/frequency`, data);
      console.log(result.data);
      frequency1Api()
      //alert(result.data.data);
      swal({
        text: "frequency added successfully...",
      });
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };



const frequency1Api=async ()=>{
  try{
    const result = await axios.get(`/frequency`);
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

const frequencyUpdateApi=async (data,id) =>{
  try{
    const result =await axios.put(`/frequency/${id}`,data)
    console.log(result)
    if(result.status===200){
      form.resetFields()
      setId(null)
    //alert(result.data)
    swal({
      text: "Updated  successfully...",
    });
    frequency1Api();
    }

  }catch(error){
    console.log(error)
  }
}


useEffect(() => {
  frequency1Api();

}, [1]);


const columns = [
  {
    title:'S.NO',
    dataIndex:'sno',
    key:'sno',
  },
  {
    title: 'Category Name',
    dataIndex:'activityname',
    key: 'activityname',
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
      frequencyUpdateApi(values,id)
    }else{
      frequencyApi(values)
    }
    
  };
  return (
    <>
      <div class="frequency m-2">
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
            label="Frequency"
            name="activityname"
            rules={[
              {
                required: true,
                message: "Enter Frequency",
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
        <AppTable data={dataSource || []} columns={columns} size="small" />
      </div>

    </>
  );
}
