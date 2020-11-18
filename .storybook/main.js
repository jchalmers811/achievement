const path = require("path");

module.exports = {
  stories: ["../components/**/*.stories.tsx"],
  addons: [],
  presets: [path.resolve(__dirname, "./next-preset.js")],
};
