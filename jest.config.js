module.exports = {
  verbose: true,
  restoreMocks: true,
  resetModules: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.stories.js",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
  ],
}
