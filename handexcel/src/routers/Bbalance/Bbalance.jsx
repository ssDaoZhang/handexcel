import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import Calendar from 'react-calendar';
import formatDate from 'format-date';
import './Bbalance.css';
import Navbars from '../Navbars/Navbars';
// import Tablebody from './Tablebody/Tablebody';
import Bdetails from './Bdetails/Bdetails';
import myAjax from '../../tools/myAjax';
class Bbalance extends Component {
    constructor(props){
      super(props);
      this.state = {
            sDate : new Date(),
            showSTimeFlag : false,
            //日期数组
            // queryTArr : '',
            //银行卡index、余额
            // bankBalance : '',
            //显示详情流水界面数据
            detailsData : '',
            //点击选则详情时选择的 银行卡
            // bankCardObj : '',
            //日期及余额
            detilsArr: '',
            //请求到数据提示
            backDataTirps : '',
            //请求状态码提示
            backStatusTirps : '',
            itemsArr : '',
            //显示详情窗界面
            showDetFlag : false,
            //当天没有详细流水
            noDetails : ''            
      };
    //   this.queryTArr = [];
      //表格头
    //   this.itemsArr = ['日期'];
      //日期及余额
      this.detilsArr = [];
    //   this.bankArr = [
    //     {name:'民生', code:'305'},
    //     {name:'建行', code:'105'},
    //     {name:'工商', code:'102'},
    //     {name:'村镇', code:'320'},
    //     {name:'平安', code:'307'},
    //     {name:'农业', code:'103'},
    //     {name:'中国银行', code:'104'},
    //     {name:'兴业', code:'309'},
    //     {name:'招商', code: '308'}
    //   ];
      this.tempIndex = 0;
      this.noDetails = '';
    }
    //处理返回信息的的银行卡标志
    setBankIndex = (obj) => {
        const { bankArr } = this;
        var bankIndexStr = '',
            shopCardCodeStr = '';
        bankArr.forEach((ele, index) => {
            if( obj.bankCode.substr(0, 3) == ele.code ){
                bankIndexStr = ele.name;
            }
        });
        shopCardCodeStr = obj.shopCardCode + '';
        shopCardCodeStr = shopCardCodeStr.substr(shopCardCodeStr.length - 4, 4);
        return obj.accountName + bankIndexStr + shopCardCodeStr;
    }
    //返回查询日期
    setQueryT = (timestr) => {
        var timestrArr = timestr.match(/\d{2}/g);
        var timeAele1 = timestrArr[0] + timestrArr[1];
        var tempArr = [];
            tempArr.push(timeAele1);
            tempArr.push(timestrArr[2]); 
            tempArr.push(timestrArr[3]);  
        return tempArr.join('-');         
    }
    setSDate = (currDate) => {
        this.setState({
            sDate : currDate            
        });
    }
    setEDate = (currDate) => {
        this.setState({
            eDate : currDate
        });
    }
    setShowSTimeFlag = () => {
        this.setState( preState =>{
            return {showSTimeFlag : !preState.showSTimeFlag};
        });
    }
    setShowETimeFlag = () => {
        this.setState( preState =>{
            return {showETimeFlag : !preState.showETimeFlag};
        });
    }
    //查询余额信息
    queryBalance = (e) => {
        const {sDate} = this.state;
        // console.log('选择的时间：', formatDate( '{year}{month}{day}', sDate));
        var sendData = {
            queryDate : formatDate( '{year}{month}{day}', sDate)
        }
        // var sendDataStr = JSON.stringify(sendData);
        // console.log(sendDataStr);
        // var mess =            
        // {   
        //     //交易日期
        //     "tradeDate":20180615,
        //     "balanceData":
        //         [
        //             {
        //                 //交易卡信息
        //                 "shopCardCode":'112455662328445',
        //                 "bankName":"中国银行",
        //                 "accountName":"老王",
        //                 "bankCode":"104152156232122",
        //                 //余额
        //                 "balance":125338.55
        //             },
        //             {
        //                 //交易卡信息
        //                 "shopCardCode":'112455662328445',
        //                 "bankName":"中国银行",
        //                 "accountName":"老王",
        //                 "bankCode":"104152156232122",
        //                 //余额
        //                 "balance":125338.55
        //             },
        //             {
        //                 //交易卡信息
        //                 "shopCardCode":'112455662328445',
        //                 "bankName":"中国银行",
        //                 "accountName":"老王",
        //                 "bankCode":"104152156232122",
        //                 //余额
        //                 "balance":125338.55
        //             },
        //             {
        //                 //交易卡信息
        //                 "shopCardCode":'112455662328445',
        //                 "bankName":"中国银行",
        //                 "accountName":"老王",
        //                 "bankCode":"104152156232122",
        //                 //余额
        //                 "balance":125338.55
        //             },
        //             {
        //                 //交易卡信息
        //                 "shopCardCode":'112455662328445',
        //                 "bankName":"中国银行",
        //                 "accountName":"老王",
        //                 "bankCode":"104152156232122",
        //                 //余额
        //                 "balance":125338.55
        //             },
        //             {
        //                 //交易卡信息
        //                 "shopCardCode":'112455662328445',
        //                 "bankName":"中国银行",
        //                 "accountName":"老王",
        //                 "bankCode":"104152156232122",
        //                 //余额
        //                 "balance":125338.55
        //             },
        //             {
        //                 //交易卡信息
        //                 "shopCardCode":'112455662328445',
        //                 "bankName":"中国银行",
        //                 "accountName":"老王1111",
        //                 "bankCode":"104152156232122",
        //                 //余额
        //                 "balance":125338.55
        //             }
        //         ]
        // };
        // this.ajaxCallback(mess);
        myAjax({
            url : '/commos/getBalanceList',
            data :  sendData,
            type : 'GET',
            success:this.ajaxCallback,
            heforeSend: this.beforeHandTirps,
            error: this.errorHandTirps
        });      
    }
    //Ajaxcallback
    ajaxCallback = (obj) => {
        const { sDate } = this.state;
        var dateStr = formatDate( '{year}-{month}-{day}', sDate);
        var dateStr2 = formatDate( '{year}{month}{day}', sDate);
        // console.log('余额数据1：', obj);
        if( obj.statusCode == 0 ){
                if(obj.list.length != 0){

                    // this.itemsArr.push(dateStr);
                    var detilArr = [];
                    // console.log('余额数据2：', obj.list);
                    obj.list.forEach((ele, index) => {
                        detilArr.push({
                            indexName:this.hangIndex(ele),
                            balance :  ele.balance,
                            Date : dateStr2,
                            shopCardCode : ele.shopCardCode,
                            bankName : ele.bankName,
                            accountName : ele.accountName,
                            bankCode : ele.bankCode,
                        });
                    }); 
                    // console.log('detilArr:', detilArr);
                    this.setState({
                        detilsArr : detilArr,
                        backDataTirps : '',
                        backStatusTirps : '',
                        itemsArr : ['日期', dateStr]
                    });
                }else{
                    this.setState({
                        backDataTirps  : '查询日期超出上传文件的所包含的日期！！！'
                    });
                }
        }else{
            this.setState({
                backStatusTirps : '服务器错误！！！'
            });
        }
    }
    //处理银行卡索引
    hangIndex = (obj) => {
        var bankArr = [
            {name:'民生', code:'305'},
            {name:'建行', code:'105'},
            {name:'工商', code:'102'},
            {name:'村镇', code:'320'},
            {name:'平安', code:'307'},
            {name:'农业', code:'103'},
            {name:'中国银行', code:'104'},
            {name:'兴业', code:'309'},
            {name:'招商', code: '308'}
        ];
        var SbankName ,
            shopCardTarr,
            shopCardT;
            shopCardTarr = obj.shopCardCode.match(/\d{1,4}/g);
            shopCardT = shopCardTarr[shopCardTarr.length - 1];
        bankArr.forEach(ele => {
            if( ele.code == obj.bankCode.match(/\d{3}/)[0] ){
                SbankName = ele.name;
            }
        });
        return SbankName + obj.accountName + shopCardT;
    }
    setdetailsData = ( str, flag ) => {
        this.setState({
            detailsData : str,
            showDetFlag : flag
        });
    }
    //查询详情信息 detailsData
    getDetailsData = (obj) => {
        // console.log('选择的点卡：', obj);
        // console.log('是否显示det2',flag);
        this.setState({
            bankCardObj : {
                accountName : obj.accountName,
                bankName : obj.bankName,
                shopCardCode : obj.shopCardCode,
                bankCode :  obj.bankCode,
            }
        });
        myAjax({
            url : '/commos/getBalanceDetailList',
            data :  { 
                        startDate : obj.sDate,
                        endDate : obj.sDate,
                        shopCardCode : obj.shopCardCode
                    },
            type : 'GET',
            success:this.geDetailsData,
            heforeSend: this.beforeHandTirps,
            error: this.errorHandTirps
        }); 
        // console.log('木有当天详情：', this.noDetails);
    }
    //获取默认详情
    geDetailsData = (data) =>{
        // console.log('默认获取的详情1：', data.list);
        if( data.statusCode == 0 ){
            if(data.list.length != 0){
                this.setState({
                    detailsData : data.list,
                    backDataTirps : '',
                    backStatusTirps : '',
                    showDetFlag : true,
                    noDetails : ''
                });
            }else{
                this.setState({
                    backDataTirps  : '指定查询日期没有详细流水！！！',
                    detailsData : '',
                    showDetFlag : true,
                    noDetails : '默认当天没有卡流水详情，请重新指定时间段查询!!!'
                });
                // this.noDetails = '默认当天没有卡流水详情，请重新指定时间段查询!!!'
            }
        }else{
            this.setState({
                backStatusTirps : '服务器错误！！！'
            });
        }
        // var tempdata = JSON.parse(data);
        // console.log('默认获取的详情2：', tempdata);

        // this.setState({
        //     detailsData : tempdata
        // });
    }
    //取消返回信息提示语言
    handTirps = (e) => {
        const { backDataTirps, backStatusTirps } = this.state;
        if(backDataTirps || backStatusTirps){
            this.setState({
                backDataTirps : '',
                backStatusTirps : ''
            })
        }
    }
    //请求前设置提示
    beforeHandTirps = (data) => {
        this.setState({
            backDataTirps : '数据请求中...',
        })
    }
    //请求error
    errorHandTirps = (data) =>{
        this.setState({
            backDataTirps : '网络错误！！！',
        })
    }
    render(){
        const {
            sDate,
            eDate,
            showSTimeFlag,
            showETimeFlag,
            //余额表格数据
            // queryTArr,
            //银行卡index、余额
            // bankBalance,
            //从后端获取的详情
            detailsData,
            //获取详情的信息
            bankCardObj,
            //查询获取的余额
            detilsArr,
            //请求到数据提示
            backDataTirps,
            //请求状态码提示
            backStatusTirps,
            //余额日期
            itemsArr,
            //show详情flag
            showDetFlag,
            //当天没有详细流失
            noDetails
        } = this.state;
        const {
            setSDate,
            setEDate,
            setShowSTimeFlag,
            setShowETimeFlag,
            //查询余额
            queryBalance,
            getDetailsData,
            setdetailsData,
            //表格头
            //itemsArr
        } = this;
        var sTimeStr = formatDate( '{year}-{month}-{day}', sDate),
        eTimeStr = formatDate( '{year}-{month}-{day}', eDate);
        // console.log('选择的卡信息：', bankCardObj);
        // console.log(sDate + '  ' + eDate);
        // console.log(formatDate( '{year}-{month}-{day}', '20180607'));
        // console.log('日期数组：', queryTArr);
        // console.log('银行卡index、余额:', bankBalance);
        // console.log('得到的月详情：',  detailsData);
        // console.log('银行索引：', itemsArr);
        // console.log('日期余额：', detilsArr);
        // console.log('选择的详情：', bankCardObj);
        // console.log('是否显示det1', showDetFlag)
        // console.log('当天没有');
        return(
            <div className='bbalance'>
                <Navbars index='/balance'/>
                <div    className='bbalance__query'
                        onMouseEnter={this.handTirps}>
                    <span>请选择您要查询的时间:</span>
                    <div className='bbalance__query__items'>
                        <span   className='bbalance__query__items__it'
                                onClick={setShowSTimeFlag}>
                            { sTimeStr}
                            <i className={`${showSTimeFlag && 'sanjactive'}`}></i>
                        </span>
                        {   
                            showSTimeFlag && <div className='bbalance__query__items__ic'>
                                <Calendar   onChange={setSDate}
                                    value={sDate}
                                    className='my__calendarwarp'                                        
                                    showNeighboringMonth = {false}
                                    view='month'
                                    />
                            </div>
                        }
                    </div>
                    <div    className='bbalance__query__btn'
                            onClick={queryBalance}
                        >查&nbsp;&nbsp;询
                    </div>
                    <i>{backDataTirps || backStatusTirps}</i>
                </div>
                {
                    detilsArr !== '' && <div className='bbalance__tablewarp'>
                            <div    className='bbalance__tablewarp__ele11'>
                                <span className='bbalance__tablewarp__ele11__t1' >{itemsArr[0]}</span>
                                <span className='bbalance__tablewarp__ele11__t2'>{itemsArr[1]}</span>
                            </div>
                            {
                                detilsArr.map((ele, index) => {
                                    return <div className='bbalance__tablewarp__ele1'
                                            key={ele.indexName}>
                                        <span className='bbalance__tablewarp__ele1__tt1'>{ele.indexName}</span>
                                        <span className='bbalance__tablewarp__ele1__tt2'>{ele.balance}
                                            <i  onClick={(e) => {getDetailsData({
                                                sDate : ele.Date,
                                                accountName : ele.accountName,
                                                bankName : ele.bankName,
                                                shopCardCode : ele.shopCardCode,
                                                bankCode :  ele.bankCode                                      
                                            })}}>
                                                查看详情
                                            </i>
                                        </span>
                                    </div>
                                })
                            }
                    </div>                                  
                }
                {showDetFlag && <Bdetails     
                                        setCloseFlag={setdetailsData} 
                                        detailsData={detailsData}
                                        bankCardObj={bankCardObj}
                                        sDate={sDate}
                                        noDetails = {noDetails}
                                        />
                }       
            </div>
        );
    }
}

export default Bbalance;
