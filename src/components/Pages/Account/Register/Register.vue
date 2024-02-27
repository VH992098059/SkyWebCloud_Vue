<template>
  <div class="q-pa-lg" style="max-width: 1800px">

    <q-form
        @submit="register"
        class="q-gutter-md"
        id="q-form"
    >
      <q-input
          filled
          v-model="userName"
          label="用户名"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '请输入用户名']"
      />
      <q-input
          filled
          v-model="account"
          label="账号"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '请输入账号']"
      />
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="密码"  maxlength="16" :rules="[
          val => val !== null && val !== '' || '请输入密码',
          val => val.length>=6 && val.length <= 18 || '请输入不少于6位密码'
        ]">
        <template v-slot:append>
          <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input v-model="rePassword" filled type="password" lazy-rules label="再次输入密码" maxlength="16" :rules="[
          val => val !== null && val !== '' || '请输入密码',
          val => this.password===val || '密码不相同'
        ]">
      </q-input>
      <q-input v-model="email" filled type="text" lazy-rules label="邮箱地址"  :rules="[
          val => val !== null && val !== '' || '请输入邮箱地址',
          val => val.length>11 || '请输入正确的邮箱地址'
        ]">
      </q-input>
<!--  <div  style="align-items: flex-start">
        <q-input v-model="phone" filled type="password" lazy-rules label="手机号码" maxlength="11" :rules="[
          val => val !== null && val !== '' || '请输入手机号码',
          val => val.length===11 || '请输入正确的11位手机号码'
        ]" style="flex-grow: 2">
        </q-input>
      </div>-->
<!--      <div class="flex">
        <q-input v-model="Captcha" filled type="text" lazy-rules label="验证码"  maxlength="4" style="width: 100px"/>
        <div  style="margin: 10px">
          <q-btn label="发送" color="primary" style="height: 20px;" @click="onSend"/>
        </div>
      </div>-->

      <q-btn label="注册" type="submit" color="primary" />
    </q-form>

  </div>
</template>

<style scoped>

</style>
<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import {UserService} from "../../../store/modules/api.js";
import { ElMessage } from 'element-plus'
import {useRouter} from "vue-router";
import {Encrypt} from "../../../Utils/EncDecStr.js";
export default {
  setup () {
    const router=useRouter()
    const account = ref("")
    const userName=ref("")
    const password= ref("")
    const rePassword=ref("")
    const phone=ref("")
    const email=ref("")
    const Captcha=ref("")
    let ifEmail=ref(false)
    return {
      userName,
      account,
      password,
      rePassword,
      phone,
      email,
      Captcha,
      isPwd: ref(true),
      onSend() {
        if (email.value === "") {
          ifEmail = true
          console.log(ifEmail)
        } else {
          ifEmail = false
          console.log(ifEmail)
        }
      },
      register() {
        UserService.register({"userName":userName.value,"account":account.value,"password":Encrypt(password),"email":email.value}).then(res=>{
          if (res.data.code === 0) {
            /*注册成功*/
            if (res.data.data.code === 100) {
              ElMessage.success("注册成功")
              router.push("/login")
            }
            /*账号已存在*/
            else if(res.data.data.code===430){
              ElMessage.error("账号已存在")
            }
            /*用户名已存在*/
            else if(res.data.data.code===440){
              ElMessage.error("用户名已存在")
            }
            /*邮箱已存在*/
            else if (res.data.data.code === 450) {
              ElMessage.error("邮箱已存在")
            }
            /*注册失败*/
            else{
              ElMessage.error("注册失败")
            }
          }
        })

      },
    }
  }
}
</script>
