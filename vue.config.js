const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        proxyTimeout: 30000
      }
    },
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/concurso/'  // <<--- ALTERE PARA O NOME EXATO DO SEU REPOSITÓRIO
    : '/',

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `
      }
    }
  },

  configureWebpack: {
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    }
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Meu App Vue' // Altere para seu título
      return args
    })
  }
})