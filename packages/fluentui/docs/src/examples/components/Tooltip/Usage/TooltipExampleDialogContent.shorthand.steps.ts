import { Button, Dialog } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(`.${Button.className}`)
        .hover(`.${Dialog.slotClassNames.content} .${Button.className}`)
        .snapshot('Shows tooltip in a dialog'),
  ],
};

export default config;
