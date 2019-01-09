/******************************************************************************
 * Copyright (c) 2019.                                                        *
 * Author: Jarvis.wang $user                                                  *
 * Email: wangjia_1919@aliyun.com                                             *
 ******************************************************************************/
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.js')
  },

  configureWebpack: {
    performance: {
      maxAssetSize: 50000
    }
  },

  devServer: {
    host: '0.0.0.0',
    https: false,
    port: 13344,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3344',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        cookieDomainRewrite: {
          '*': 'localhost'
        }
      }
    }
  }
}
