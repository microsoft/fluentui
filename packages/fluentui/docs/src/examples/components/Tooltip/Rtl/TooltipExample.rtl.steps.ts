import { Button } from '@fluentui/react';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.hover(`.${Button.className}`).snapshot('RTL: Shows tooltip')]
};

export default config;
