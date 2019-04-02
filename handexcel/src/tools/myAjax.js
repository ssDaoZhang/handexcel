import $l from'jquery';
 
//传输 form表单 备选请求头 'multipart/form-data'
//ifModified  默认值false
//                 true :仅在服务器数据改变时获取新数据
//async  默认值true 异步请求
//            false 同步请求 
//processData 默认true  对传输的字符进行编码
//                false 不对传输的字符进行编码   

//myAjax 注释：
//obj.fileflag : 不为空 采用post上传文件

function myAjax(obj){

    //服务器地址：
    //正威
    // var urlIP = 'http://192.168.0.10:8080';
    // var urlIP = 'http://localhost:8080';
    //阿里云
    // var urlIP = 'http://www.hqb365.cn';
    //机房
    var urlIP = 'http://192.168.0.28:8080';

    // console.log(555555);
    if(!obj.fileflag){
        if(!obj.type || obj.type.toUpperCase() == 'GET'){
            // console.log(222222);
            $l.ajax({
                 type : 'GET',
                 url: urlIP + obj.url,
                 data: obj.data,
                 dataType: "jsonp",
                 jsonp: "jsoncallback",
                 jsonpCallback: 'jsoncallback',
                 success: obj.success ? obj.success : (resdata)=>{ console.log('请求成功，数据是：', resdata)},
                 error: obj.error ? obj.error : (XMLHttpRequest, textStatus, errorThrown) => {  // 状态码
                                                                        console.log(XMLHttpRequest.status);
                                                                        // 状态
                                                                        console.log(XMLHttpRequest.readyState);
                                                                        // 错误信息   
                                                                        console.log(textStatus);
                                                                        console.log('出错啦！！！')},
                //complete: obj.complete ? obj.complete : ( data1, data2)=>{ console.log('请求完成，数据是：', data1, '数据2是：', data2)},
                 beforeSend : obj.heforeSend ? obj.heforeSend : ( data1)=>{ console.log('请求发起，数据是：', data1)},
            
            });
        }else{
            // console.log('1111111');
            $l.ajax({
                type : 'POST',
                url: urlIP + obj.url,
                data: obj.data,
                success: obj.success ? obj.success : (resdata)=>{ console.log('请求成功，数据是：', resdata)},
                error: obj.error ? obj.error : (XMLHttpRequest, textStatus, errorThrown) => {   // 状态码
                                                                                                console.log(XMLHttpRequest.status);
                                                                                                // 状态
                                                                                                console.log(XMLHttpRequest.readyState);
                                                                                                // 错误信息   
                                                                                                console.log(textStatus);
                                                                                                console.log('出错啦！！！')},
                //complete: obj.complete ? obj.complete : ( data1, data2)=>{ console.log('请求完成，数据是：', data1, '数据2是：', data2)},
                beforeSend : obj.heforeSend ? obj.heforeSend : ( data1)=>{ console.log('请求发起，数据是：', data1)}
           });
        }
    }else{
        $l.ajax({
            type : 'POST',
            url: urlIP + obj.url,
            data: obj.data,
            success: obj.success ? obj.success : (resdata)=>{ console.log('请求成功，数据是：', resdata)},
            error: (error) => { console.log('出错啦！！！', error)},
            //complete: obj.complete ? obj.complete : ( data1, data2)=>{ console.log('请求完成，数据是：', data1, '数据2是：', data2)},
            beforeSend : obj.heforeSend ? obj.heforeSend : ( data1)=>{ console.log('请求发起，数据是：', data1)},
            processData: false, // 告诉jQuery不要去处理发送的数据
    		cache: false, //上传文件不需要缓存
    		contentType: false,//告诉jQuery不要去设置Content-Type请求头
       });
    } 
}

export default myAjax;