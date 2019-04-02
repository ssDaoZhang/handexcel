import React from 'react';
import PropTypes from 'prop-types';
// import './LinkLink.css';
// import './Menuli.css'
const ProgressBar = (props) => {
//   console.log("dataObj:", dataObj);
//   console.log('Object.keys(dataObj):', Object.keys(dataObj));
let {
    percent = 0,         // 数字：0到1，包括0和1.用来填充百分比进度
    width = 100,         // 进度条宽度
    height = 10,         // 进度条高度
    rounded = true,      // 如果为真则用圆角
    color = "#26ae5f",   // 填充颜色
    animate = false,     // 如果为真则使用动画效果
    label = null         // 无障碍浏览用的标签
} = props; 

let r = rounded ? Math.ceil(height / 2) : 0;
//w ——计算上色矩形的宽度，形成进度条效果：
let w = percent ? Math.max(height, width * Math.min(percent, 1)): 0;
//style——如果需要，给进度条添加动画效果：
let style = animate ? { "transition": "width 500ms, fill 250ms" } : null;
  return (
    <svg width={width} height={height} aria-label={label}>
        <rect width={width} height={height} fill="#ccc" rx={r} ry={r}/>
        <rect width={w} height={height} fill={color} rx={r} ry={r}   style={style}/>
  </svg>
  );
};

ProgressBar.propTypes = {
    percent : PropTypes.number.isRequired,
    width : PropTypes.number.isRequired,
    height : PropTypes.number.isRequired,
    
};

export default ProgressBar;