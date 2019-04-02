import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import $l from 'jquery';
import FileLoader from './loadFlie2';
import handData from './handData2';
import './Handexcel.css';
import './table.css';
// import Tablerow from './Tablerow';
import XLSX from 'xlsx';
import ProgressBar from '../../components/ProgressBar';
import SelectBC from './SelectBankCard/SelectBC';
import Navbars from '../Navbars/Navbars';
import myAjax from '../../tools/myAjax';
class Handexcel extends Component {
  constructor(props){
    super(props);
    this.state = {
        //返回信息
        backMess : '',
        //上传多个文件数组
        sFlieShowName : '',
        //店铺卡
        bankCard : '',
        //已读标记
        sreadedFlag : '',
        //上传出错的文件标识
        sRedError : false
    };


    //现用
    //已读文件标记
    this.readedFlag = [];
    this.handfuc = [
        { bankHand : handData.minSheng, bankT : 'A4'},
        { bankHand : handData.jianHang, bankT : 'A7'},
        { bankHand : handData.gongShang, bankT : 'A7'},
        { bankHand : handData.cunZhen, bankT : 'A2'},
        { bankHand : handData.pingAn, bankT : 'A2'},
        { bankHand : handData.nongYe, bankT : 'A3'},
        { bankHand : handData.zhongHang, bankT : 'A1'},
        { bankHand : handData.xingye, bankT : 'A10'},  
        { bankHand : handData.zhaohang, bankT : 'A8'}      
    ];
    this.myBankCode = [
        {
            name : '民生',
            code : '305',
            mark : 0
        },
        {
            name : '建设银行',
            code : '105',
            mark : 1
        },
        {
            name : '工商',
            code : '102',
            mark : 2
        },
        {
            name : '村镇',
            code : '320',
            mark : 3
        },
        {
            name : '平安',
            code : '307',
            mark : 4
        },
        {
            name : '农业',
            code : '103',
            mark : 5
        },
        {
            name : '中国银行',
            code : '104',
            mark : 6
        },
        {
            name : '兴业',
            code : '309',
            mark : 7
        },
        {
            name : '招行',
            code : '308',
            mark : 8
        }
    ];
    this.bankList = '';
    //文件数组
    this.filesArr = [];
    //上传多个文件数组
    this.AllfileArr = [];
    //上传的文件数组名
    this.fileNameArr = [];
    //识别的银行卡数组
    this.bankCodeArr = [];
    //锁定读取框标记
    this.readBoxFlag = true;
    //读取文件的event
    this.events = {
        load: function(data){
        },
         progress: '', 
        loadSuccess: function(){
            // console.log('success!!!');
        }
    }
  };
  componentDidMount(){
    this.bankList = [
        {
            "shopCardCode":'6226220636247123',
            "bankCode":"305584018213",
            "bankName":"中国民生银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"张宇宙",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6226220636872961',
            "bankCode":"305584018213",
            "bankName":"中国民生银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6226190600265148',
            "bankCode":"305584018213",
            "bankName":"中国民生银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"马秀娟",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6226190601872124',
            "bankCode":"305584018213",
            "bankName":"中国民生银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"高志勋",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6226220636247131',
            "bankCode":"305584018213",
            "bankName":"中国民生银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"李云",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6217007200073805585',
            "bankCode":"105584000249",
            "bankName":"中国建设银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6222034000013243732',
            "bankCode":"102584002805",
            "bankName":"中国工商银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"张宇宙",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6222034000002530792',
            "bankCode":"102584002805",
            "bankName":"中国工商银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"翟李阳",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6222034000006751931',
            "bankCode":"102584002805",
            "bankName":"中国工商银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"单保清",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6222034000016038360',
            "bankCode":"102584002805",
            "bankName":"中国工商银行深圳福虹支行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6213471011000956110',
            "bankCode":"320584006006",
            "bankName":"深圳福田银座村镇银行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"张宇宙",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6213471011000886473',
            "bankCode":"320584006006",
            "bankName":"深圳福田银座村镇银行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6213471011000868323',
            "bankCode":"320584006006",
            "bankName":"深圳福田银座村镇银行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"李云",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6230580000071278522',
            "bankCode":"307584008089",
            "bankName":"中国平安银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"李冬梅",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6230580000188338896',
            "bankCode":"307584008089",
            "bankName":"中国平安银行深圳市人民南支行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6230520120015495371',
            "bankCode":"103584003267",
            "bankName":"中国农业银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"单保清",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6230520120022706174',
            "bankCode":"103584003267",
            "bankName":"中国农行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"翟李阳",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6217582000042051144',
            "bankCode":"104584001565",
            "bankName":"中国银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"张宇宙",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6217582000042815613',
            "bankCode":"104584001565",
            "bankName":"中国银行深圳市分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6217582000043781418',
            "bankCode":"104584001565",
            "bankName":"中国银行深圳市分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"李云",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'622908333065904228',
            "bankCode":"309584008166",
            "bankName":"兴业银行股份有限公司深圳支行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"李云",
            "bankAddress":"老王"
        }, 
        {
            "shopCardCode":'6214837880865641',
            "bankCode":"308584001475",
            "bankName":"招商银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"张宇宙",
            "bankAddress":"老王"
        }   
    ];
    this.bankList.forEach((ele, index) => {
        this.readedFlag.push(false);
    });
    this.setState({
        bankCard : this.bankList.map(ele => ele),
        sreadedFlag : this.readedFlag.map(ele => ele)
    });
};
  handDragOver = (e) => {
    e.preventDefault();
  };

