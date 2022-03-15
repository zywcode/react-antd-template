import React from 'react';
import {Button, Select} from "antd";
import {useNavigate} from "react-router-dom";
import {useStore, useSelector, useDispatch} from "react-redux";

const {Option} = Select;
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.app);
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
    <Select value={'2'} optionLabelProp="label">
      <Option value={'1'} label={<div>这里是1</div>}>1</Option>
      <Option value={'2'} label={<div>这里是2</div>}>2</Option>
      <Option value={'3'} label={<div>这里是3</div>}>3</Option>
    </Select>
    <Button onClick={handleChange}>修改state</Button>
    <Button onClick={handleClick}>跳转到Page3</Button>
  </div>
};

export default Home;
