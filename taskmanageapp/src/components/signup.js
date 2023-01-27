import { Alert, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";

const Signup = () => {
  const [status, setStatus] = useState(false);
  const [errorData, setErrorData] = useState(false);
  //api call for consuming restapi
  const SignUpApi = async (data) => {
    try {
      const result = await axios.post("/user/register/", data);
      console.log(result);
      if (result.status === 201) {
        setStatus("user created successfully");
      }
    } catch (error) {
      console.log(error);
      setErrorData("user already exist");
    }
  };
  const onFinish = (values) => {
    //calling and sending req for create customer
    SignUpApi(values);
  };

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6 bg-white p-4 shadow mx-auto">
            {
              //added custom status alert for user creation
              status && <Alert message={status} type="success" showIcon />
            }
            {errorData && <Alert message={errorData} type="error" showIcon />}
            <Form
              name="basic"
              layout="vertical"
              onChange={() => {
                setErrorData(false);
                setStatus(false);
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                  {
                    type: "email",
                    message: "Please enter valid email!",
                  },
                ]}
              >
                <Input type={"email"} />
              </Form.Item>

              <Form.Item
                label="Username"
                name="user_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
