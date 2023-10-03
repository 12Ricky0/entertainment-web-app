
 module.exports = {
  // Specify the test environment (e.g., Node.js or jsdom for browser-like testing).
  testEnvironment: 'node',

  // A list of directories to search for test files.
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],

  // An array of file extensions your tests use.
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  // Other Jest options you may need (e.g., coverage, setupFiles).
  // ...
};
  return {
    verbose: true,
  };
