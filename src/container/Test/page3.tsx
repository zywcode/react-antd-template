import React from 'react';
import {Button} from "antd";
import {useNavigate} from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  }
  return <div>
    Page3
    <Button onClick={handleClick}>跳转到主页</Button>
  </div>
};

export default Home;
