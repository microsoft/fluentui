import { Button } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder => builder.hover(`.${Button.deprecated_className}`).snapshot('Shows tooltip'),
    (builder, keys) =>
      builder
        .keys('body', keys.tab)
        .snapshot('Has outline on keyboard')
        .click(`.${Button.deprecated_className}`)
        .snapshot('No outline after click'),
  ],
};

export default config;
