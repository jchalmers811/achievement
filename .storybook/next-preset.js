const path = require("path");

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // TypeScript
    newConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [path.resolve(__dirname, "../components")],
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["next/babel"],
            plugins: ["react-docgen"],
          },
        },
      ],
    });
    newConfig.resolve.extensions.push(".ts", ".tsx");

    newConfig.module.rules.push({
      test: /\.(s*)css$/,
      use: [
        "style-loader",
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            modules: true
          }
        },
      ],
      include: path.resolve(__dirname, "../components"),
    });

    return newConfig;
  },
};
