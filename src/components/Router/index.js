import {createRouter, createWebHistory, onBeforeRouteUpdate} from "vue-router";
import axios from "axios";
import {FileService} from "../store/modules/api.js";
import useStore from "../store/modules/createStore.js";
/*文件路径*/
const pages="/src/components/Pages/"
const layout="/src/components/Layouts/"
const Layout=layout+"Inner_Layout/InnerLayout.vue"
const OuterLayout=layout+"Outer_Layout/OuterLayout.vue"
const Send=pages+"Send/Send.vue"
const Feedback=pages+"Feedback/Feedback.vue"
const Settings=pages+"Settings/Settings.vue"
const NotFound=pages+"NotFound/NotFound.vue"
const Help=pages+"Help/Help.vue"
const HomeElement=pages+"Home/HomeElement.vue"
const SendElement=pages+"Send/SendElement.vue"
const Login=pages+"Account/Login/Login.vue"
const Register=pages+"Account/Register/Register.vue"
const Forget=pages+"Account/Forget/ForgetPassword.vue"
const RePassword=pages+"Account/Forget/RePassword.vue"
/*创建路由*/

const router = createRouter({

    mode: 'hash',
    history: createWebHistory(), // HTML5模式
    /*设置文件路由*/
    routes : [
        {
            path: "/",
            redirect: "home",
            meta:{
                requireAuth: true
            },
        },
        {
            path: "/home",
            meta:{
              requireAuth: true
            },
            component: () => import(/* @vite-ignore */Layout),
            beforeEnter: (to, from, next) => {

                if (!sessionStorage.getItem("token")) {
                    localStorage.removeItem("code")
                    next("/account");
                }
                else {
                    //添加请求头token
                    axios.interceptors.request.use(function (config){
                        const token=sessionStorage.getItem("token")
                        console.log(config.url)
                        if (config.url === "/webpan/file/uploadFiles") {
                            config.headers["Content-Type"]="multipart/form-data";

                        }
                        if (token) {
                            config.headers.Authorization ="Bearer "+ token;
                        }
                        return config
                    },function (error) {
                        console.log(error)
                    })
                    next();
                }
            },

            children:[
                {
                    path: '',
                    component: () => import(/* @vite-ignore */HomeElement)
                },
                {
                    path:'send',
                    component:()=>import(/* @vite-ignore */SendElement),
                    alias:'/send'
                },
                {
                    path:'feedback',
                    component:()=>import(/* @vite-ignore */Feedback),
                    alias:'/feedback'
                },
                {
                    path:'settings',
                    component:()=>import(/* @vite-ignore */Settings),
                    alias:'/settings'
                },
                {
                    path:'help',
                    component:()=>import(/* @vite-ignore */Help),
                    alias:'/help'
                }
            ]
        },
        {
            path: "/account",
            redirect:"login"
        },
        {
            path: "/account",
            component:()=>import(/* @vite-ignore */OuterLayout),
            children: [
                {
                    path: "login",
                    component: () => import(/* @vite-ignore */Login),
                    alias: "/login"
                },
                {
                    path: "register",
                    component: () => import(/* @vite-ignore */Register),
                    alias: "/register",
                },
                {
                    path: "forget",
                    component: () => import(/* @vite-ignore */Forget),
                    alias: "/forget"
                },
                {
                    path: "password",
                    component: () => import(/* @vite-ignore */RePassword),
                    alias: "/password"
                }
            ]
        },
        /*不存在网页的路由*/
        {
            path: '/:catchAll(.*)',
            component: () => import(/* @vite-ignore */NotFound),
        }
    ],

});
/*
router.afterEach((to,from)=>{
    if (localStorage.getItem("code") === "-401") {
        sessionStorage.clear()
        console.log(123)
        router.go("/account")
    }
})
*/

export default router
