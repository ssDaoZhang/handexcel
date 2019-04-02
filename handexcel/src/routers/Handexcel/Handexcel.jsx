import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import $l from 'jquery';
import FileLoader from './loadFlie';
import handData from './handData';
import './Handexcel.css';
import './table.css';
import Tablerow from './Tablerow';
import XLSX from 'xlsx';
import ProgressBar from '../../components/ProgressBar';
import SelectBC from './SelectBankCard/SelectBC';
import Navbars from '../Navbars/Navbars';
import myAjax from '../../tools/myAjax';
class Handexcel extends Component {
  constructor(props){
    super(props);
    this.state = {
        color : '#ccc',
        backg_width : 0,
        tableData : '',
        fileflow : '',
        inputCarCodeFlag : false,
        codeValue : '',
        codeErrMess : '',
        progressFlag : false,
        progressPer : 0,
        //选择上传的银行本地代号
        bankNameCode : '',
        //用户选择要上传的卡信息
        shopName : '',
        bankName : '',
        accountName : '',
        shopCardCode : '',
        bankCode:'',
        //想后端请求的银行卡列表
        bankList : '',
        //选择银行卡下拉表flag
        bankListFlag : false,
        fileNameArr : '',
        //返回信息
        backMess : '',
        //上传多个文件数组
        flieShowName : '',
    };
    this.events = {
        load: function(data){
        },
         progress: '', 
        loadSuccess: function(){
            // console.log('success!!!');
        }
    }
    this.bankName = [
        {
            name : '民生',
            mark : 0
        },
        {
            name : '建行',
            mark : 1
        },
        {
            name : '工商',
            mark : 2
        },
        {
            name : '村镇',
            mark : 3
        },
        {
            name : '平安',
            mark : 4
        },
        {
            name : '农业',
            mark : 5
        },
        {
            name : '中国银行',
            mark : 6
        },
        {
            name : '兴业',
            mark : 7
        }
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
    this.tableItem = [
        {tallyDate : '记账日' },
        {tradeDate : '交易日期'},
        {tradeTime : '交易时间'},
        {tradePlace : '交易地点'},
        {pay : '支出'},
        {income : '收入'},
        {balance : '账户余额'},       
        {oppoAccount : '对方户名'},
        {oppoCode : '对方账号'},
        {oppoBank : '对方开户行'},
        {currency : '币种'},        
        {type : '钞/汇'},
        {abstract : '摘要'},
        {PS : '附言'},
        {tradeTbue : '交易渠道/场所'},
        {country : '交易国家或地区简称'},
        {method : '交易方式'},
        {fNum : '交易流水号'}
    ];
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
    ]
    this.timer = null;
    this.bankList = [];
    this.bankArr = [];
    //添加的文件名
    this.fileName = '';
    //文件名数组
    this.fileNameArr = [];
    //文件数组
    this.filesArr = [];
    //上传多个文件数组
    this.AllfileArr = '';
  };
  componentDidMount(){
    if(!this.events.progress){
        this.events.progress = (percent) => {
            var tempnum1 = parseInt(percent);
            this.setState({
                progressPer : tempnum1/100
            })
        }
    }
    this.bankList = [
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
            "shopCardCode":'6222034000013243732',
            "bankCode":"102584002805",
            "bankName":"中国工商银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"张宇宙",
            "bankAddress":"老王"
        },
        {
            "shopCardCode":'6226220636247123',
            "bankCode":"305584018213",
            "bankName":"中国民生深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"张宇宙",
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
            "shopCardCode":'6230520120022706174',
            "bankCode":"103584003267",
            "bankName":"中国农行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"翟李阳",
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
            "shopCardCode":'6230520120015495371',
            "bankCode":"103584003267",
            "bankName":"中国农业银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"单保清",
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
            "shopCardCode":'6226220636872961',
            "bankCode":"305584018213",
            "bankName":"中国民生银行深圳分行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
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
            "shopCardCode":'6213471011000886473',
            "bankCode":"320584006006",
            "bankName":"深圳福田银座村镇银行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
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
            "shopCardCode":'6230580000188338896',
            "bankCode":"307584008089",
            "bankName":"中国平安银行深圳市人民南支行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"王圻亮",
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
            "shopCardCode":'6213471011000868323',
            "bankCode":"320584006006",
            "bankName":"深圳福田银座村镇银行",
            "shopName":"999总店",
            "shopID":"0001",
            "accountName":"李云",
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
        }    
    ];
    this.setState({
        bankList : this.bankList
    });
};
  handDragOver = (e) => {
    this.getTableData('');
    this.setProgressFlag(true);
    this.setProgressPer(0);
    if(this.state.fileflow !== ''){
        this.getFileflow({file:'', flag: false});
    }
    e.preventDefault();
    this.setState({
        color : '#26ae5f'
    })
  };

  handDrop = (e) => {
    e.preventDefault();
    const { bankNameCode } = this.state;
    //判断是否选择银行卡
    // if(bankNameCode === ''){
    //     this.setState(
    //         {
    //             backMess : '请先选择银行卡！！！'
    //         }
    //     );
    //     return;
    // }
    var tarFile1 = e.dataTransfer.files;
    console.log('拖拽读取的文件1:', tarFile1);
    this.AllfileArr = e.dataTransfer.files;
    console.log('拖拽读取的文件2:', this.AllfileArr);
    var nameArr = [];
    var 
    for(var attr in tarFile1){
        nameArr.push(tarFile1[attr].name);
    } 
    console.log('文件名数组：', nameArr);
    // this.setState({
    //     flieShowName : tarFile1.map(ele => ele.name)
    // });
    
    // var inputFileType = tarFile1.name.match(/\.\w*$/)[0];
    // this.fileName = tarFile1.name;
    // if(inputFileType == '.xlsx' || inputFileType == '.xlsm' || inputFileType == '.xlsb' || inputFileType == '.xls'){

    //     var loader = new FileLoader(tarFile1, this.events, this.getFileflow, this.getTableData, this.handfuc[bankNameCode]);
    // }else{
    //     this.setState(
    //         {
    //             backMess : '请确保您提交的是表格文件!!!'
    //         }
    //     );
    //     // alert('请确保您提交的是表格文件!!!');
    //     window.location.reload();
    // }
    this.setState({
        color : '#26ae5f'
    })
  };

  handChange = (e) => {
    e.preventDefault();
    const { bankNameCode } = this.state;
    // console.log('选择的银行代码：', bankNameCode);
    //判断是否选择银行卡
    // if(bankNameCode === ''){
    //     this.setState(
    //         {
    //             backMess : '请先选择银行卡号！！！'
    //         }
    //     );
    //     return;
    // }
    var tarFile2 = e.target.files;
    console.log('input读取的文件:', tarFile2);
    // var inputFileType = tarFile2.name.match(/\.\w*$/)[0];
    // this.fileName = tarFile2.name;
    // if(inputFileType == '.xlsx' || inputFileType == '.xlsm' || inputFileType == '.xlsb' || inputFileType == '.xls'){
    // //   console.log('传入前的函数：', this.handfuc[this.bank]);
    //   var loader = new FileLoader(tarFile2, this.events, this.getFileflow, this.getTableData, this.handfuc[bankNameCode]);
    // }else{
    //     alert('请确保您提交的是表格文件!!!');
    //     window.location.reload();
    // }
  };
