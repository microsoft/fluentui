const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click('#open-menu')
        .snapshot('Shows a usual menu')
        .click('#open-menu-variables')
        .snapshot('Shows a styled menu'),
  ],
};

export default config;
