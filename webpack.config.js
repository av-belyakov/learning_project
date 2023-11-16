const path = require('path')
const webpack = require('webpack')

const FileManagerPlugin = require('filemanager-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
const bootstrapCSS = path.join(__dirname, 'node_modules/bootstrap/dist/css')

module.exports = {
  // место откуда берутся js файлы
  context: path.join(__dirname, 'ui/static/js'),

  // точки входа
  entry: {
    vendors: [
      'bootstrap',
      'react',
      'react-dom',
      'react-bootstrap',
      'react-router-dom'
    ],
    common: './common.js',
    styles: './styles.js',
    mainBase: './main.js',
    pagePhoto: './page_photo/main.js',
    pageReact: './page_react/main.jsx',
    pageNearJavaScript: './page_near_javascript/main.js'
  },

  output: {
    // вывод обработанных webpack js файлов в указанную директорию
    path: path.resolve(path.join(__dirname, 'ui'), 'dist'),

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
    library: '[name]'
  },

  watch: NODE_ENV === 'development',

  resolve: {
    modules: ['node_modules', bootstrapCSS],
    extensions: ['', '.js', '.jsx', '.css'],
    alias: {
      // bootstrap: 'bootstrap/dist/js/bootstrap.min.js',
      bootstrap: 'bootstrap',
      react: 'react',
      'react-dom': 'react-dom',
      'react-router-dom': 'react-router-dom',
      'react-bootstrap': 'react-bootstrap/dist/react-bootstrap.min.js'
    }
  },

  plugins: [
    // не собирать если есть ошибки
    new webpack.NoEmitOnErrorsPlugin(),

    // переменные окружения
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),

    // плагин отвечающий за автоматическую очистку директории dist
    // ВРОДЕ РАБОТАЕТ (по крайней мере пишет что удаляет,
    // однако дата файлов не обновляется)
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['/ui/dist/']
        }
      }
    })
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
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },

      /*
      этот модуль нужен для того что бы убрать ошибку вида
      Fetch through target failed: Unsupported URL scheme; Fallback: HTTP error: status code 404, net::ERR_UNKNOWN_URL_SCHEME
      */
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      },

      {
        test: /\.css$/i,
        exclude: /node_modules/, // исключаем из обработки папку node_modules
        use: ['style-loader', 'css-loader']
      },

      // правила для обработки изображений с расширениями png|jpg|jpeg|gif
      // относится к assetModuleFilename модулю
      //
      // поле type содержит одно из значений:
      //  asset/resource, asset/inline, asset/source
      // - asset/resource - работает так же, как и загрузчик file-loader.
      // Модули, которые соответствуют правилу type: 'asset/resource' будут
      // выводится в указанный с помощью assetModuleFilename каталог.
      // - asset/inline работает как загрузчик url-loader. Модули,
      // соответствующие правилу type: 'asset/inline', встраиваются
      // в код бандла как Data URL. asset/source похож на работу
      // загрузчика raw-loader. Модули, соответствующие правилу
      // type: 'asset/source', встраиваются без преобразований (как есть).
      // - asset объединяет asset/resource и asset/inline. Он работает
      // следующим образом: если размер модуля больше 8 КБ, то он работает
      // как asset/resource, в противном случае - как asset/inline. Размер
      // 8 КБ задан по умолчанию, но его можно изменить с помощью свойства
      // parser.dataUrlCondition.maxSize.
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      // правила для обработки изображений с расширением svg
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('icons', '[path][name].[ext]')
        }
      }
    ]
  }
}
