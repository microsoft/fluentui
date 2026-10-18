const runConfig = {
  test: { configPath: 'jest.config.cjs', command: 'jest --runInBand' },
  e2e: { configPath: 'cypress.config.ts', command: 'cypress run --component --browser chrome' },
};

export default {
  react: {
    17: { runConfig },
    18: { runConfig },
  },
};
