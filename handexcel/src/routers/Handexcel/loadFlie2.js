import $ from 'jquery';
import XLSX from 'xlsx';
// import myAjax from './myAjax';
var events = {
    load: function(data){
        // console.log('111:',data);
    },
    progress: function(percent){
        var tempnum1 = parseInt(percent);
        var tempnum2 = tempnum1 * 2;
       $('.backg').eq(0).css({
            'width':tempnum2 + 'px'
        });
        $('.warp span').eq(0).text(tempnum1 + '%');
    },
    loadSuccess: function(){
        console.log('success!!!');
    }
}

var FileLoader = function(file, events, getCall, handDataArr, fileName, bankCardObj){
    this.reader = new FileReader();
    this.file = file;
    this.loaded = 0;
    this.total = file.size;
    // this.getFile = getFile;
    // this.handData = obj.bankHand;
    // this.banktag = obj.bankT;
    this.getTableData = getCall;
    this. handDataArr =  handDataArr;
    //传入的文件名
    this.fileName = fileName;
    //银行卡信息对象
    this.bankCardObj = bankCardObj;
    // this.code = code;
    //设置每次读取的数据量
    this.step = 1024 * 1024;
    this.events = events || {};
    this.tesults = 0;
    this.fileflow = null;
    this.filelen = null;

    //读取小段文件
    this.readBlob(0);
    //绑定FileReader事件
    this.bindEvent();
    // console.log('构造函数里的卡号：', code);
}

FileLoader.prototype = {
    bindEvent: function(){
        //兼容性转换文件数据格式代码
        // function fixdata(data) { //文件流转BinaryString
        //     var o = "",
        //         l = 0,
        //         w = 10240;
        //     for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        //     o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        //     return o;
        // }
        var _this = this,
            reader = this.reader;

        reader.onload = function(e){
            _this.onLoad();
            var data = e.target.result;
            _this.handExcel(data);
        };
        reader.onprogress = function(e){
            _this.onProgress(e.loaded);
        }
        reader.onerror = function(e){
            if(reader){
                reader.abort();
                console.log('error!!!');
            }
        }
        
    },

    onProgress: function(loaded){
        // console.log('e.loaded:', loaded);
        // console.log('this.total:', this.total);
        var percent,
            handler = this.events.progress;
        this.loaded += loaded;
        // console.log('this.loaded1:', this.loaded);
        percent = (this.loaded / this.total) * 100;
        // console.log('percent:',percent);
        handler && handler(percent);
    },

    onLoad: function(){
        // console.log('this.loaded2:', this.loaded);
        if(this.loaded < this.total){
            this.result += this.reader.result;
            this.readBlob(this.loaded);
        } else {
            this.loaded = this.total;
            this.events.loadSuccess && this.events.loadSuccess();
            var handler = this.events.load;
            handler && handler( this.result);
        }
    },

    readBlob: function(start){
        var blob,
            file = this.file;
        if(file.slice){
            blob = file.slice(start, (start + this.step) > this.total ? this.total : start + this.step);
        } else {
            blob = file;
        }
        //处理表格数据用这个
        this.reader.readAsBinaryString(blob);
    },

    abort: function(){
        var reader = this.reader;
        if(reader){
            reader.abort();
        }
    },

    handExcel: function(data){
        var wb;
        var _this = this;
        wb = XLSX.read(data, {
            type: 'binary'
        });

        var f_sheet_name = wb.SheetNames[0];
        var worksheet = wb.Sheets[f_sheet_name];
        _this.fileflow = worksheet;
        // console.log('文件数据处理1：', _this.fileflow);
        _this.filelen = worksheet['!ref'];
         _this.handAjax();            
    },
    //处理读取的文档流***********************************************************************************
    handAjax: function(){//carCode
        var _this = this;
        
        // var res = null;
        var rang = _this.filelen.replace('A1', _this.handDataArr.bankT);
        // var rang = _this.filelen.replace('A1', 'A1');
        _this.fileflow['!ref'] = rang; 
        //解析后的数据
        // console.log('解析前的数据：', _this.fileflow);
        var parseFileFlow = JSON.parse(  JSON.stringify(XLSX.utils.sheet_to_json( _this.fileflow)));
        // console.log('解析后的文件数据：', parseFileFlow );
        // try{
            _this.handDataArr.bankHand(
                {
                    data  : parseFileFlow,
                    mess : {
                        fileName : _this.fileName,
                        bankCardObj : _this.bankCardObj
                    },
                    getData : _this.getTableData
                }    
            );
        // }catch(err){
        //     console.log('错误：',err);
        //     _this.getTableData('');
        //     alert('已选择的银行卡与读取的文件银行不匹配！！！');
        // }
    }
    //**************************************************************************************************

}

