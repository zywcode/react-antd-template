/**
 * 基本Model app.js, 在src/store/index.js中被挂载到store上，命名为app
 * 可用于存放通用信息，比如用户数据、角色、权限、省市区等通用数据
 * **/
export default {
  state: {
    userinfo: null, // 用户信息
  },

  reducers: {
    setUserInfo(state: any, payload: any) {
      return { ...state, userinfo: payload };
    },
  },

  /** actions 可以是一个对象，也可以是一个函数，函数的第1个参数自动被注入dispatch(见models/test.js) **/
  effects: {
    // 模拟获取用户信息
    async getUserinfo(params: any = {}) {
      const user = { id: params.id || '1001', username: params.username || 'admin' };
      this.setUserInfo(user); // 这个setUserInfo就是上面reducers中的setUserInfo
      return user;
    },
  },
};
