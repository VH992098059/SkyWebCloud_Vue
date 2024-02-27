
<template>
  <q-layout  id="layout">

    <div class="q-pa-md">
      <div class="q-pa-md" style="color: #ffffff;text-align: center">
        <q-toolbar-title>
          <img src="/src/assets/img/天空琻熔网盘Logo.png" alt="" style="width: 30px">
          天空琻熔网盘
        </q-toolbar-title>
      </div>
      <div class="q-gutter-y-md" style="max-width: 600px;opacity: 0.85" >
        <q-card >
          <q-tabs
              v-model="this.tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
          >
            <RouterLink to="/login" replace>
              <q-tab name="login" label="登录" />
            </RouterLink>
            <RouterLink to="/register" replace>
              <q-tab name="register" label="注册" />
            </RouterLink>
            <RouterLink to="/forget" replace>
              <q-tab name="forget" label="找回账号" />
            </RouterLink>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="this.tab" animated>
            <q-tab-panel name="login">
              <router-view/>
            </q-tab-panel>
            <q-tab-panel name="register">
              <router-view/>
            </q-tab-panel>
            <q-tab-panel name="forget">
              <router-view/>
            </q-tab-panel>
            <q-tab-panel name="password">
              <router-view/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<style src="/src/assets/css/outer.css">
</style>

<script>
import {ref} from 'vue'
import Login from "../../Pages/Account/Login/Login.vue"
import Register from "../../Pages/Account/Register/Register.vue"
import router from "../../Router/index.js";
import createStore from "../../store/modules/createStore.js";
const outerRouter=createStore.getters.accountList
export default {
  setup() {
    return {
      outerRouter,
      linkTab: ref(router.currentRoute.value.fullPath.substring(1)),
    }
  },
  data() {
    return {
      tab:this.linkTab
    }
  },
  created() {

    // console.log(outerRouter)
  },
  watch:{
    '$route'(to, from) {
      this.tab=router.currentRoute.value.fullPath.substring(1)
    },
  }
}
</script>
