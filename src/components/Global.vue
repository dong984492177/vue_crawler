<script>
const serverSrc='http://localhost:8085/crawler/';
const getMappingByType1Url = "/crawler/getMappingByType1"
const crawlerNodeStart1Url = "/crawler/crawlerNodeStart1"
const getNodeByCrawleId = "/crawler/getNodeByCrawleId"
const getDbNodeByCrawleId = "/crawler/getDbNodeByCrawleId"

const getNodeDbByNameUrl = "/crawler/getNodeDbByName"
const getNodeByNameUrl = "/crawler/getNodeByName"

const crawlerStartUrl = "/crawler/crawlerStart"

const crawlerDownloadUrl = "/crawler/crawlerDownload"

  export default
  {
    serverSrc,//服务器地址
    //后台链接
    getMappingByType1Url,
    crawlerNodeStart1Url,
    getNodeByCrawleId,
    getDbNodeByCrawleId,
    getNodeDbByNameUrl,
    getNodeByNameUrl,
    crawlerStartUrl,
    crawlerDownloadUrl
  }
</script>
