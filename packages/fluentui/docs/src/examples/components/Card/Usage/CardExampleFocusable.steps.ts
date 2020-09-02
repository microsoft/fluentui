const config: ScreenerTestsConfig = {
  steps: [(builder, keys) => builder.keys('body', keys.tab).snapshot('Focus on a card')],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
};

export default config;
