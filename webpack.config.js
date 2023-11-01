const path = require('path');
const webpack = require('webpack');

const bootstrapCSS = path.join(__dirname, 'node_modules/bootstrap/dist/css');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  // место откуда берутся js файлы
  context: __dirname + '/ui/static/js',

  // точки входа
  entry: {
    vendors: [
      'bootstrap',
    ],
    common: './common.js',
    styles: './styles.js',
    mainBase: './main.js',
    pagePhoto: './page_photo/main.js',
  },

  output: {
    // вывод обработанных webpack js файлов в указанную директорию
    path: path.resolve(__dirname + '/ui', 'dist'),

    // интернет путь до указанной директории
    publicPath: '/dist/',

    // шаблон для формируемых webpack файлов
    filename: '[name].bundle.js',

    // для загрузки файлов изображений (в webpack 5, в предидущих версиях
    // применялись 'file-loader', raw-loader, url-loader)
    //
    // assetModuleFilename - указывает выходной каталог с именем images  для
    // обработанных изображений и шаблон имени [name].[contenthash][ext] для
    // файлов, которые соответствуют правилу type: 'asset/resource'. Если
    // assetModuleFilename не указан, то, по умолчанию, каталогом будет dist,
    // а имена файлов будут задаваться по шаблону [contenthash][ext].
    // [ext] - шаблон для расширения файла, также, включает точку.
    assetModuleFilename: path.join('_/img', '[path][name][ext]'),

    // применяется при сборке файлов через require.ensure ПОКА НЕ ЗНАЮ ДЛЯ ЧЕГО
    chunkFilename: '[id].js',

    // экспорт каждой точки входа должен попадать в переменную с соответствующем
    // именем  ПОКА НЕ ЗНАЮ ДЛЯ ЧЕГО
    library: '[name]',
  },

  resolve: {
    modules: ['node_modules', bootstrapCSS],
    extensions: ['', 'js', 'jsx', 'css'],
    alias: {
      'bootstrap': 'bootstrap/dist/js/bootstrap.min.js',
    },
  },

  plugins: [
    // не собирать если есть ошибки
    new webpack.NoEmitOnErrorsPlugin(),

    // плагин отвечающий за автоматическую очистку директории dist
    // ВРОДЕ РАБОТАЕТ (по крайней мере пишет что удаляет,
    // однако дата файлов не обновляется)
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['/ui/dist/'],
        },
      },
    }),
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
        test: /\.(js|jsx)$/, // определяем тип файлов
        exclude: /node_modules/, // исключаем из обработки папку node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/, // исключаем из обработки папку node_modules
        use: ['style-loader', 'css-loader'],
      },
      // правила для обработки изображений с расширениями png|jpg|jpeg|gif
      // относится к assetModuleFilename модулю
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // правила для обработки изображений с расширением svg
      // относится к assetModuleFilename модулю
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('icons', '[path][name].[ext]'),
        },
      },
      /* {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*)?$/,
        exclude: /\/node_modules\//,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        }],
      },*/
    ],
  },
};
