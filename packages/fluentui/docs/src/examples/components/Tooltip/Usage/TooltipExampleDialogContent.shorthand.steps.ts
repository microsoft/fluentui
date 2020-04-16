import { buttonClassName, Dialog } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .hover(`.${Dialog.slotClassNames.content} .${buttonClassName}`)
        .snapshot('Shows tooltip in a dialog'),
  ],
};

export default config;
