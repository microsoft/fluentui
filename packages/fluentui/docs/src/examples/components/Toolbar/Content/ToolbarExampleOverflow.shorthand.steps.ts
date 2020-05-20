import { toolbarItemClassName, toolbarItemSlotClassNames } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemSlotClassNames.wrapper} .${toolbarItemClassName}`)
        .snapshot('Overflow item is properly positioned'),
  ],
};

export default config;
