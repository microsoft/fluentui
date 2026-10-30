const { createV8Config } = require('@fluentui/scripts-jest');

module.exports = createV8Config({
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json', isolatedModules: true }],
  },
});
