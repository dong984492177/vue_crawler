<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="id" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><user /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="项目名" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>项目名: {{ scope.row.name }}</div>
            <div>链接: {{ scope.row.url }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="项目类" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.mappingClass }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="primary"  @click="drawer_open(scope.row.id)" >
          打开
        </el-button>
        <el-button size="small" type="warning" @click="crawlerNodeStart1(scope.row.id)"
          >爬取节点
          </el-button>
        <el-button size="small"  type="danger"  @click="handleDelete(scope.$index, scope.row)"
          >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>


  
  <!-- 抽屉 -->
  <el-drawer v-model="drawer"  title="I am the title" :with-header="false" 
    direction="btt" size ="70%" :before-close="handleClose"
    showClose="true" destroy-on-close="true"
    >
    <h1>教程项目</h1>
    <input type = "hidden" id ="drawer_id" :value="drawer_id"/>
    <el-table :data="drawerData" style="width: 100%">
    <el-table-column label="id" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><user /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="教程名" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>教程名: {{ scope.row.name }}</div>
            <div>对应链接: {{ scope.row.url }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="教程状态" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <b style="color:#3c3c3c" v-if="scope.row.tutorialsStatus == 0">
            {{caseStatusArr.boolean[scope.row.tutorialsStatus]}}</b>
          <b style="color:#0099FF" v-else-if="scope.row.tutorialsStatus == 1">
            {{caseStatusArr.boolean[scope.row.tutorialsStatus]}}</b>
          <b style="color:#3cb371" v-else-if="scope.row.tutorialsStatus == 2">
            {{caseStatusArr.boolean[scope.row.tutorialsStatus]}}</b>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button v-if="scope.row.tutorialsStatus == 2" size="small" @click="handleEdit(scope.$index, scope.row)" disabled
          >已完成爬虫
          </el-button>
        <el-button v-else size="small" @click="crawler_start(scope.$index, scope.row)"  :disabled="scope.row.status ==-1"
          >开始爬虫
        </el-button>

        <el-button size="small"  type="danger"  @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
        <el-button size="small" type="primary"  @click="relieve(scope.row)" plain 
          >解除限制
        </el-button>
        <el-button size="small" v-if="scope.row.tutorialsStatus == 2"  @click="downloadFlie( scope.row,1)"  type="success" plain
            >下载HTML
        </el-button>
        <el-button size="small" v-if="scope.row.tutorialsStatus == 2"  @click="downloadFlie( scope.row,2)"  type="primary" plain
            >下载MD
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  </el-drawer>

</template>

<script lang="ts" >
import Global from '../components/Global.vue'
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { AxiosResponse } from 'axios'
const drawer = ref(false)

const projectUrl = Global.serverSrc

//url 路径
var getMappingByType1Url = Global.getMappingByType1Url
//爬网站的节点
var crawlerNodeStart1Url = Global.crawlerNodeStart1Url 
//获得所有节点信息
var getNodeByCrawleId = Global.getNodeByCrawleId
var getDbNodeByCrawleId = Global.getDbNodeByCrawleId
//获得单节点信息
var getNodeDbByNameUrl = Global.getNodeDbByNameUrl
var getNodeByNameUrl = Global.getNodeByNameUrl
var crawlerStartUrl = Global.crawlerStartUrl

var crawlerDownloadUrl = Global.crawlerDownloadUrl
var drawer_id: any 

//爬虫状态
const caseStatusArr = {boolean: {0: '初始重新爬虫', 1: '已获得书签', 2: '爬虫完成'}}


        



 export default {
   
  name: "table",
  data(){
            return{
               tableData:[],
               drawer,
               drawerData:[],
               caseStatusArr,
               drawer_id,
             
            }
        },
  created:function() {
            this.getIdentifyingCode();
        },
  methods:{
    //获得初始数据
    getIdentifyingCode: function () {
      const that = this;
      this.axios.get(getMappingByType1Url)
            .then(function (response) {//返回类型为list<class>
              that.tableData = response.data;
              console.log(that.tableData);
            }).catch(function (reason) {
              console.log("error");
            }
      );
    },
    handleEdit : (index: number, row: any) => {
      console.log(index, row)
    },
    handleDelete : (index: number, row: any) => {
      alert("功能暂不开放")
      console.log(index, row)
    },
    //获得爬虫项目数据
    drawer_open :function(id :number) {
        const that = this;
        this.axios.get(getNodeByCrawleId+"/"+id)
              .then(function (response) {//返回类型为list<class>
                that.drawer_id = id;
                that.drawerData = response.data;
                console.log(that.drawerData);
              }).catch(function (reason) {
                console.log("error");
              }
        );
        drawer.value=true
    },
    crawlerNodeStart1 :function(id :number) {
        const that = this;
        this.axios.get(crawlerNodeStart1Url+"/"+id)
              .then(function (response) {//返回类型为list<class>
                if(response.data==true){
                  alert("爬取网站完成")
                }
                
              }).catch(function (reason) {
                console.log("error");
              }
        );       
    },

    //关闭抽屉
    handleClose : (done: () => void) => {
      ElMessageBox.confirm('你确定要关吗?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    },
    //启动爬虫
    crawler_start (index: number, row: any){
      row.status =-1
      const that = this;
      console.log('drawer_id',this.drawer_id)
      console.log(index)
      console.log(getNodeDbByNameUrl)
      this.axios.post(crawlerStartUrl,{
        id : this.drawer_id,
        name : row.name
      }).then(function (response) {//返回类型为list<class>
         that.getNodeByName(index,row)
      })
      
    },
    //更新单行数据
    getNodeByName:function (index: number, row: any){
      this.axios.post(getNodeByNameUrl,{
        id : this.drawer_id,
        name : row.name
      }).then(function (response) {//返回类型为list<class>
        row.status = response.data.tutorialsStatus
        row.tutorialsStatus=response.data.tutorialsStatus
      })
    },
    //解除爬虫限制
    relieve : (row: any) =>{
      row.tutorialsStatus = 1
    },
    //下载文件
    downloadFlie :function (row: any ,downloadFlieType : number) {
      this.axios.post(crawlerDownloadUrl,{
        id : this.drawer_id,
        name : row.name,
        type : downloadFlieType,
      },
      {responseType: 'blob' }
      ).then(res => {
  
        this.download(res)

      })
    },
     // 下载文件
    download (res) {
        const { data, headers } = res
        const fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')
        // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
        //const blob = new Blob([JSON.stringify(data)], ...)
        const blob = new Blob([data], {type: headers['content-type']})
        let dom = document.createElement('a')
        let url = window.URL.createObjectURL(blob)
        dom.href = url
        dom.download = decodeURI(fileName)
        dom.style.display = 'none'
        document.body.appendChild(dom)
        dom.click()
        dom.parentNode.removeChild(dom)
        window.URL.revokeObjectURL(url)
    }
  }
}
</script>

<style >
    .el-drawer.rtl {
        overflow: scroll
    }
</style>