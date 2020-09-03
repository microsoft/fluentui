const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click('#open-menus')
        .snapshot('Shows a usual menu')
        .click('#open-menus')
        .snapshot('Shows a styled menu'),
  ],
};

export default config;
