const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
//const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

//var cssValues = require('postcss-modules-values');
//

const argv = process.argv;
const outDir = './build/';
const srcDir = './app/';
const libPath = outDir + 'lib/';
const scriptPath = outDir + 'scripts/';

var isDev = argv.indexOf('--dev') === -1 ? false : true;
var afterfix = isDev ? '.js' : '.min.js';

console.log('isDev:' + isDev);

var plugins = [
    //new CommonsChunkPlugin('scripts/common' + afterfix, ['index', 'vender']),
    new ExtractTextPlugin('styles/[name].css'),
    new DllReferencePlugin({
        context: __dirname,
        manifest: require(path.resolve(__dirname, libPath + 'manifest-react.json'))
    }),
    new DllReferencePlugin({
        context: __dirname,
        manifest: require(path.resolve(__dirname, libPath + 'manifest-lib.json'))
    }),
    new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, outDir + 'index.html'),
        template: path.resolve(__dirname, srcDir + 'tpl/index.html')
    }),
    new BrowserSyncPlugin({  
        // browse to http://localhost:3000/ during development
        host: '0.0.0.0',
        port: 3456, //代理后访问的端口
        server: { baseDir: [outDir] }
        //proxy: 'localhost:8080',//要代理的端口
    }, {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: true
    })
];

if (!isDev) {
    plugins.push(new UglifyJsPlugin({
        minimize: true
    }));
}


module.exports = {
    entry: {
        //'style': __dirname + '/app/styles/ui.less',
        'index': path.resolve(__dirname, srcDir + 'index.js')
    },
    output: {
        path: path.resolve(__dirname, outDir),
        filename: '[name]' + afterfix,
        sourceMapFilename: '[name].map'
    },
    devServer: {
        contentBase: path.resolve(__dirname, outDir),
        inline: true
    },
    //devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0']
            }
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            // loader: ExtractTextPlugin.extract({
            //  fallbackLoader: 'style-loader',
            //  loaders: [
            //      {
            //          loader: 'css-loader?modules',
            //          options: {importLoaders: 1}
            //      },
            //      {
            //          loader: 'less-loader'
            //      }
            //  ]
            // })
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }]
    },
    plugins: plugins
};