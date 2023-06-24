const path = require('path')
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.env')
        })

    ],
    target: ['web', 'es5'],
    devtool: 'cheap-module-source-map',
    mode: 'development',
    entry: {
        main: './dist/index'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            utils: path.resolve(__dirname, 'utils')
        }
        // extensions: [".js"],
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

        ]
    },
    plugins: [
        // new CleanWebpackPlugin()
    ],
    // 打包过程中多余的注释剔除掉
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },

}
