/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  verbose: true,
  collectCoverage: false,
  setupFilesAfterEnv: ['jest-extended/all'],

  coverageReporters: ['json-summary', 'text', 'lcov', 'json', 'html', 'text-summary'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};
