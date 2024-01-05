import { RadioSwatch } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './RadioSwatchDescription.md';
import bestPracticesMd from './RadioSwatchBestPractices.md';

//export { Default } from './RadioSwatchDefault.stories';

export default {
  title: 'Preview Components/RadioSwatch',
  component: RadioSwatch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
