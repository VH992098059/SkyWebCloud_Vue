import {createStore}  from "vuex";
import {ref} from "vue";
import router from "../../Router/index.js";
export  default createStore({
    state:{
        menuList:[
            {
                icon: 'inbox',
                label: '文件列表',
                name: 'home',
            },
            {
                icon: 'send',
                label: '聊天信息',
                name:'send',
            },
            {
                icon: 'feedback',
                label: '发送报告',
                name:'feedback'
            },
            {
                icon: 'settings',
                label: '选项工具',
                name:'settings'
            },
            {
                icon: 'help',
                iconColor: 'primary',
                label: '帮助',
                name:'help'
            }
        ],
        outerRouter:[
            {
                name: "login",
                path: "/login",
                label:"登录"
            },
            {
                name: "register",
                path: "/register",
                label: "注册"
            },
            {
                name: "forget",
                path: "/forget",
                label:"忘记密码"
            }
        ],
        account:"",
        userName: "",
        code:0,
    },
    mutations:{
        setCode(state, value) {
            state.code=value
        },
    },
    getters:{
        menuList(state) {
            return state.menuList
        },
        accountList(state) {
            return state.outerRouter
        },
    },
})
