const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/index.jsx',
    output:{
        path:path.resolve('./dist'),
        filename:'js/[name]-[hash:5]-bundle.js',
    },
    devServer:{
        contentBase:path.join(__dirname,"./public"),
        port:6868
    },

    resolve:{
        alias:{
            '@':path.resolve('./src'),
            '~':path.resolve('./src/views')
        },
        extensions:[".js",".jsx"]
    },
    
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                use:[
                    {
                        loader:"babel-loader",
                        options:{
                            presets:["@babel/preset-react"],
                            plugins:[
                                ["@babel/plugin-proposal-decorators",{legacy:true}],
                                ["@babel/plugin-proposal-class-properties",{loose:true}],
                                ["import", { libraryName: "antd-mobile", style: "css" }] 
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:["style-loader","css-loader","sass-loader"]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,"./public/index.html")
        })
    ]
}