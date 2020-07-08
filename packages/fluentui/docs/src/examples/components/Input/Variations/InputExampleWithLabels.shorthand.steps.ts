const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .snapshot('Input: Labels')
        .setValue(`#internal-label`, 'Some text...')
        .snapshot('Input: Internal Label with Value'),
  ],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
};

export default config;
