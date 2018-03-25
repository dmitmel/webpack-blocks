/**
 * Babel webpack block.
 *
 * @see https://github.com/babel/babel-loader
 */

const webpackMerge = require('webpack-merge')

module.exports = babel

/**
 * @param {object} [options]
 * @param {bool}                    [options.cacheDirectory]  Use cache directory. Defaults to true.
 * @param {string[]}                [options.plugins]         Babel plugins to use.
 * @param {string[]}                [options.presets]         Babel presets to use.
 * @return {Function}
 */
function babel (options = {}) {
  options = Object.assign({
    cacheDirectory: true
  }, options)

  const mergeConfigs = context => prevConfig => {
    // Merge babel config into the one stored in context
    context.babel = webpackMerge(context.babel, options)
    return prevConfig
  }

  return Object.assign(mergeConfigs, { post: addBabelLoader })
}

function addBabelLoader (context, util) {
  const ruleConfig = Object.assign({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      { loader: 'babel-loader', options: context.babel }
    ]
  }, context.match)

  return util.addLoader(ruleConfig)
}
