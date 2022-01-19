import React from 'react';
import ReactDOM from 'react-dom';
import RouterConfig from './router';

if (module && module.hot) {
  module.hot.accept();
}

ReactDOM.render(<RouterConfig/>, document.querySelector('#root'));
