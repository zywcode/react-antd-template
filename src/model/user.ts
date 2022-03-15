import {userInfo} from "@/service/user";

/**
 * 基本 model account.js, 在src/store/index.js中被挂载到store上，命名为user
 * 可用于存放账号信息，比如用户数据、角色、权限，个人设置等通用数据
 */
export default {
  state: {
    info: {}, // 用户基本信息
  },

  reducers: {
    setUserInfo(state: any, payload: any) {
      return {...state, info: payload};
    },
  },

  effects: {
    async getUserInfo() {
      let res = await userInfo();
      this.setUserInfo(res.data);
      return res;
    },
  },
};