function getType(data){
    var typeTag = Object.prototype.toString.call(data);
    var tag;
    switch(typeTag){
        case '[object String]' : tag ='string';
            break;
        case '[object Number]' : tag ='number';
            break;
        case '[object Boolean]' : tag ='boolean';
            break;
        case '[object Undefined]' : tag ='undefined';
            break;
        case '[object Null]' : tag ='null';
            break;
        case '[object Object]' : tag ='object';
            break;
        case '[object Array]' : tag ='array';
            break;
        case '[object Date]' : tag ='date';
            break;
        case '[object RegExp]' : tag ='regexp';
            break;                          
    }
    return tag;
}

function getCarStr(obj){
    var destCarStr = '',
        inputdata,
        inputRegTag, 
        reg = /\d{16,19}/g;

    inputdata =  obj.data; 
    // console.log('A1的信息：', inputdata['A1'] && inputdata['A1']);
    // console.log('A1的信息：', inputdata['A1'] && inputdata['A1'].v);
    // console.log('A1的类型：', inputdata['A1'] && getType(inputdata['A1'].v));
    inputRegTag = inputdata['A1'] && inputdata['A1'].v.match(reg);
    if(inputRegTag){
        destCarStr = inputRegTag[0];
        // console.log('匹配到的卡号：',destCarStr)
        return destCarStr;
    // }else if(inputdata['D1'] && inputdata['D1'].v ==='交易明细查询列表'){
    //     console.log('您上传的文件中未提供卡号信息，请手动输入您上传的表格对应得卡号！！！');
    //     return;
    }else{
        var carRange = obj.searchRang;
        inputdata['!ref'] = carRange;
        var carRangeobj = JSON.parse(JSON.stringify( XLSX.utils.sheet_to_json(inputdata)));
        // console.log('匹配到的字符串处理之前的信息：',carRangeobj);
        if(getType(carRangeobj) === 'array'){
            carRangeobj.forEach(function(ele, index){
                for(var attr in ele){
                    // console.log(attr, ':', ele[attr]);
                    destCarStr = destCarStr + ele[attr];
                }
            })
        }
        // console.log('匹配到的字符串(处理前)：',destCarStr);
        var tempmatcharr = destCarStr.match(reg);
        var jiaoyindex = destCarStr.indexOf('交易');
        var carCodeindex;//&& tempmatcharr.length == 1
        if(tempmatcharr){
            carCodeindex = destCarStr.indexOf(tempmatcharr[0]);
            if(jiaoyindex !== -1 && jiaoyindex < carCodeindex){
                // console.log('错误匹配的卡号：', tempmatcharr[0]);
                // console.log('您上传的文件中未提供卡号信息，请手动输入您上传的表格对应得卡号！！！');
                return 0;
            }else{
                destCarStr = tempmatcharr[0];
                // console.log('匹配到的卡号：',destCarStr);    
                return destCarStr;
            }
        }else{
            // console.log('您上传的文件中未提供卡号信息，请手动输入您上传的表格对应得卡号！！！');
            return 0;
        }
    }
}

export default FileLoader;
