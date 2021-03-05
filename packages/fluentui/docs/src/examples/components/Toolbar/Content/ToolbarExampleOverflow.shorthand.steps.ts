import { toolbarItemClassName, toolbarItemWrapperClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemWrapperClassName} .${toolbarItemClassName}`)
        .snapshot('Overflow item is properly positioned'),
  ],
};

export default config;
