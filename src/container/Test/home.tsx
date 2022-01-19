import React from 'react';
import {Button} from "antd";
import {useNavigate} from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/page3');
  }
  return <div>
    Home
    <Button onClick={handleClick}>跳转到Page3</Button>
  </div>
};

export default Home;
