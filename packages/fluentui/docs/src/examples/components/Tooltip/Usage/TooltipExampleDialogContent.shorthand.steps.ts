import { buttonClassName, dialogSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

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
