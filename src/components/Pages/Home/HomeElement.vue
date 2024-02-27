<script>
import { ref } from 'vue'
import {ElMessage, ElTable} from 'element-plus'
// import axios from "axios";
import {useQuasar} from "quasar";
import {FileService} from "../../store/modules/api.js";
import {useStore} from "vuex";
import axios from "axios"
import router from "../../Router/index.js";
export default{
  computed: {
    FileService() {
      return FileService
    }
  },
  setup() {
    const $q = useQuasar()
    return{
      tableData: ref([]),
      multipleSelection: ref([]),
      multipleSelectionId: "",
      fileId: ref([]),
      pageSize: ref([]),
      CurrentPn: 1,
      fullHeight:$q.screen.height,
      selectedNum: 0,
    }
  },
  data() {
    return{
      Share: false,
      NewFolder: true,
      Upload:true,
      Download: false,
      store: useStore(),
    }
  },
  methods: {
    handleSelectionChange(selectionArr) {
      this.multipleSelection = selectionArr;
      // this.Share = this.multipleSelection.length !== 0;
      this.selectedNum=selectionArr.length
      // this.NewFolder=this.multipleSelection.length===0;
      this.Upload = this.multipleSelection.length < 1;
      this.Download = this.multipleSelection.length >= 1;
      // this.multipleSelection.forEach(res=>{
      //   console.log(res)})
      console.log(this.multipleSelection)
    },
    getDataMsg(val) {
      if (val.status === "0") {
        return 0
      }
      else {
        this.$refs.multipleTableRef.clearSelection()
        this.$refs.multipleTableRef.toggleRowSelection(val)
        console.log(this.multipleSelection[0].fileName)
      }
    },
    getFileList() {
      FileService.fileList({"account":sessionStorage.getItem("userKey")}).then(res=>{
        this.tableData=res.data.data.list
        if (res.data.code === -401) {
          ElMessage.error("获取失败，请重新登录")
          sessionStorage.clear()
          router.push("/account")
        }
        // localStorage.setItem("code",res.data.code)
        // this.store.commit("setCode",res.data.code)
      })

    },

    /*getPageData(value) {
      this.getFileList(value)
    },*/
    uploadFile(files) {
      console.log(files[0].size)
      if (files[0].size > 524288000) {
        ElMessage.error("文件大小不得500MB")
        return
      }
      let fileFormData = new FormData();
      FileService.uploadFile({"file": files[0], "account": sessionStorage.getItem("userKey")}).then(res => {
        if (res.data.data.uploadFile === "文件上传成功") {
          ElMessage.success("文件上传成功")
          this.$refs.uploads.reset()
          this.getFileList()

        } else if (res.data.code === -401) {
          ElMessage.success("文件上传失败，请重新登录")
          sessionStorage.clear()
          router.push("/account")
        } else {
          ElMessage.error("上传失败");
        }
      })
    },
    downloadFile() {
     /* this.$http.get('/webpan/file/download',{params:{"fileName":this.multipleSelection[0].fileName},responseType:"blob"}).then(res=>{
        console.log(res)
      })*/

      /*for (let i = 0; i <this.multipleSelection.length;i++) {
        FileService.fileDownload(this.multipleSelection).then(res=>{
          console.log(res)
        })
      }*/
      for (let i = 0; i < this.multipleSelection.length; i++) {
        axios({
          method:"get",
          url: '/webpan/file/download',
          params:this.multipleSelection[i],
          responseType: 'blob' // 表示响应数据类型为二进制流
        }).then(res=>{
          const blob = new Blob([res.data], { type: res.headers['content-type'] });
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(blob);
          downloadLink.download = this.multipleSelection[i].fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          console.log(res)
        })
      }
    },
    deleteFile() {
      console.log(this.multipleSelection)
      ElMessage.warning("文件删除中")
      for (let i = 0; i < this.multipleSelection.length; i++) {
        FileService.deleteFile({"account":this.multipleSelection[i].fileName,"id":this.multipleSelection[i].id}).then(res=>{
          if (res.data.data.deleteFiles==="删除失败") {
            ElMessage.error("删除失败")
          }else if(res.data.data.deleteFiles==="文件不存在,删除失败"){
            ElMessage.error("文件不存在,删除失败")
          }
          else if(res.data.data.deleteFiles==="文件删除失败"){
            ElMessage.error("文件删除失败")
          }
          else{
            ElMessage.success("文件删除成功")
            this.getFileList()
          }
        })
      }
    },
    get_bodyHeight() {//动态获取浏览器高度
      window.onresize = () => {
        return (() => {
          window.fullHeight = window.innerHeight
          this.fullHeight = window.fullHeight
        })()
      }
    },
  },
  created() {
    this.getFileList(sessionStorage.getItem("userKey"));
    console.log(this.fullHeight)
    this.get_bodyHeight()

  },
  watch:{
    fullHeight(val) {//监控浏览器高度变化
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true

        setTimeout(function () {
          this.timer = false
        }, 200)
      }
    },
  },
}
</script>