  handDrop = (e) => {
    e.preventDefault();
    if(this.readBoxFlag){
        this.readBoxFlag = false;
        // console.log('锁定标记1:', this.readBoxFlag);
        if(this.state.sFlieShowName.length != 0){
            this.setState({
                sRedError : false,
                sFlieShowName : ''
            });
        }
        var tarFile1 = e.dataTransfer.files;
        for(var i = 0; i < tarFile1.length; i++){
            this.handSingleFile(tarFile1[i]);
        }
    }
  };
  //读取处理单个文件数据
  handSingleFile = (file) => {
        var fileName =  file.name;
        var fileNameStr = fileName.match(/^\w*\./)[0].match(/\d*/)[0];
        var bankIndex = fileNameStr.match(/^\d{3}/)[0],
            bankCardIndex = fileNameStr.match(/\d{5}$/)[0],
            bankCardObj, bankFunIndex;
            // console.log('读取的银行序列号：', bankIndex);
            // console.log('读取的银行卡尾号：', bankCardIndex);
        //匹配银行卡
        this.bankList.forEach((ele, index) => {
            if(ele.shopCardCode.match(/\d{5}$/)[0] === bankCardIndex){
                bankCardObj = ele;
            }
        });   
        //匹配银行读取方法索引号
        this.myBankCode.forEach((ele, index) => {
            if(ele.code === bankIndex){
                bankFunIndex = ele.mark;
            }
        })
        // console.log('匹配到的方法index:', bankFunIndex);
        // console.log('匹配到的卡信息：', bankCardObj);
        var loader = new FileLoader(file, this.events, this.getFileData, this.handfuc[bankFunIndex], fileName, bankCardObj);
  }
  //获取文件名数组等
  getFileData = (dataObj) => {
        //上传多个文件数组  
        this.AllfileArr.push(dataObj);
        //上传的文件数组名
        this.fileNameArr.push(dataObj.name);
        //显示的上传文件名
        this.setState({
            sFlieShowName : this.fileNameArr.map(ele => ele)
        });
        // console.log('文件数据：',this.AllfileArr);
        // console.log('文件名：',this.fileNameArr);
  }


 //分解银行卡号
 splitBankCode = ( bankCode ) => {
        // console.log('输入卡号：', bankCode);
        var str = bankCode + '';
        var arr = str.match(/\d{1,4}/g);
        return  arr.join(' ');
 }

 //处理返回状态码
 handBackCode = (data) => {
    //  console.log('返回的状态码数据：', data);
    this.redBoxFlag = true;
    if(data.statusCode == 0 && data.detailMsg == ''){
        this.setState({
            backMess : '提交成功！！！',
            sFlieShowName : '',
            sRedError : false
        });
        this.AllfileArr = [];
        this.filesArr = [];
    }else if(data.statusCode == 1 && data.detailMsg != ''){
        this.setState({
            backMess : '本次提交的数据与数据库已有的数据时间不连续,请重新下载文件上传',
            sFlieShowName : data.detailMsg.split(','),
            sRedError : true
        });
        this.AllfileArr = [];
        this.fileNameArr = [];
    }else if(data.statusCode == 1 && data.detailMsg == ''){
         this.setState({
            backMess : '提交失败！！！' 
         })
    }
 } 
 //提交前的提示
 handTirps = (data) =>{
     this.setState({
        backMess : '文件正在提交...'
     });
 }
 //提交文档
 postFilesArr = (e) => {
    // console.log('待上传1：', this.AllfileArr);
    // console.log('待上传1：', JSON.stringify(this.AllfileArr));

     if(this.AllfileArr.length != 0){
        // console.log('待上传1：', this.AllfileArr);
        // console.log('待上传1：', JSON.stringify(JSON.stringify(this.AllfileArr)));  
        // JSON.stringify(JSON.stringify(this.AllfileArr))
        myAjax({
            url : '/commos/updateBankReconciliation',
            data : { detailsArr : JSON.stringify(this.AllfileArr)},
            type : 'POST',
            success : this.handBackCode,
            heforeSend : this.handTirps,
            // error : this.errorTirps
        });
     }
 }
//取消提示文字
cancelTirps = (e) => {
   this.setState({
       backMess : ''
    });
}
//请求错误提示
errorTirps = (XMLHttpRequest, textStatus, errorThrown) => {  
   // 状态码
   console.log('错误状态码:', XMLHttpRequest.status);
   // 状态
   console.log(XMLHttpRequest.readyState);
   // 错误信息   
   console.log(textStatus);
   this.setState({
       backMess : '网络错误！！！'
    });
}
 //处理文件编号
handFileCode = (obj) => {
    var shopCardCodeIndex = obj.shopCardCode.match(/\d{5}$/)[0];
    var bankIndex = obj.bankCode.match(/^\d{3}/)[0];
    return  bankIndex + shopCardCodeIndex;
}
//设置已读
setReadedFlag = (index) => {
    this.readedFlag[index] = true;
    this.setState({
        sreadedFlag : this.readedFlag.map(ele => ele)
    });
}

