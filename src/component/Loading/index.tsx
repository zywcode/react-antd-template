/** Loading组件 用于按需加载时过渡显示等 **/
import React from "react";
import "./index.scss";

export default function Loading(props: any) {
  function makeType(p: any) {
    let msg;
    if (p.error) {
      msg = "加载出错，请刷新页面";
    } else if (p.timedOut) {
      msg = "加载超时";
    } else if (p.pastDelay) {
      msg = "加载中…";
    }
    return msg;
  }

  return (
    <div className="loading">
      <div>{makeType(props)}</div>
    </div>
  );
}
