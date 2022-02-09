import React from 'react';
import {Button} from "antd";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const params = useParams();
  const searchParams = useSearchParams();

  const handleClick = () => {
    console.log(params);
    navigate('/home');
  }
  return <div>
    Page3
    <Button onClick={handleClick}>跳转到主页</Button>
  </div>
};

export default Home;