  render( ){
    var   { 
            backMess,
            bankCard,
            sFlieShowName,
            //已读标记
            sreadedFlag,
            //上传文件错误标记
            sRedError
        } = this.state;

    const {  
            bankList,
            splitBankCode,
            filesArr,
            handFileCode
        } = this;
        // console.log('店铺卡：', bankList);
        // console.log('锁定标记：', this.readBoxFlag);
        console.log('读取的全部文件：', this.AllfileArr);
        console.log('错误上传的文件：', sFlieShowName);
    return (
      <div className="handexcel mycontent">
            <Navbars index='/' />
            <div    className = 'handexcel__inpregion' 
                    onDragOver = { this.handDragOver } 
                    onDrop = { this.handDrop } 
                    >
                    请将要读取的表格拖到此区域中
            </div>
            <div className='handexcel__addflie'>
                <div className='handexcel__addflie__top'>
                    <div    className='handexcel__addflie__top__btn'
                            onClick={this.postFilesArr}
                        >提交全部文件
                    </div>
                    <i>{backMess}</i>
                </div>
                <span>已读取的文件：</span>
                <div    className='handexcel__addflie__content'>
                    {
                        sFlieShowName != '' && sFlieShowName.map((ele, index) => {
                            return(
                                <span   className = {`${ sRedError && 'falseupload' }`}
                                        key={ele + '' + index}>{
                                    '第'+ (index + 1) +'个文件:' + ele}</span>
                            );
                        })
                    }
                </div>
            </div>
        {
            bankCard !='' && <div className='handexcel__warp'>
                    <div className='handexcel__warp__title'>店铺卡信息</div>
                    <div className='handexcel__list'>
                        {
                            bankCard.map((ele, index) => {
                                return <div className='handexcel__list__card' 
                                            key={index}
                                            onClick={e => {this.setReadedFlag(index)}}>
                                    <div className="handexcel__list__top">
                                        <div className='handexcel__list__top__item1'>
                                            <span className='shopnameitem'>店铺名:</span>
                                            <span className='shopnameitem1'>{ele.shopName}</span>
                                        </div>
                                        <div className='handexcel__list__top__item2'>
                                            <span className='banknameitem'>开户行:</span>
                                            <span className='banknameitem1'>{ele.bankName}</span>
                                        </div>
                                    </div>
                                    <div className={ `handexcel__list__center ${sreadedFlag[index] && 'readedFlag'}`}>
                                        <div className='handexcel__list__center__item1'>
                                            <span className='hlcitems'>账户名:</span>
                                            <span className='hlcitems'>{ele.accountName}</span>
                                        </div>
                                        <div className='handexcel__list__center__item1'>
                                            <span className='hlcitems'>卡号:</span>
                                            <span className='hlcitems'>{splitBankCode(ele.shopCardCode)}</span>
                                        </div>
                                        <div className='handexcel__list__center__item1'>
                                            <span className='hlcitemsr hlcitems'>上传文件编号:</span>
                                            <span className='hlcitemsr hlcitems'>{handFileCode(ele)}</span>
                                        </div>
                                    </div>
                                </div>
                            })
                        }  
                    </div>
            </div>
        }
    </div>    
    );
  }
}
    
Handexcel.propTypes = {
  // data : PropTypes.array.isRequired
};
    
export default Handexcel;