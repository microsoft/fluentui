import { TableCellActions } from '@fluentui/react-table';

import descriptionMd from './TableCellActionsDescription.md';
import bestPracticesMd from './TableCellActionsBestPractices.md';

export { Default } from './TableCellActionsDefault.stories';

export default {
  title: 'Preview Components/TableCellActions',
  component: TableCellActions,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
