import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import Calendar from 'react-calendar';
import formatDate from 'format-date';
import './Bdetails.css';
import Tablerow from '../../Handexcel/Tablerow';
// import Navbars from '../Navbars/Navbars';
import myAjax from '../../../tools/myAjax';
class Bdetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            sDate : this.props.sDate,
            eDate : this.props.sDate,
            showSTimeFlag : false,
            showETimeFlag : false,
            tableData : '',
            //请求到数据提示
            backDataTirps : this.props.noDetails
        }
        this.tableItem = [
            {tallyDate : '记账日' },
            {tradeDate : '交易日期'},
            {tradeTime : '交易时间'},
            {pay : '支出'},
            {income : '收入'},
            {balance : '账户余额'},       
            {oppoAccount : '对方户名'},
            {oppoCode : '对方账号'},
            {oppoBank : '对方开户行'},
            {currency : '币种'},        
            {tradePlace : '交易地点'},
            {method : '交易方式'},
            {fNum : '交易流水号'}
        ];
        console.log('像是：', this.props.noDetails);
    }
    componentDidMount(){
        console.log('像是：', this.props.noDetails);
        console.log('像是日期：', this.props.sDate);
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
    //查询时间段内的卡详情
    queryBalance = (e) => {
        const { sDate, eDate } = this.state;
        const { bankCardObj } = this.props;
        myAjax({
            url : '/commos/getBalanceDetailList',
            data :  { 
                        startDate : formatDate( '{year}{month}{day}', sDate),
                        endDate : formatDate( '{year}{month}{day}', eDate),
                        shopCardCode : bankCardObj.shopCardCode
                    },
            type : 'GET',
            success:this.geDetailsData,
            heforeSend: this.beforeHandTirps,
            error: this.errorHandTirps
        });
    }
    //获取时间段内的卡详情
    geDetailsData = (data) => {
        // console.log('默认获取的详情2：', data);
        if( data.statusCode == 0 ){
            if(data.list.length != 0){
                this.setState({
                    tableData : data.list,
                    backDataTirps : ''
                });
            }else{
                this.setState({
                    backDataTirps  : '查询日期超出上传文件的所包含的日期！！！'
                });
            }
        }else{
            this.setState({
                backDataTirps : '服务器错误！！！'
            });
        }
    }
    //取消返回信息提示语言
    handTirps = (e) => {
        const { backDataTirps } = this.state;
        if(backDataTirps){
            this.setState({
                backDataTirps : ''
            })
        }
    }
    //请求前设置提示
    beforeHandTirps = (data) => {
        this.setState({
            backDataTirps : '数据请求中...'
        })
    }
    //请求error
    errorHandTirps = (data) =>{
        this.setState({
            backDataTirps : '网络错误！！！'
        })
    }
    //处理日期
    handDate = (date) => {
        var dateArr = date.match(/\d{2}/g);
        return dateArr[0] + dateArr[1] + '-' + dateArr[2] + '-' + dateArr[3]; 
    }
    //默认当天提示
    // handnoData = () => {
    //     this.setState({
    //         backDataTirps : '默认当天没有卡流水详情，请重新指定时间段查询'
    //     })
    // }
    render(){
        const {
            sDate,
            eDate,
            showSTimeFlag,
            showETimeFlag,
            tableData,
            //请求到数据提示
            backDataTirps,
        } = this.state;
        const {
            setSDate,
            setEDate,
            setShowSTimeFlag,
            setShowETimeFlag,
            tableItem,
            queryBalance,
            //处理日期
            handDate
        } = this;
        const {
            //传入的余额详情
            detailsData,
            setCloseFlag,
            //被选择的卡信息
            bankCardObj 
        } = this.props;
        var sTimeStr = formatDate( '{year}-{month}-{day}', sDate),
        eTimeStr = formatDate( '{year}-{month}-{day}', eDate);
        var tempTableData = tableData || detailsData;
        // var tirpsMess =  detailsData === '' ? '默认当天没有卡流水详情，请重新指定时间段查询' : '';
        // console.log('传入的数据性情：', detailsData);
        // console.log('获取的卡详情：', tempTableData);
        // console.log('被选择的卡信息：', bankCardObj);
        console.log('没有详情：', this.props.noDetails);
        return(
            <div className='bdetails'>
                <div    className='bdetails__close'
                        onClick={e => {setCloseFlag('', false)}}>
                </div>
                <div className='bdetails__warp'>
                    <div className='bdetails__tirps'>
                        默认显示的是当前日期的卡流水详情，如果希望查看多个日期的卡流水详情，
                        请选择您要查看的时间段，然后点击查询获取信息
                    </div>
                    <div className='bdetails__query'>
                        <span>请选择您要查询的时间段:</span>
                        <div className='bdetails__query__items'>
                            <span   className='bdetails__query__items__it'
                                    onClick={setShowSTimeFlag}>
                                {'开始时间：' + sTimeStr}
                                <i className={`${showSTimeFlag && 'sanjactive'}`}></i>
                            </span>
                            {   
                                showSTimeFlag && <div className='bdetails__query__items__ic'
                                            onMouseEnter={this.handTirps}>
                                    <Calendar   onChange={setSDate}
                                        value={sDate}
                                        className='my__calendarwarp'                                        
                                        showNeighboringMonth = {false}
                                        view='month'
                                        />
                                </div>
                            }
                        </div>
                        <div className='bdetails__query__items'>
                            <span   className='bdetails__query__items__it'
                                    onClick={setShowETimeFlag}>
                                {'结束时间：' + eTimeStr}
                                <i className={`${showETimeFlag && 'sanjactive'}`}></i>
                            </span>                        
                            {                            
                                showETimeFlag && <div className='bdetails__query__items__ic'>
                                    <Calendar   onChange={setEDate}
                                        value={eDate}
                                        minDate={sDate}
                                        className='bdetails__calendarwarp'  
                                        showNeighboringMonth = {false}                                          
                                        /> 
                                </div>
                            }
                        </div>
                        <div    className='bdetails__query__btn'
                                onClick={queryBalance}
                            >查&nbsp;&nbsp;询
                        </div>
                        <i className='tirps'>{backDataTirps}</i>
                    </div>
                    <div className='bdetails__custmess'>
                        <div className='bdetails__custmess__tips'>
                            被查询的银行卡信息：
                        </div>
                        <div className='bdetails__custmess__mess'>
                            <div className='bdetails__custmess__mess1'>
                                <span>账户名：</span>
                                <span>{bankCardObj.accountName}</span>
                            </div>
                            <div className='bdetails__custmess__mess2'>
                                <span>卡号：</span>
                                <span>{bankCardObj.shopCardCode.match(/\d{1,4}/g).join(' ')}</span>
                            </div>
                            <div className='bdetails__custmess__mess3'>
                                <span>开户行：</span>
                                <span>{bankCardObj.bankName}</span>
                            </div>
                        </div>
                    </div>
                    <div className='bdetails__tablewarp'>
                        <table>
                            <thead>
                                <tr>
                                    {   
                                        tempTableData !== '' &&
                                        tableItem.map((ele, index) => {
                                            var tag = Object.keys(ele)[0];
                                            if(Number(tempTableData[0][tag]) !== -1){
                                                return <th key={tag}>{ele[tag]}</th>
                                            }
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        tempTableData !== '' &&
                                        tempTableData.map((ele, index) => {
                                                return <tr key={ele.tradeDate + index}>
                                                        {ele.tallyDate != -1 && <td>{handDate(ele.tallyDate)}</td>}
                                                        {ele.tradeDate != -1 && <td>{handDate(ele.tradeDate)}</td>}
                                                        {ele.tradeTime != -1 && <td>{ele.tradeTime}</td>}
                                                        {ele.pay != -1 && <td className='paygreen'>{ele.pay}</td>}
                                                        {ele.income != -1 && <td className='incomered'>{ele.income}</td>}
                                                        {ele.balance != -1 && <td className='balanceyellow'>{ele.balance}</td>}
                                                        {ele.oppoAccount != -1 && <td>{ele.oppoAccount}</td>}
                                                        {ele.oppoCode != -1 && <td>{ele.oppoCode}</td>}
                                                        {ele.oppoBank != -1 && <td>{ele.oppoBank}</td>}
                                                        {ele.currency != -1 && <td>{ele.currency}</td>}
                                                        {ele.tradePlace != -1 && <td>{ele.tradePlace}</td>}
                                                        {ele.method != -1 && <td>{ele.method}</td>}
                                                        {ele.fNum != -1 && <td>{ele.fNum}</td>}  
                                                </tr>                                    
                                        })
                                    }
                            </tbody>            
                        </table>
                    </div>
                </div>    
            </div>
        );
    }
}

export default Bdetails;