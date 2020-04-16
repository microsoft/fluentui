import { buttonClassName, dialogSlotClassNames } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .hover(`.${dialogSlotClassNames.content} .${buttonClassName}`)
        .snapshot('Shows tooltip in a dialog'),
  ],
};

export default config;
