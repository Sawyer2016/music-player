const webpack=require('webpack')
module.exports={
	entry:__dirname + '/app/main.js',
	output:{
		path:__dirname + '/public',
		filename:'bundle.js'
	},

	devServer: {
		contentBase: './public',
		historyApiFallback:true,
		inline: true,  //源文件改变时自动刷新界面
		hot:true
	},
	module:{
		rules:[
			{
				test:/(\.js|\.jsx)$/,
				use:{
					loader:'babel-loader'
				},
				exclude: /node_modules/
			},
			{
				test:/\.css$/,
				use:[
				{
					loader:'style-loader'
				},
				{
					loader:'css-loader',
					options:{
						modules:true,
						localIdentName:'[name]__[local]--[hash:base64:5]'
					}
				},
				{
					loader:'postcss-loader'
				}
				]
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			}
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	],
}