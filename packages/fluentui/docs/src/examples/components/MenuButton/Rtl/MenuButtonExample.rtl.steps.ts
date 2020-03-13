import { Button } from '@fluentui/react-experimental';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(`.${Button.className}`).snapshot('RTL: Shows menuButton')]
};

export default config;
