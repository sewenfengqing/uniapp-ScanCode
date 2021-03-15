import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


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


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
