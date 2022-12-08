import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableSelectionCell,
  TableCellLayout,
} from '@fluentui/react-components/unstable';
import descriptionMd from './TableDescription.md';

export { Default } from './Default.stories';
export { TableSelection } from './TableSelection.stories';
export { GridSelection } from './GridSelection.stories';

export default {
  title: 'Preview Components/Table',
  component: Table,
  subcomponents: {
    TableHeader,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
    TableSelectionCell,
    TableCellLayout,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
