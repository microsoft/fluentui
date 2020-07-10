const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .snapshot('Input: Labels')
        .setValue(`#inside-label`, 'Some text...')
        .snapshot('Input: Inside Label with Value'),
  ],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
};

export default config;
