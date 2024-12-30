const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.base');

const devConfig = {
	mode: 'development',
	cache: {
		type: 'filesystem'
	},
	devServer: {
		historyApiFallback: true,
		host: "0.0.0.0",
		port: 3000,
		open: {
			target: 'http://localhost:3000'
		},
		compress: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3002',
				changeOrigin: true,
			},
		},
	},
	target: 'web',
	plugins: [new ReactRefreshWebpackPlugin()],
	devtool: 'eval-cheap-module-source-map',
};

module.exports = merge(common, devConfig);
