module.exports = {
  testEnvironment: "jsdom", // otomatis ambil dari jest-environment-jsdom
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest", // kalau Vue 2 ganti ke "vue-jest"
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "vue"],
};
