const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/finger-express/',
  outputDir: 'docs',
  devServer: {
    proxy : 'https://newsdata.io/'
  }
})
