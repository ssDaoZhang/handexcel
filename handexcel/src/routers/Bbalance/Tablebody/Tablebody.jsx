import React from 'react';
import PropTypes from 'prop-types';

const Tablebody = ({dataArr, callFuc}) => {
    // console.log('余额日期：', selectedDateArr);
    // console.log('余额对象：',dataObj);
    var handDateStr = (dateStr) => {
        var strArr = dateStr.match(/\d{2}/g);
        return strArr[0] + strArr[1] + '-' + strArr[2] + '-' + strArr[3];
    }
    
  return (
    <tr>
        {
            dataArr.map(
                (ele, index) => {
                    if(index == 0){
                        return <td key={ele + '' + index}>{handDateStr(ele)}</td>
                    }else{
                        return <td  key={ele + '' + index}>
                                    {ele.balance}
                                    <span onClick={(e) => {callFuc({
                                        sDate : ele.Date,
                                        accountName : ele.accountName,
                                        bankName : ele.bankName,
                                        shopCardCode : ele.shopCardCode,
                                        bankCode :  ele.bankCode                                      
                                    })}}>
                                        查看详情
                                    </span>
                                </td>
                    }
                }
            )
        }
    </tr>
  );
};

// Tablerow.propTypes = {
//     dataObj: PropTypes.object.isRequired
// };

export default Tablebody;