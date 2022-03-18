import React, {useState} from 'react';
import {Input} from "antd";
import {douyinParser} from "@/service/douyin";
import './index.scss';

const { Search } = Input;
const Home = () => {
    const [source, setSource] = useState('');
    const onSearch = async (value: string) => {
      window.open(`http://localhost:4001/api/parser/douyin?source=${value}`);
        // setSource(source);
        // let params = {
        //     source: value
        // };
        // let [err, res] = await douyinParser(params).then((res: any) => [null, res]).catch((err: any) => [err, null]);
        // console.log(err, res);
        // if (!err && res && res.data && res.data.url) {
        //   window.open(res.data.url);
        // }
    }

    return <div className="douyin-page-index">
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
    </div>
};

export default Home;
