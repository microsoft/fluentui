import { InfoButton } from '@fluentui/react-infobutton';

import descriptionMd from './InfoButtonDescription.md';
import bestPracticesMd from './InfoButtonBestPractices.md';

export { Default } from './InfoButtonDefault.stories';
export { Size } from './InfoButtonSize.stories';

export default {
  title: 'Preview Components/InfoButton',
  component: InfoButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
