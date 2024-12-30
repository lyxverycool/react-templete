const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.base');

const prodConfig = {
	mode: 'production',
	devtool: 'eval',
	cache: {
		type: 'filesystem',
		buildDependencies: {
			config: [__filename]
		},
		version: 'new_version'
	},
	optimization: {
		runtimeChunk: {
			'name': 'manifest',
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					parse: {
						// We want terser to parse ecma 8 code. However, we don't want it
						// to apply any minification steps that turns valid ecma 5 code
						// into invalid ecma 5 code. This is why the 'compress' and 'output'
						// sections only apply transformations that are ecma 5 safe
						// https://github.com/facebook/create-react-app/pull/4234
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						// Disabled because of an issue with Uglify breaking seemingly valid code:
						// https://github.com/facebook/create-react-app/issues/2376
						// Pending further investigation:
						// https://github.com/mishoo/UglifyJS2/issues/2011
						comparisons: false,
						// Disabled because of an issue with Terser breaking valid code:
						// https://github.com/facebook/create-react-app/issues/5250
						// Pending further investigation:
						// https://github.com/terser-js/terser/issues/120
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					// Added for profiling in devtools
					output: {
						ecma: 5,
						comments: false,
						// Turned on because emoji and regex is not minified properly using default
						// https://github.com/facebook/create-react-app/issues/2488
						ascii_only: true,
					},
				},
			}),
			new CssMinimizerPlugin({})
		],
		splitChunks: {
			chunks: 'async',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|axios)[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		}
	},
	plugins: [new MiniCssExtractPlugin({
		filename: 'css/[name].[contenthash:8].css',
		chunkFilename: () => {
			// let name = pathData.chunk.name.toLowerCase()
			// const name_index = name.indexOf('-index')
			// if (name_index > -1) {
			// 	name = name.substring(0, name_index)
			// }
			// pathData.chunk.name = name
			return 'css/[name].[contenthash:8].css'
		},
		ignoreOrder: true,
	}),
	new CleanWebpackPlugin(),
	],
};

if (process.env.ANALYZER) {
	prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(common, prodConfig);
