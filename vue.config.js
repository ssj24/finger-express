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
      '^/rest': {
        target: 'https://rest.finger.solutions/ReviewStt/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/rest' : ''}
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
