const path = require("path");
const webpack = require("webpack");

let bootstrapCSS = path.join(__dirname, "node_modules/bootstrap/dist/css");

module.exports = {
    //место откуда берутся js файлы
    context: __dirname + "/ui/static/js",

    //точки входа
    entry: {
        vendors: [
            "bootstrap",
        ],
        index: "./index.js",
        common: "./common.js",
        styles: "./styles.js",
    },

    output: {
        //вывод обработанных webpack js файлов в указанную директорию
        path: path.resolve(__dirname + '/ui', 'dist'),

        //интернет путь до указанной директории
        publicPath: "/ui/dist/",

        //шаблон для формируемых webpack файлов
        filename: '[name].bundle.js',

        //применяется при сборке файлов через require.ensure (ВОТ ЭТО ПОКА НЕ ЗНАЮ ДЛЯ ЧЕГО)
        chunkFilename: "[id].js",

        //экспорт каждой точки входа должен попадать в переменную с соответствующем именем (ВОТ ЭТО ПОКА НЕ ЗНАЮ ДЛЯ ЧЕГО)
        library: "[name]"
    },

    resolve: {
        modules: ["node_modules", bootstrapCSS],
        extensions: ["", "js", "jsx", "css"],
        alias: {
            "bootstrap": "bootstrap/dist/js/bootstrap.min.js",
        }
    },

    /*
    resolveLoader: {
        modules: ["node_modules"],
        extensions: [".js"],
        moduleExtensions: ["*-loader"]
    },
    */

    plugins: [
        //не собирать если есть ошибки
        new webpack.NoEmitOnErrorsPlugin(),

        /*
        //выносит все стили в отдельные файлы ВРОДЕ ДЛЯ webpack 5 НЕ НУЖНО
        new ExtractTextPlugin("css/[id]_[name].css", { allChunks: true }),

        //переменные окружения
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        new webpack.ContextReplacementPlugin(/moment[\\/\\]locale$/, /ru|en-gb/),

        new webpack.optimize.OccurrenceOrderPlugin(true),
        */
    ],

    module: {
        rules: [
            {
                //test: /\.m?js$/,
                test: /\.(js|jsx)$/, // определяем тип файлов
                exclude: /node_modules/, // исключаем из обработки папку node_modules
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/, // исключаем из обработки папку node_modules
                use: ["style-loader", "css-loader"],
            }
        ],
    }
};