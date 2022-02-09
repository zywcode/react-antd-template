/** 全局唯一数据中心 **/
import {init} from '@rematch/core';

import model from "@/model/app";

export default init({
  models: {
    model
  },
});
