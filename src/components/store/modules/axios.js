import axios from "axios";
axios.defaults.baseURL="http://localhost:18000"

//允许跨域携带cookie信息
axios.defaults.withCredentials = true;
//设置超时
axios.defaults.timeout = 1500;

// 封装 GET POST 请求并导出
export function request(url='',params={},type='POST'){
//设置 url params type 的默认值
    return new Promise((resolve,reject)=>{
        let promise
        if( type.toUpperCase()==='GET' ){
            promise = axios({
                url,
                params
            })
        }else if( type.toUpperCase()=== 'POST' ){
            promise = axios({
                method:'POST',
                url,
                data: params,
            })

        }
        //处理返回
        promise.then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
