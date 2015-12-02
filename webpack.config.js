var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	entry: {
		demo: "index.js"
	},
	output: {
		path: __dirname + "/build/",
		filename: "[name]/app.js"
	},

	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader?stage=0&optional[]=es7.decorators"
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx', '.json'],
		root: [__dirname + "/src/views", __dirname + "/src"]
	}
}
