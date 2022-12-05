import { DataGridVirtualizedBody } from '@fluentui/react-table';

import descriptionMd from './DataGridVirtualizedBodyDescription.md';
import bestPracticesMd from './DataGridVirtualizedBodyBestPractices.md';

export { Default } from './DataGridVirtualizedBodyDefault.stories';

export default {
  title: 'Preview Components/DataGridVirtualizedBody',
  component: DataGridVirtualizedBody,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
