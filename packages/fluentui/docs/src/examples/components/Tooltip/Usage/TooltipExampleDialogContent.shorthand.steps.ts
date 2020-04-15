import { Button, Dialog } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(`.${Button.deprecated_className}`)
        .hover(`.${Dialog.slotClassNames.content} .${Button.deprecated_className}`)
        .snapshot('Shows tooltip in a dialog'),
  ],
};

export default config;
