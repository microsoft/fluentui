import { Button } from '@fluentui/react-experimental';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(`.${Button.className}`).snapshot('Shows popup')]
};

export default config;
