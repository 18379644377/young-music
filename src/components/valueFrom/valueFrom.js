import Vue from "vue"
import { Dialog } from "vant"

Vue.use(Dialog)

export default{
    
    // 手机号验证
    valuePhone(value){
        return /^1[3456789]\d{9}$/.test(value)
    },

    //验证码
    sendCode () {
        var valueCode = Math.random().toString().slice(-6);
        return valueCode ;
    },
    valuePwd(value,min,max){
        return new RegExp('^[!\\.\\w]{' + min + ',' + max + '}$').test(value)
    },

    // 弹出框
    alert (title) {
        Dialog.alert({
            title
          });
    }

}