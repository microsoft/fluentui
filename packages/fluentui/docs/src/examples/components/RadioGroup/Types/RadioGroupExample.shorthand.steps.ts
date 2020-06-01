const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [(builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses item')],
  browsers: ['ie11'],
};

export default config;