<template>
  <q-page-container>
    <q-page style="padding: 10px 10px 0 10px">
      <div class="row q-pa-sm "  >
<!--        <el-upload
            multiple
            class="upload-demo"
            :show-file-list="false"
           >
          <q-btn color="blue" @click="uploadFile" v-if="this.Upload"><q-icon class="bi bi-cloud-arrow-up" size="23px"/>&nbsp;上传</q-btn>
        </el-upload>-->
        <q-uploader
            :url=uploadFile
            label="上传文件"
            multiple
            no-thumbnails
            v-if="this.Upload"
            ref="uploads"
        />
<!--        <q-btn color="blue" @click="uploadFile" v-if="this.Upload"><q-icon class="bi bi-cloud-arrow-down" size="23px"/>&nbsp;下载</q-btn>-->
        <q-btn color="blue" @click="downloadFile" v-if="this.Download"><q-icon class="bi bi-cloud-arrow-down" size="23px"/>&nbsp;下载</q-btn>
        &nbsp;&nbsp;<q-btn color="blue" @click="deleteFile" v-if="this.Download"><q-icon class="bi bi-trash3-fill" size="23px"/>&nbsp;删除</q-btn>
<!--        <q-btn color="blue" v-if="this.NewFolder"><q-icon class="bi bi-folder-plus" size="19px"/>&nbsp;新建文件夹</q-btn>-->
        &nbsp;&nbsp;
<!--        <q-btn color="blue" v-if="this.Share"><q-icon class="bi bi-share" size="23px"/>&nbsp;分享</q-btn>-->
      </div>
      <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%;margin-top: 10px;border-radius: 10px;box-shadow: 3px 2px 0 0 rgba(91,91,91,0.3);"
          @selection-change="handleSelectionChange"
          @row-click="getDataMsg"
          :header-cell-style="{color: '#ffffff', fontSize: '16px',  background: '#0f84e0'}"
          :height="this.fullHeight-198"
          id="cake"
      >
        <el-table-column type="selection" align="center" :selectable="row => !row.isSelected"/>
        <el-table-column label="文件名" show-overflow-tooltip #default="scope" >
          {{ scope.row.fileName }}
        </el-table-column>
        <el-table-column property="fileType" label="文件类型" show-overflow-tooltip  #default="scope" >
          {{ scope.row.fileType }}
        </el-table-column>
        <el-table-column property="fileUploadTime" label="上传时间" show-overflow-tooltip #default="scope">
          {{ scope.row.fileUploadTime }}
        </el-table-column>
        <el-table-column property="fileUpdateTime" label="修改时间" show-overflow-tooltip #default="scope">
          {{ scope.row.fileUpdateTime }}
        </el-table-column>
        <el-table-column property="fileSize" label="文件大小" show-overflow-tooltip #default="scope">
          {{ scope.row.fileSize }}
        </el-table-column>
      </el-table>
<!--      <div class="example-pagination-block" style="margin-top: 20px;" >
        <el-pagination layout="prev, pager, next" :total="pageSize.total" @current-change="getPageData" :page-size="pageSize.size" :page-count="pageSize.pages"/>
      </div>-->
    </q-page>
  </q-page-container>
</template>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;

}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