//   handSelect = (e) =>{
//       this.bank = e.target.value;
//       console.log('下拉列表的值是：', this.bank);
//   };

  onClickLabel = (e) => {
    this.getTableData('');
    this.setProgressFlag(true);
    this.setProgressPer(0);
    if(this.state.fileflow !== ''){
        this.getFileflow({file:'', flag : false});
    }
  };
  getTableData = (data) => {
      this.setState({
          tableData : data
      });
  };
  getFileflow = (data) => {
    this.setState({
        fileflow : data.file,
        inputCarCodeFlag : data.flag
    });
  };

//   handInputCarCode = (e) => {
//     var codeValue = this.state.codeValue;
//     if(codeValue && 
//         ( (codeValue.match(/\d{16}/g) && codeValue.length == 16) || 
//           (codeValue.match(/\d{17}/g) && codeValue.length == 17) ||
//           (codeValue.match(/\d{19}/g) && codeValue.length == 19)
//         )
//     ){
//         // console.log('this.carCode:', codeValue);
//         var res = null;
//         var { fileflow } = this.state;
//         // myAjax({data : codeValue, callback : (resdata) => { res = resdata}, url:'', method : 'POST', cache : false});
//         var rang = fileflow['!ref'].replace('A1',this.handfuc[res].bankT);
//         fileflow['!ref'] = rang;
//         this.handfuc[res].bankHand(
//             {
//                  data  : JSON.parse(  JSON.stringify(XLSX.utils.sheet_to_json( fileflow ))),
//                  carCode : codeValue,
//                  getData : this.getTableData
//             }    
//         )
//        this.setState({
//             codeValue : '',
//             inputCarCodeFlag : false
//         })
//     }else{
//             this.setState({
//                 codeErrMess : '您输入的号码不正确，请查证后再输！'
//             });
//     }
//   }
  setProgressFlag = (data) => {
    this.setState({
        progressFlag : data
    })
  }
  setProgressPer = (data) => {
    this.setState({
        progressPer : data
    })
  }
  handInput = (e)=>{
    this.setState({
        codeValue : e.target.value
    })
  }
  getBankNameCode = ( backCode ) => {
    this.setState({
        bankNameCode : backCode
    });
  }

  //从SelectBC组件中获取用户选择的银行卡信息
  getUserSelectedBC = (obj) =>{
        // console.log('用户选择的银行卡信息：', obj);
        const { myBankCode } = this;
        var bankNameCode = '';
        myBankCode.forEach((ele, index) => {
            if(obj.bankCode.substr(0, 3) == ele.code){
                bankNameCode = ele.mark;
            }
        });
        this.setState({
            bankNameCode : bankNameCode,
            shopName : obj.shopName,
            bankName : obj.bankName,
            accountName : obj.accountName,
            shopCardCode : obj.shopCardCode,
            bankCode:obj.bankCode,
            backMess : ''
        });
        this.setState(preState => {
            return { bankListFlag : !preState.bankListFlag};
        });
  }
  //显示选择银行卡列表
  showBankList = (e) => {
      this.setState({
        bankListFlag : true
      });
  }
 //分解银行卡号
 splitBankCode = ( bankCode ) => {
        // console.log('输入卡号：', bankCode);
        var str = bankCode + '';
        var arr = str.match(/\d{1,4}/g);
        return  arr.join(' ');
 }
 //添加文件操作
 appendFiles = (e) => {
    const { fileName, fileNameArr, filesArr } = this;
    const { 
            //获取的读取详细数据
            tableData,
            bankCode,
            shopName,
            bankName,
            accountName,
            shopCardCode
        } = this.state;
    if(fileName != '' && tableData != ''){
        fileNameArr.push(fileName);
        filesArr.push({
                        bankCode:bankCode,
                        shopName:shopName,
                        bankName:bankName,
                        accountName:accountName,
                        shopCardCode:shopCardCode,
                        detailsArr:tableData
                    });
        this.setState({
            fileNameArr : fileNameArr.map(ele=>ele)
        });
    }
    this.fileName = '';
    this.setState({
        tableData : ''
    });
 }
 //处理返回状态码
 handBackCode = (data) => {
     console.log('返回的状态码数据：', data);
    if(data.statusCode == 0 && data.detailMsg == ''){
        this.setState({
            backMess : '提交成功！！！',
            fileNameArr : ''
        });
        this.fileNameArr = [];
        this.filesArr = [];
    }else if(data.statusCode == 0 && data.detailMsg != ''){
        this.setState({
            backMess : '本次提交的数据与数据库已有的数据时间不连续,请重新下载文件上传',
            fileNameArr : ''
        });
        this.fileNameArr = [];
        this.filesArr = [];
    }else{
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
     if(this.filesArr.length != 0){
        myAjax({
            url : '/commos/updateBankReconciliation',
            data : { detailsArr : JSON.stringify(this.filesArr)},
            type : 'POST',
            success : this.handBackCode,
            heforeSend : this.handTirps,
            error : this.errorTirps
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
 errorTirps = (e) => {
    this.setState({
        backMess : '网络错误！！！'
     });
 }
  render( ){
    var   { inputCarCodeFlag, color, tableData, fileflow, codeValue, 
            codeErrMess, progressFlag, progressPer, bankNameCode,
            bankListFlag,
            bankName,
            accountName,
            shopCardCode,
            fileNameArr,
            backMess
        } = this.state,
            tableItem = this.tableItem;
    const {  
            getBankNameCode, 
            bankList, 
            getUserSelectedBC,
            showBankList,
            splitBankCode,
            filesArr,
            appendFiles
        } = this;
        // console.log('银行卡数据：', bankList);
        // console.log('请求提示语：', backMess);
        // console.log('上传的文件数据：', this.filesArr);
        console.log('读取的文件名数组', this.state.fileNameArr );
        console.log('读取的文件数：', this.AllfileArr);
    return (
      <div className="handexcel mycontent">
            <Navbars index='/' />
            <div className='handexcel__trips'>
                <span   className='handexcel__trips__it1'
                        onMouseEnter={this.cancelTirps}
                        onClick={showBankList}>
                        点击选择银行卡</span>
                <div className='handexcel__trips__it2'>
                    <span className='spanitem itemd1'><span>已选银行卡开户行：</span><i className='itd1'>{bankName && bankName}</i></span> 
                    <span className='spanitem itemd2'><span>已选银行卡账户名：</span><i className='itd2'>{accountName && accountName}</i></span>
                    <span  className='spanitem itemd3'><span>已选银行卡号：</span><i className='itd3'>{shopCardCode && splitBankCode(shopCardCode)}</i></span>
                </div>
            </div>            
            <input  id='flie' className='handexcel__input' type="file" onChange={this.handChange}/>
            <label htmlFor="flie" onClick={this.onClickLabel}>点击选择读取的excel表格</label>
            <div className='handexcel__box'>
            { progressFlag && <div className='handexcel__warp'>
                <span className='handexcel__char'>读取进度：</span>
                <div className='handexcel__bar'><ProgressBar percent={progressPer} width={100} height={10}/></div>
                <span className='handexcel__pro'>{progressPer * 100 + '%'}</span>
            </div>}
            </div>
            <div    className = 'handexcel__inpregion' 
                    onDragOver = { this.handDragOver } 
                    onDrop = { this.handDrop } 
                    style = {{
                                backgroundColor: color
                            }}>
                    请将要读取的表格拖到此区域中
            </div>
            {
                tableData !== '' &&
                <div className='handexcel__tablewarp'> 
                <div className='handexcel__warpbox'>
                <table className='handexcel__table'>
                    <thead>
                        <tr>
                            {   
                                tableData !== '' &&
                                tableItem.map((ele, index) => {
                                    var tag = Object.keys(ele)[0];
                                    if(tableData[0][tag] !== -1){
                                        return <th key={tag}>{ele[tag]}</th>
                                    }
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                tableData !== '' &&
                                tableData.map((ele, index) => {
                                        return <Tablerow dataObj={ele} key={index}/>                                    
                                })
                            }
                        </tbody>            
                </table>
                </div>
                </div>
            }
        {bankListFlag && <SelectBC data={bankList} callFuc={getUserSelectedBC}/>}
        <div className='handexcel__addflie'>
            <div className='handexcel__addflie__top'>
                <div    className='handexcel__addflie__top__btn'
                        onClick={appendFiles}
                    >添加已读取文件
                </div>
                <div    className='handexcel__addflie__top__btn'
                        onClick={this.postFilesArr}
                    >提交全部文件
                </div>
                <i>{backMess}</i>
            </div>
            <span>您提交的文件：</span>
            <div    className='handexcel__addflie__content'>
                {
                    fileNameArr && fileNameArr.map((ele, index) => {
                        return(
                            <span key={ele + '' + index}>{ele}</span>
                        );
                    })
                }
            </div>
        </div>
        <div>
        </div>
    </div>    
    );
  }
}
    
Handexcel.propTypes = {
  // data : PropTypes.array.isRequired
};
    
export default Handexcel;