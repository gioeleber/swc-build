const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const generateEntryPoints = (entryPoints) => {
  const result = {};
  for (const [name, entryPath] of Object.entries(entryPoints)) {
    result[name] = [
      // path.resolve(__dirname,  'src/initPage.ts'),
      entryPath,
    ];
  }
  return result;
};

module.exports = {
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".jpg"],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /(node_modules)/,
        use: { loader: "swc-loader" },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "assets/images/[name].[ext]",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, "public/"),
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 3,
              modules: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          "resolve-url-loader",
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
  entry: generateEntryPoints({
    index: path.resolve(__dirname, "src/index.tsx"),
  }),
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          minChunks: 1,
        },
      },
    },
  },
  plugins: [new MiniCssExtractPlugin(), new EnvironmentPlugin()],
  mode: process.env.APP_ENV === "dev" ? "development" : "production",
};
