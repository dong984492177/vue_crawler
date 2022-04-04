// import path from "path";
const path = require('path')
const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
}

const config = {
  base: './',//在生产中服务时的基本公共路径。@default '/'
  alias: {
    '/@/': pathResolve('./src'),
  },
  outDir: 'vite-init',//构建输出将放在其中。会在构建之前删除旧目录。@default 'dist'
  minify: 'esbuild',//构建时的压缩方式
  hostname: 'localhost',//本地启动的服务地址
  port: '8800',//服务端口号
  open: false,//启动服务时是否在浏览器打开
  https: false,//是否开启https
  ssr: false,//是否服务端渲染
  optimizeDeps: {// 引入第三方的配置
    include: ['axios']
  },
  logLevel: 'warn',
  // proxy: {//代理配置
  //   '/api': {
  //     target: 'http://xx.xx.xx.xx:xxxx',
  //     changeOrigin: true,
  //     ws: true,
  //     rewrite: (path: string) => { path.replace(/^\/api/, '') }
  //   }
  // }
  
  proxy: {
    '/api': {
        target: 'http://localhost:8085/',       //接口域名
        changeOrigin: true,                     //是否跨域
        ws: true,                               //是否代理 websockets
        secure: false,                          //是否https接口
        rewrite: (path: string) => path.replace(/^\/api/, '')
    }
  }
}
 
module.exports = config;