import React from 'react';
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useStore, useSelector, useDispatch} from "react-redux";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.app);
  console.log(selector);
  const handleClick = () => {
    navigate('/page3');
  };
  const handleChange = () => {
    dispatch({type: 'app/getUserinfo', payload: {id: '2', username: '哈哈哈'}});
  };
  return <div>
    Home
    {selector && selector.userinfo && selector.userinfo.username}
    <Button onClick={handleChange}>修改state</Button>
    <Button onClick={handleClick}>跳转到Page3</Button>
  </div>
};

export default Home;
