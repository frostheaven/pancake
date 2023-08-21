const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const proxy = require('http-proxy-middleware')

module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
      }
    }
  },
  devServer: {
    port: 80,
    // host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://124.222.159.78:8089/',
        changeOrigin: true, //如果接口跨域，需要进行这个参数配置
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },
  chainWebpack: config => {
    // 全局使用路径下的scss文件（需要依赖sass-resources-loader）
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources or array of paths
          resources: path.resolve(__dirname, 'src/common/theme-style/theme-style.scss')
          // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
        })
        .end()
    })
  },
  
})
