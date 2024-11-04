import './LoginPage.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useState } from "react";
import axios from 'axios';
import { setCookie,getCookie } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [isLogin,setIsLogin]=useState(true);
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            const res=await axios.post(`http://157.66.27.28:3000/api/${isLogin?"login":"register"}`, {
                username: values.username,
                password: values.password
            })
            console.log(res.data);
        if(res.data.token){
            setCookie('app-token',res.data.token)
            navigate("/");
        }
        if(res.data.userId){
            alert(res.data.message)
        }
        } catch (error) {
            alert(error.response.data.message);
        }
        
      };
    return <div className="container justify-content-center d-flex">
        <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      className="form-container"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          {isLogin?"Log in":"Register"}
        </Button>
        <div onClick={()=>{
            setIsLogin((prev)=>!prev)
        }} className="change-auth">
        or {isLogin?"Register":"Log in"} now!
        </div>
      </Form.Item>
    </Form>
    </div>
}