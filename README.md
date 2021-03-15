# uniapp-ScanCode
uniapp中实现前置或后置扫码

 1. main.js中封装（封装了版本更新的业务处理）
```
Vue.prototype.gotoScanCode = function(param){
    const myScanCode = uni.requireNativePlugin('Ly-ScanCode');
        console.log("gotoScanCode-cameraId:" + param.cameraId);
    var cameraId_int = parseInt(param.cameraId);
    
    var options = {
        scanType:['QR','EAN13','EAN8','PDF_417'],//扫码类型
        prompt:'将二维码/条形码放入框内，即可自动扫描',//扫码提示语
        // locked:true,//方向是否锁定、旋转(默认true)
        // beepEnabled:true,//扫码完成是否有提示音(默认true)
        // imageEnabled:false,//扫码成功时是否保存二维码图片(默认false)
        // cameraId : 1, //使用指定的相机ID(摄像头前1后0,默认0)
        cameraId : cameraId_int,
    };
    myScanCode.scanCode(options, res => {//res:{"result":"https://qr.alipay.com/cpx05564fwylkybgq7dxjb9","scanType":"QR_CODE","success":"true"}
        console.log("gotoScanCode-扫码res:" + JSON.stringify(res));
        // uni.showModal({
        //     title: '条码类型：' + res.scanType + "",
        //     content: '条码内容：' + res.result + ""
        // });
        if(res.result && res.result != "" && res.result != "用户取消" ){
            typeof param.success == "function" && param.success(res);
        }
    });
    
}
```
2. index.vue中调用
```
<template>
    <view>
        <button @click="scanTest('0')">后置扫码</button>
        <button @click="scanTest('1')">前置扫码</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            //扫码
scanTest:function(flag){
    // #ifndef H5
    this.gotoScanCode({
                            cameraId:flag,
        success:function(res){
            console.log("扫码res:" + JSON.stringify(res));
            uni.showModal({
                title: '条码类型：' + res.scanType + "",
                content: '条码内容：' + res.result + ""
            });    
        }
    });  
    // #endif    
},
        }
    }
</script>

<style>

</style>

```
3. 备注
* 下载插件后放到项目根目录下的nativeplugins文件夹（自建）
* 在manfest.json中配置该原生插件：manfest.json->App原生插件配置->选择该本地原生插件
* 原生插件配置之后，需选择自定义基座运行才能生效：创建自定义基座 —> 选择自定义基座

