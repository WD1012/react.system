/**
 * Created by wangdan on 2018/5/3.
 */
const path = require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const ExtractTextPlugin= require('extract-text-webpack-plugin');
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');

module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'js/app.js'
	},
	// 固定路径配置
	resolve:{
		alias :{
			page : path.resolve(__dirname,'src/page'),
			component : path.resolve(__dirname,'src/component')
		}
	},
	module: {
		rules: [
			{
				// js脚本文件配置
				test: /\.jsx$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env','react']
					}
				}
			},
			{
				// css文件配置
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				// sass配置
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader","sass-loader"]
				})
			},
			{
				// 图片配置
				test: /\.(png|jpg|gif|jpeg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name :'resource/[name].[ext]'
						}
					}
				]
			},
			// {
			// 	test: /\.(png|jpg|gif|jpeg)$/,
			// 	use: [
			// 		{
			// 			loader: 'file-loader',
			// 			options: {
			// 				limit: 8192,
			// 				name :'resource/[name].[ext]'
			// 			}
			// 		}
			// 	]
			// },
			{
				// 字体图标配置
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name :'resource/[name].[ext]'
						}
					}
				]
			},
		]
	},
	plugins: [
		// html配置
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			favicon:'./favicon.ico'
		}),
		// 独立css文件
		new ExtractTextPlugin("css/[name].css"),
		// 提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		})
	],
	// webpack-dev-server的处理
	devServer: {
		// contentBase:'./dist',
		// 404或未知页面访问
		historyApiFallback:{
			index:'/dist/index.html'
		},
		port:'8888',
		proxy:{
			'/manage':{
				target: 'http://admintest.happymmall.com',
				changeOrigin: true,
				pathRewrite: {
					'^/manage': '/manage'
				}
			}
		}
	}
};


