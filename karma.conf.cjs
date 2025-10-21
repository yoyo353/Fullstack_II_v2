module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/test-setup.js',
      'src/**/*.spec.jsx'
    ],
    exclude: [
      'src/integration.spec.jsx',
      'src/Smoke.spec.jsx',
      'src/login.spec.jsx',
      'src/productos.spec.jsx',
      'src/registro.spec.jsx',
      'src/auth-context.spec.jsx'
    ],
    preprocessors: {
      'src/**/*.spec.jsx': ['webpack'],
      'src/test-setup.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
          path: false,
          fs: false,
          crypto: false
        }
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
    client: {
      jasmine: {
        random: false
      }
    }
  });
};
