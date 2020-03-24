const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click('#above')
        .snapshot('Sets positions to above')
        .click('#below')
        .snapshot('Sets positions to below'),
  ],
};

export default config;
