import React from "react";
import {Button, Tooltip} from 'antd';

export default function App() {
  return (
    <div>
      <Tooltip title={'这是一个按钮'}>
        <Button type="primary">Button</Button>
      </Tooltip>
    </div>
  );
};
