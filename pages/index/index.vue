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
