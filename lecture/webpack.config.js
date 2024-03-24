const path = require("path"); //path: 노드에서 경로 조작하는 것을 쉽게 해준다.
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "wordrelay",
  mode: "development", // 실서비스: production
  devtool: "eval", // 실서비스: hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"], //이렇게 적으면 웹펙이 알아서 js나 jsx가 있는지 확인을 하고, react-react-to-dom-word-relay 이거 찾아서 app.js로 만들어준다.
  },

  // 입력
  entry: {
    app: ["./client"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //정규표현식: JS랑 JSX 파일에 룰을 적용하겠다.
        loader: "babel-loader",
        options: {
          //babel-loader의 옵션
          presets: [
            [
              "@babel/preset-env", '@babel/preset-react'
              {
                targets: {
                  browsers: ["> 1% in KR"], // browserslist
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],

  //출력
  output: {
    path: path.join(__dirname, "dist"), //컴퓨터 마다 파일 경로가 다 다른데 현재폴더안에 자동으로 dist폴더를 만들어준다.
    filename: "app.js",
    publicPath: '/dist/',
  },
 
  
  devServer: {
    // publicPath: '/dist/',
    hot: true,
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
  },
  //터미널에 webpack쓰면 두 파일을 합쳐준다.
};
