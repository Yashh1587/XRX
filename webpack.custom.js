module: {
    loaders: [
        {
            test: /\.js$/, exclude: /assets/, loader: "babel-loader"
        }
    ]
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties','@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }