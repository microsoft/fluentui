const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

const config = createConfig();

module.exports = {
	...config,
	moduleNameMapper: {
		...(config.moduleNameMapper || {}),
		'^@fluentui/set-version$': '<rootDir>/src/testing/setVersionMock.js',
	},
};
