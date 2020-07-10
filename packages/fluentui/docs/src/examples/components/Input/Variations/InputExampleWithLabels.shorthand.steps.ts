const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .snapshot('Input: Labels')
        .setValue(`#internal-label`, 'Some text...')
        .snapshot('Input: Inside Label with Value'),
  ],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
};

export default config;
