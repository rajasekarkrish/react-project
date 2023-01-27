import { Alert, Button, Checkbox, Form, Input,Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "./Table/AppTable";
import swal from "sweetalert";
import { EditFilled, EditOutlined }  from '@ant-design/icons';
import Editicon from "../image/edit.svg";

const { Option } = Select;

export default function Dept(){
    const [companyList, setCompanyList] = useState([{ id: "", name: "" }]);
    const [form] = Form.useForm();
    const companylistApi = async () => {
        try {
          const result = await axios.get("/company");
          setCompanyList(result.data?.data);
    
        } catch (error) {
          console.log(error);
        }
      };

    function handleChange(value) {
        console.log(`selected ${value}`);
      }
useEffect(() => {
// Update the document title using the browser API
companylistApi();

}, [1]);

// const onFinish = (values) => {
//     console.log(values)
//        companyApi(values);
//    };

      return (
        <>
         <div className="m-5 p-5">
         <Form
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
            //   onFinish={onFinish}
              autoComplete="off"
              
            >

          <Select onChange={handleChange} style={{
        width: 120,
      }}>
        <Option>
          {companyList.map((ele) => (
            <div value={ele.id}>{ele.name}</div>
          ))}
          </Option>
          </Select>
          </Form>
        </div>
        </>   
      );
}



