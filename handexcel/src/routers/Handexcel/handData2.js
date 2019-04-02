var handData = {
    minSheng : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        // console.log('传入的对象：', obj);
        // console.log('民生：');
        var dataArr = [];
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易时间'],
                tradeTime : -1,
                tradePlace : -1,
                pay : ele['支出金额'] || '0',
                income : ele['存入金额'] || '0',
                balance : ele['账户余额'],
                oppoAccount : ele['对方名称'] || '',
                oppoCode : ele['对方账号'] || '',
                oppoBank : ele['对方开户行'] || '',
                currency : 'rmb',
                type : -1,
                abstract : ele['摘要'],
                PS : -1,
                tradeTbue : -1,
                country : -1,
                method : ele['交易方式'],
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);

        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    }, 
    jianHang : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        
        var dataArr = [];
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            var flag = true;
            if( !ele["记账日          "] ){
                flag = false;
            }else if( !ele["记账日          "].match(/\d{4}/g) ){
                flag = false;
            }
            if(flag){
                dataArr.push({
                    tallyDate : ele["记账日          "],
                    tradeDate : ele["交易日期          "],
                    tradeTime : ele["交易时间                "],
                    tradePlace : ele["交易地点                "],
                    pay : ele["支出                "] || '0',
                    income : ele["收入                "] || '0',
                    balance : ele["账户余额          "],
                    oppoAccount : ele["对方账号          "] || '',
                    oppoCode : ele["对方户名          "] || '',
                    oppoBank : -1,
                    currency : ele["币种          "],
                    type : -1,
                    abstract : ele["摘要            "],
                    PS : -1,
                    tradeTbue : -1,
                    country : -1,
                    method : -1,
                    fNum : -1
                })
            }
        });
        // console.log('最终的数据：', dataArr);
        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    },
    gongShang : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var regD1 = /-/g;
        var dataArr = [];
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            var flag = true;
            if( !ele['交易日期'] ){
                flag = false;
            }else if( !ele['交易日期'].match(/\d{4}/g) ){
                flag = false;
            }
            if(flag){
                dataArr.push({
                    tallyDate : -1,
                    tradeDate : ele['交易日期'].replace(regD1, ''),
                    tradeTime : -1,
                    tradePlace : ele['交易场所']||'',
                    pay : ele['记账金额(支出)'] || '0',
                    income : ele['记账金额(收入)'] || '0',
                    balance : ele['余额'],
                    oppoAccount : ele['对方户名'] || '',
                    oppoCode : -1,
                    oppoBank : -1,
                    currency : ele['记账币种']||'',
                    type : ele['钞/汇']||'',
                    abstract : ele['摘要']||'',
                    PS : -1,
                    tradeTbue : -1,
                    country : ele['交易国家或地区简称']||'',
                    method : -1,
                    fNum : -1
                });
            }

        });
        dataArr.reverse();
        // console.log('最终的数据：', dataArr);
        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    }, 
    cunZhen : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var regD = /\b\d*-\d*-\d*/;
        var regT = /\b\d*:\d*:\d*/;
        var regD1 = /-/g;
        var regT1 = /:/g;
        var dataArr = [];
        obj.data.reverse().forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易时间'].match(regD)[0].replace(regD1, ''),
                tradeTime : ele['交易时间'].match(regT)[0],
                tradePlace : -1,
                pay : ele['支出'] || '0',
                income : ele['收入'] || '0',
                balance : ele['余额'] || '0',
                oppoAccount : ele['对方名称'] || '',
                oppoCode : ele['对方账号'] || '',
                oppoBank : -1,
                currency : -1,
                type : -1,
                abstract : ele['摘要'],
                PS : ele['附言'],
                tradeTbue : -1,
                country : -1,
                method : -1,
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);
        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    }, 
    pingAn : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var regD = /\b\d*-\d*-\d*/;
        var regT = /\b\d*:\d*:\d*/;
        var regD1 = /-/g;
        var regT1 = /:/g;
        var dataArr = [];
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易时间'].match(regD)[0].replace(regD1, ''),
                tradeTime : ele['交易时间'].match(regT)[0],
                tradePlace : -1,
                pay : ele['交易类型'] == '转出' ? ele['交易金额'] :  '0',
                income : ele['交易类型'] == '转入' ? ele['交易金额'] :  '0',
                balance : ele['账户余额'] || '0',
                oppoAccount : ele['交易方姓名'] || '',
                oppoCode : ele['交易方账号'] || '',
                oppoBank : -1,
                currency : -1,
                type : -1,
                abstract : ele['摘要'] || '',
                PS : ele['备注'] || '',
                tradeTbue : -1,
                country : -1,
                method : -1,
                fNum : ele['交易流水号']
            })
        });
        // var item1 = dataArr.shift();
        // var item2 = dataArr.shift();
        dataArr.reverse();
        // dataArr.unshift(item2);
        // dataArr.unshift(item1);
        // console.log('最终的数据：', dataArr);
        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    }, 
    nongYe : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var dataArr = [];
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            // console.log('交易金额：', ele['交易金额']);
            // console.log(ele['交易时间']);
            function handTime(time){
                var jiaoyishijianArr,jiaoyishijianStr;
                if(time != ""){
                    jiaoyishijianArr =  time.match(/\d{2}/g);
                    jiaoyishijianStr = jiaoyishijianArr[0] +':'+ jiaoyishijianArr[1] + ':' + jiaoyishijianArr[2]; 
                    return jiaoyishijianStr;
                }else{
                    return '';
                }
            }
            // var jiaoyishijianArr =  ele['交易时间'].match(/\d{2}/g);
            // var jiaoyishijianStr = jiaoyishijianArr[0] +':'+ jiaoyishijianArr[1] + ':' + jiaoyishijianArr[2];
            // console.log('交易时间:',jiaoyishijianArr);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易日期'],
                tradeTime : handTime(ele['交易时间']),
                tradePlace : ele['交易行'],
                pay : ele['交易金额'] < 0 ? ele['交易金额'].match(/\d*\b/)[0] :  '0',
                income : ele['交易金额'] > 0  ? ele['交易金额'].match(/\d*\b/)[0] :  '0',
                balance : ele['本次余额'] || '0',
                oppoAccount : ele['对方户名'] || '',
                oppoCode : ele['对方账号'] || '',
                oppoBank : -1,
                currency : -1,
                type : -1,
                abstract : ele['交易摘要'] || '',
                PS : ele['交易用途'] || '',
                tradeTbue : ele['交易渠道'] || '',
                country : -1,
                method : ele['交易类型'] || '',
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);
        dataArr.reverse();
        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    },
    zhongHang : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        // console.log('建行', obj.data[0]);
        // console.log('建行', obj.data[1]);
        // console.log('建行', obj.data[2]);
        // console.log('建行', obj.data[3]);
        // console.log('建行', Object.keys(obj.data[0]));
        // console.log('传入处理函数的数据：', obj.data);

        var dataArr = [];
        obj.data.forEach((ele, index) =>{
            // var dateStr =  handData.handDate(ele['交易日期']);
            // console.log('日期：', dateStr);
        //     // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : handData.handDate(ele['交易日期']),
                tradeTime : -1,
                tradePlace : -1,
                pay : ele['支出金额'] ? ele['支出金额'] + '' : '0',
                income : ele['收入金额'] ? ele['收入金额'] + '' : '0',
                balance : ele['余额'] ? ele['余额'] + '' : '0',
                oppoAccount : ele['对方账户名称'] || '',
                oppoCode : ele['对方账户账号'] || '',
                oppoBank : -1,
                currency : ele['币种'] || '',
                type : ele['钞/汇'] || '',
                abstract : ele['业务摘要'] || '',
                PS : ele['附言'] || '',
                tradeTbue : ele['交易渠道/场所'] || '',
                country : -1,
                method : -1,
                fNum : -1
            })
        });
        // // console.log('最终的数据：', dataArr);
        dataArr.reverse();
        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    },  
    xingye : (obj) => {
        // console.log(obj);
        var dataArr = [];
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            // console.log('交易日期：', ele['交易时间'].split(' ')[0], '交易时间：', ele['交易时间'].split(' ')[1]);
            dataArr.push({
                tallyDate : ele['记账日'].replace(/-/g, ''),
                tradeDate : ele['交易时间'].split(' ')[0].replace(/-/g, ''),
                tradeTime : ele['交易时间'].split(' ')[1],
                tradePlace : -1,
                pay : ele['支出'] ? ele['支出'] + '' : '0',
                income : ele['收入'] ? ele['收入'] + '' : '0',
                balance : ele['账户余额'] ? ele['账户余额'] + '' : '0',
                oppoAccount : ele['对方户名'] || '',
                oppoCode : ele['对方账号'] || '',
                oppoBank : ele['对方银行'] || '',
                currency : -1,
                type : -1,
                abstract : ele['摘要'] || '',
                PS : ele['用途'] || '',
                tradeTbue : ele['交易渠道'] || '',
                country : -1,
                method : -1,
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);
        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    },   
    zhaohang : (obj) => {
        // var dateStr = this.handData(obj.data['交易日期']);
        // console.log('日期：', dateStr);
        // console.log('招商银行：', obj);
        var dataArr = [];
        obj.data.reverse();
        if(obj.data[1]['交易日期'].match(/\D/g)){
            obj.data.splice(0, 2);
        }
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            // console.log('交易日期：', ele['交易时间'].split(' ')[0], '交易时间：', ele['交易时间'].split(' ')[1]);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易日期'],
                tradeTime : ele['交易时间'],
                tradePlace : -1,
                pay : ele['支出'] ? ele['支出'] + '' : '0',
                income : ele['收入'] ? ele['收入'] + '' : '0',
                balance : ele['余额'] ? ele['余额'] + '' : '0',
                oppoAccount : -1,
                oppoCode : -1,
                oppoBank : -1,
                currency : -1,
                type : -1,
                abstract : ele['交易备注'] || '',
                PS : -1,
                tradeTbue : -1,
                country : -1,
                method : ele['交易类型'],
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);
        obj.getData({
            data : {
                detailsArr : dataArr,
                bankCode:obj.mess.bankCardObj.bankCode,
                shopName:obj.mess.bankCardObj.shopName,
                bankName:obj.mess.bankCardObj.bankName,
                accountName:obj.mess.bankCardObj.accountName,
                shopCardCode:obj.mess.bankCardObj.shopCardCode,
            },
            name : obj.mess.fileName
        });
    },
    handDate: (daynum) => {
        var daynumbase = 25569;  //计算计时原点 1970/01/01
        var dValue = ( daynum  - daynumbase ) * 24 * 60 * 60 * 1000;
        var d = new Date();
        d.setTime(dValue);
        var datestr =d.toLocaleDateString();
        // var datestr = '2018/10/12';
        // console.log('原日期：', datestr);
        var regCenter = /\/\d{1}\//;
        var regLast = /\/\d{1}$/g;
        var centerstr = datestr.match(regCenter) && datestr.match(regCenter)[0]; 
        var laststr = datestr.match(regLast) && datestr.match(regLast)[0];
        // console.log('centerstr:', centerstr, 'laststr:', laststr);
        var deststr;
        if(!centerstr && laststr){
            deststr = datestr.replace(regLast, '0' + laststr.match(/\d/)[0]);
            // console.log('情况1首次处理：', deststr);
            deststr = deststr.replace('/', '');
            // console.log('情况1：', deststr);
            return deststr;
        }
        if(!centerstr && !laststr){
            var dateArr = datestr.match(/\d{2}/g);
            // console.log('情况2：', dateArr.join(''));
            return dateArr.join('');
        }
        if( centerstr && !laststr){
            deststr = datestr.replace(centerstr, '0' + centerstr.match(/\d/)[0]);
            // console.log('情况3：', deststr);
            return deststr;
        }
        if( centerstr && laststr){
            deststr = datestr.replace(centerstr, '0' + centerstr.match(/\d/)[0] + '/');
            // console.log('情况4首次处理：', deststr);
            deststr = deststr.replace(regLast, '0' + laststr.match(/\d/)[0]);
            // console.log('情况4：', deststr);
            return deststr;
        }
    }
}

export default handData;