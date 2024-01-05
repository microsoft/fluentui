import { ColorSwatch } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './ColorSwatchDescription.md';
import bestPracticesMd from './ColorSwatchBestPractices.md';

//export { Default } from './ColorSwatchDefault.stories';

export default {
  title: 'Preview Components/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
