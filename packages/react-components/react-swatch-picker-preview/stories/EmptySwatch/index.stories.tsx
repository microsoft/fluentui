import { EmptySwatch } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './EmptySwatchDescription.md';
import bestPracticesMd from './EmptySwatchBestPractices.md';

export { Default } from './EmptySwatchDefault.stories';

export default {
  title: 'Preview Components/EmptySwatch',
  component: EmptySwatch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
