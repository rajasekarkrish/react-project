import { Alert, Button, Checkbox, Form, Input,Image } from "antd";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../image/stellar.svg";
import Loginimg from "../image/loginimg.svg";
import Cookies from 'universal-cookie';

// import Img from "../image/login.png";
const Tasklogin = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [status, setStatus] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const [values, setValues] = useState(initialState);
  const [loginuser,setLoginUser]=useState([{ id: "", user_name: "" }])
  const cookies = new Cookies();
 


  // const loginApi = async (data) => {
  //   try {
  //     const result = await axios.post(`/token/`, data);
  //      window.location.href="/"
  //     const { access, refresh } = result.data;
  //     localStorage.setItem("access_token", access);
  //   } catch (error) {
  //     setErrorData("User email or password is wrong!");
  //   }
  // };
  
  const loginApi = async (data) => {
    try {
      const result = await axios.post(`/login/`, data);
      window.location.href="/"
      const { token,...user_details } = result.data;
      cookies.set('access_token',token,{expires:new Date(token.exp * 1000)});
      sessionStorage.setItem("access_token",token);
      sessionStorage.setItem("user_details",JSON.stringify(user_details))
      
    } catch (error) {
      setErrorData("User email or password is wrong!");
    }
  };



  const onFinish = (values) => {
    console.log("Success:", values);
    loginApi(values);
    
  };
  
  


  return (
    <>
    
      
    {/* <h1>compliance connect</h1> */}
  
    
      
        <div class="col-12">
        <div class="row">
          <div class="col-6">
              <img src={Loginimg}/>
          </div>
          <div class="col-6" style={{float:"right"}}>
            <div class="card ml-auto w-50">
              <div id="main">
                <div class='appHeader'>
                  <img src={Logo} /> 
                  <span style={{marginLeft:"10px"}}>Compliance Management</span>
                </div>
                <div class="divloginmsg">
                  <div class="divlogin">
                    Login
                  </div>
                  Please login to your Email Address & Password
                </div>
                <div>
                  {errorData && <Alert message={errorData} type="error" showIcon />}
                  
                  <div className="loginform">
                  <Form 
                    name="basic"
                    layout="vertical"
                    initialValues={{
                      remember: true,
                    }}
                    
                    onFinish={onFinish}
                    autoComplete="off"
                    onChange={() => {
                      setErrorData(false);
                    }}
                  >
                    <div className="emailfield1">
                    <Form.Item 
                      label="Email ID"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter your email!",
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
                          message: "Please enter your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    </div>
                                       

                    <Form.Item >
                      {/* <Button  htmlType="submit">
                      </Button> */}
                      <button className="text-white loginbutton">LOGIN</button>
                    </Form.Item>
                  </Form>
                  </div>
                  
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      
   
        
      </div>
    
   
   
    
  
    </>
  );
};

export default Tasklogin;
