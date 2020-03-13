import { Button } from '@fluentui/react-experimental';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(`.${Button.className}`).snapshot('RTL: Shows popup')]
};

export default config;
