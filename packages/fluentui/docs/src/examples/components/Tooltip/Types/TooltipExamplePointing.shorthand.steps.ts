import { buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder => builder.hover(`.${buttonClassName}`).snapshot('Shows tooltip'),
    (builder, keys) =>
      builder
        .keys('body', keys.tab)
        .snapshot('Has outline on keyboard')
        .click(`.${buttonClassName}`)
        .snapshot('No outline after click'),
  ],
};

export default config;
