<template>
  <q-layout view="hHr LpR fFf" style="background-color: #f3f3f3">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" id="btnMenu"/>
        <q-toolbar-title>
          <img src="/src/assets/img/天空琻熔网盘Logo.png" alt="" style="width: 30px">
          天空琻熔网盘
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->
      <q-img class="absolute-top" src="/src/assets/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="/src/assets/img/boy-avatar.png" alt="">
          </q-avatar>
          <div class="text-weight-bold">{{this.userName}}</div>
          <div ><span>账号：</span>{{this.account}}</div>
        </div>
        <q-menu transition-show="jump-down"
                transition-hide="jump-up">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>个人信息</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="this.logout">退出登录</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
      </q-img>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <InnerMenu/>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <router-view/>
  </q-layout>
</template>

<script>
import {ref, watch} from 'vue'
import InnerMenu from "./InnerMenu.vue";
import {useRoute, useRouter} from "vue-router";
import createStore from "../../store/modules/createStore.js";
import {UserService} from "../../store/modules/api.js";
import {ElMessage} from "element-plus";
import router from "../../Router/index.js";

export default {
  computed: {
    createStore() {
      return createStore
    }
  },

  components: {InnerMenu},
  data() {
    return {
      userName: "",
      account:""
    }
  },
  setup () {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      drawer: ref(false),

    }
  },
  methods:{
    loginMsg() {
      UserService.loginMsg({"userKey":sessionStorage.getItem("userKey")}).then(res=>{
        this.userName=res.data.data.list[0].userName
        this.account=res.data.data.list[0].account
      })
    },
    logout() {
      UserService.logout().then(res=>{
        console.log(res)
        ElMessage.success("退出成功")
        sessionStorage.clear()
        router.replace("/login")
      })
    },
  },
  created() {
    this.loginMsg()
  }

}
</script>
