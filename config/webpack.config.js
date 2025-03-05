const path = require('path');

module.exports = {
    mode: "none",
    entry: path.resolve(__dirname, '../src/index.js'), // src 디렉토리 경로 수정
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'assets/js/main.js',
        assetModuleFilename: 'assets/images/[hash][ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve(__dirname, './babel.config.json')
                }
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: false }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 9090,
        static: {
            directory: path.resolve(__dirname, '../public'),
            watch: true
        },
        liveReload: true,
        compress: true,
        hot: false,
        historyApiFallback: true,
        proxy: [
            {
              context: ['/api'],
              target: 'http://3.36.89.31',
              changeOrigin: true,
            },
            {
              context: ['/user'],
              target: 'http://3.36.89.31',
              changeOrigin: true,
            },
        ],
    }
};
