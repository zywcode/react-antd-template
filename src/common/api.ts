// @ts-ignore
const {api} = env;
const setting = api || 'dev';

const dev = {
  baseURL: 'http://localhost:4000'
};

const prod = {
  baseURL: 'http://localhost:4000'
};

const data = setting === 'dev' ? dev : prod;

export default data;
