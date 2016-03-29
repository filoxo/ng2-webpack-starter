var webpack = require("webpack");
module.exports = {
	entry: {
		"vendor": "./src/vendor/vendor",
		"app": "./src/main"
	},
	output: {
		path: __dirname + "/dist",
		filename: "[name].bundle.js"
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.ts?$/,
				loader: 'ts-loader'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./vendor.bundle.js")
	]
};