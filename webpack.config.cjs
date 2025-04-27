const { watch } = require("fs");
const path = require("path");
const { merge } = require("webpack-merge");

const baseConfig = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  devtool: "cheap-source-map",
  entry: path.resolve(__dirname, "./index.tsx"), // 진입점 파일
  output: {
    path: path.resolve(__dirname, "build"), // 빌드 출력 경로
    filename: "main.js", // 출력 파일 이름
    chunkFilename: "[name].[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    hot: true
  },
  watch: true,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"] // 각 파일 확장자 처리
  },
  watchOptions: {
    ignored: /node_modules/
  },
  // Webpack 실행 후 출력 결과를 처리할 방법
  stats: {
    colors: true,
    modules: false,
    reasons: true,
    errors: true
  },
  // Webpack 빌드를 실행하고 콜백 처리
  plugins: []
};

module.exports = (_, env) => [
  // 서버용 번들
  merge(baseConfig, {
    name: "server",
    target: "node",
    entry: "./server.ts",
    optimization: {
      minimize: false
    },
    output: {
      path: path.resolve(__dirname, "build", "server")
    }
  }),
  //  클라이언트용 번들
  merge(baseConfig, {
    name: "client",
    entry: "./index.tsx",
    output: {
      filename: "client.js",
      path: path.resolve(__dirname, "build")
    }
  })
];
