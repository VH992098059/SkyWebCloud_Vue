<script>
import {ref} from "vue";
import {UserService} from "../../../store/modules/api.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

export default{

  setup() {
    const account = ref(null)
    const password = ref(null);
    const rePassword = ref(null);
    const router=useRouter()
    return{
      account,
      password,
      rePassword,
      isPwd: ref(true),
      submit() {
        UserService.isUser({"account":account.value}).then(res=>{
          if (res.data.data.message === "账号存在") {
            const params={"account":account.value}
            router.push({
              path:"/password",
              state:{params}
            })

          }else{
            ElMessage.error("账号不存在")
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
      <q-input
          filled
          v-model="account"
          label="账号"
          hint="输入账号"
          :hide-hint="account!==''"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '请输入账号']"
      />
      <div style="display: flex;justify-content: center">
        <q-btn label="提交" type="submit" color="primary" style="width: 150px;font-size: 18px;" />
      </div>
    </q-form>

  </div>
</template>

<style scoped>

</style>
