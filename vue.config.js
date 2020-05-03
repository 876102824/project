const PostCompilePlugin = require('webpack-post-compile-plugin')

module.exports = {
  chainWebpack: config => {
      const conf = config.toConfig()
      config
        .plugin('post-compile')
        .use(PostCompilePlugin)
      // config.resolve.alias
      //   .set('@', resolve('src'))
    },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}

