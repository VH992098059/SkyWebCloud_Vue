<template>
  <div class="q-pa-lg" style="max-width: 1800px">

    <q-form
        @submit="login"
        class="q-gutter-md"
        id="q-form"
    >
      <q-input
          filled
          v-model="account"
          label="账号"
          hint="输入账号"
          :hide-hint="account!==''"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '请输入账号']"
          name="account"
      />
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" lazy-rules label="密码" hint="输入不少于6位密码" :hide-hint="password.length>=0" maxlength="16" :rules="[
          val => val !== null && val !== '' || '请输入密码',
          val => val.length>=6 && val.length <= 18 || '请输入不少于6位密码'
        ]" name="password">
        <template v-slot:append>
          <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div style="display: flex;margin: 0">
<!--        <q-btn label="忘记密码？" color="primary"  flat @click="this.forgetPassword" id="forget"/>-->
<!--        <RouterLink to="/forget" replace>
          <span style="color: #1976d2;margin-left: 16px;cursor: pointer;" id="forget">忘记密码？</span>
        </RouterLink>-->
      </div>
      <div style="display: flex;justify-content: center">
        <q-btn label="登录" type="submit" color="primary" style="width: 150px;font-size: 18px;" />
      </div>

    </q-form>

  </div>
</template>

<script>
import {useQuasar} from 'quasar'
import {ref} from 'vue'
import {UserService} from "../../../store/modules/api.js";
import {useRouter} from "vue-router";
import createStore from "../../../store/modules/createStore.js";
import {ElMessage} from "element-plus";

import CryptoJS from "crypto-js";
import {Encrypt} from "../../../Utils/EncDecStr.js";
export default {
  setup () {
    const $q = useQuasar()
    const router=useRouter()
    const account = ref('')
    const accept = ref(false)
    const password= ref('')
    return {
      account,
      accept,
      password,
      isPwd: ref(true),
      login() {
        UserService.login({"account":account.value,"password":Encrypt(password)}).then(res=>{
          if (res.data.code === 100) {
            sessionStorage.setItem("token",res.data.data.token)
            sessionStorage.setItem("userKey",res.data.data.userKey)
            ElMessage.success("登录成功")
            router.replace({path:"/"})

          }
          else if (res.data.code === 412) {
            ElMessage.error("账号不存在")
          }
          else if (res.data.code === 413) {
            ElMessage.error("账号或者密码错误");
          } else {
            ElMessage.error("登录失败")
          }
        })
      }
    }
  },

}
</script>

<style>
</style>
