import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SelectBC.css';
class SelectBC extends Component {
    constructor(props){
      super(props);
    }
    //分解卡号
    splitBankCode = ( bankCode ) => {
        var str = bankCode + '';
        var arr = str.match(/\d{1,4}/g);
        return  arr.join(' ');
    }
    //获取用户选择的数据
    
    render(){
        const {data, callFuc} = this.props;
        const { splitBankCode } = this;
        // console.log('传入的数据：', data);
        return(
            <div className='selectbc'>
                <div className='selectbc__title'>
                    点击选择您要上传的excel表对应的银行卡
                </div>
                <div className='selectbc__item'>
                    {   
                        data && data.map( (ele, index) => {
                            return(
                            <div key={ele + '' + index }
                                className='selectbc__item__ele'
                                onClick={ (e) => {callFuc(ele)}}>
                                <div    className='selectbc__item__ele__title'
                                        >
                                    <span>店铺名：{ele.shopName}</span>
                                    <span className='bankName'>开户行：{ele.bankName}</span>
                                </div>
                                <div    className='selectbc__item__ele__con'
                                    >
                                    <div>账户名：{ele.accountName}</div>
                                    <div>银行卡号：{splitBankCode(ele.shopCardCode)}</div>
                                </div>
                            </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default SelectBC;