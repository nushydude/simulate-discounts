/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all"],
  testEnvironment: "node",
  verbose: true,
};
