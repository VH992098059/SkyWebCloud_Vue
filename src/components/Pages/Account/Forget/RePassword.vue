<script>
import {ref} from "vue";
import {UserService} from "../../../store/modules/api.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {Encrypt} from "../../../Utils/EncDecStr.js";
import axios from "axios";

export default{

  setup() {
    let password = ref(null);
    const rePassword = ref(null);
    const forGetAccount=history.state.params.account
    const router=useRouter()
    return{
      forGetAccount,
      password,
      rePassword,
      isPwd: ref(true),
      submit() {
        UserService.forgetUser({"account":forGetAccount,"password":Encrypt(password)}).then(res=>{
          if (res.data.data.message === "修改成功") {
            ElMessage.success("修改成功")
            router.replace({path:"/login"})
          }
        })
      },
    }
  }
}
</script>

<template>
  <div class="q-pa-lg" style="max-width: 1800px">

    <q-form
        @submit="submit"
        class="q-gutter-md"
        id="q-form"
    >
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
      <div style="display: flex;justify-content: center">
        <q-btn label="提交" type="submit" color="primary" style="width: 150px;font-size: 18px;" />
      </div>
    </q-form>

  </div>
</template>

<style scoped>

</style>
