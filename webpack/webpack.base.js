const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const webpack = require('webpack');
const { resolve } = require('path')
const os = require("os");
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)
const IS_DEV = process.env.NODE_ENV == 'development'

// cpu核数
const threads = os.cpus().length;

const bundleTime = function () {
	const date = new Date()
	const year = date.getFullYear()
	const mouth = date.getMonth() + 1
	const day = date.getDate()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()
	const milliseconds = date.getMilliseconds()
	return (`${year}-${mouth}-${day} ${hours}:${minutes}:${seconds} ${milliseconds}`)
}

module.exports = {
	entry: './src/index.js',
	output: {
		path: resolvePath('dist'),
		filename: IS_DEV ? 'js/bundle.js' : 'js/[name].[contenthash].js',
		publicPath: IS_DEV ? '/' : './',
		assetModuleFilename: 'images/[hash][ext][query]',
		chunkFilename: (pathData) => {
			if (!pathData.chunk.name) return 'js/[name].[contenthash].js'
			let name = pathData.chunk.name.toLowerCase()
			const name_index = name.indexOf('-index')
			if (name_index > -1) {
				name = name.substring(0, name_index)
			}
			pathData.chunk.name = name
			return 'js/[name].[contenthash].js'
		}
	},
	module: {
		rules:[{
			oneOf: [
				{
					use:[
						{
							loader: "thread-loader", // 开启多进程
							options: {
								workers: threads, // 数量
							},
						},
						{
							loader: "babel-loader",
							options: {
								cacheDirectory: true, // 开启babel编译缓存
							},
						},
					], 
					test: /\.(js|jsx)$/,
					include: resolvePath('src'),
					exclude: /node_modules/,
				},
				{
					test: /\.(css|less)$/,
					use: [IS_DEV ? 'style-loader' :
					{
						loader:MiniCssExtractPlugin.loader,
						options:{
								publicPath:'../',
						}
					}, 'css-loader', 'postcss-loader', 'less-loader'],
				},
				{
					type: 'asset',
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					parser: {
						dataUrlCondition: {
							maxSize: 5 * 1024 // 5kb
						}
					}
				},
				{
					test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
					type: 'asset/resource',
				},
			]
		}],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
		alias: {
			'~': resolvePath('src/'),
			'@': resolvePath('src/components/'),
		},
	},
	plugins: [
		new DefinePlugin({
			__ENV__: JSON.stringify(process.env.NODE_ENV),
			IS_DAILY: JSON.stringify(process.env.IS_DAILY),
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: resolvePath('src/index.html'),
			favicon: resolvePath('src/images/favicon.ico'),
			bundleTime: bundleTime(),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				minifyJS: true,
				minifyCSS: true,
			},
		}),
		new ESLintPlugin({
			quiet: IS_DEV ? true : false,
			extensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'react'],
			exclude: 'node_modules',
			cacheLocation:resolvePath("node_modules/.cache/.eslintcache"),
			cache: true, // 开启缓存
		}),
		new webpack.ProgressPlugin({
			activeModules: false,
			entries: true,
			modules: true,
			modulesCount: 5000,
			profile: false,
			dependencies: true,
			dependenciesCount: 10000,
			percentBy: 'entries',
		}),
	]
};