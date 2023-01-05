const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/finger-express/',
  outputDir: 'docs',
  devServer: {
    proxy: {
      '^/test': {
        target: 'http://192.168.31.35:8000',
        changeOrigin: true,
      },
      '^/rest/': {
        target: 'https://rest.finger.solutions/api/ReviewStt/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/rest' : ''}
      },
      '^/basket': {
        target: 'http://exp.finger.solutions:8200/api/BasketList/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/basket' : ''}
      },  
      '^/stt': {
        target: 'https://componer.iptime.org/SttAnalysis/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/stt' : ''}
      },
    },
  }
})
