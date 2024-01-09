import { TableSwatch } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './TableSwatchDescription.md';
import bestPracticesMd from './TableSwatchBestPractices.md';

// export { Default } from './TableSwatchDefault.stories';

export default {
  title: 'Preview Components/TableSwatch',
  component: TableSwatch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
