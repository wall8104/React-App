import { Input } from 'antd';
import { useState,useEffect } from "react";
import axios from 'axios';
import { setCookie,getCookie } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";
export default function HomePage(){
    const [fullname,setFullname]=useState('');
    const [studentId,setStudentId]=useState('');
    const [studentClass,setStudentClass]=useState('');
    const navigate = useNavigate();
    const token=getCookie('app-token');
    useEffect(()=>{
        if(token==''){
            navigate('/login')
        }
    },[token])
    async function handleSubmit(){
try {
    const res=await axios.put('http://157.66.27.28:3000/api/update',{
        fullname,studentId,class:studentClass
    },{
        headers: {
            Authorization: 'Bearer ' + token
          }
    })
    alert(res.data)
} catch (error) {
    console.log(error.response.data.message)
}
    }
    return <div>
        <Input onChange={(e)=>{setFullname(e.target.value);
        }} placeholder="fullname" />
        <Input onChange={(e)=>{setStudentClass(e.target.value)}} placeholder="class" />
        <Input onChange={(e)=>{setStudentId(e.target.value)}} placeholder="studentId" />
        <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
    </div>
}