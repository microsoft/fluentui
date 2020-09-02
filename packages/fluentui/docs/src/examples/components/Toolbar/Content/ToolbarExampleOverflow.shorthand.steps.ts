import { toolbarItemClassName, toolbarItemWrapperClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemWrapperClassName} .${toolbarItemClassName}`)
        .snapshot('Overflow item is properly positioned'),
  ],
};

export default config;
