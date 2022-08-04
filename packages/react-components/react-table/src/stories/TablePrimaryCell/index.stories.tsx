import { TablePrimaryCell } from '@fluentui/react-table';

import descriptionMd from './TablePrimaryCellDescription.md';
import bestPracticesMd from './TablePrimaryCellBestPractices.md';

export { Default } from './TablePrimaryCellDefault.stories';

export default {
  title: 'Preview Components/TablePrimaryCell',
  component: TablePrimaryCell,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
