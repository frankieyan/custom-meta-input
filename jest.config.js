module.exports = {
  verbose: true,
  restoreMocks: true,
  resetModules: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
  ],
}
