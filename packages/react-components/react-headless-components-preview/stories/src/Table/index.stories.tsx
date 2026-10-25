import {
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableResizeHandle,
  TableRow,
  TableSelectionCell,
} from '@fluentui/react-headless-components-preview/table';

import descriptionMd from './TableDescription.md';

import './table.module.css';

export { Default } from './TableDefault.stories';
export { NoNativeElements } from './TableNoNativeElements.stories';
export { Sortable } from './TableSortable.stories';

export default {
  title: 'Components/Table',
  component: Table,
  subcomponents: {
    TableBody,
    TableCell,
    TableCellActions,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableResizeHandle,
    TableRow,
    TableSelectionCell,
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
