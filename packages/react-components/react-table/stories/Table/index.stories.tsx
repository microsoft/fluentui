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
export { SizeSmall } from './SizeSmall.stories';
export { SizeExtraSmall } from './SizeExtraSmall.stories';
export { NonNativeElements } from './NonNativeElements.stories';
export { CellActions } from './CellActions.stories';
export { PrimaryCell } from './PrimaryCell.stories';
export { CellNavigation } from './CellNavigation.stories';
export { RowNavigation } from './RowNavigation.stories';
export { Sort } from './Sort.stories';
export { SortControlled } from './SortControlled.stories';
export { MultipleSelect } from './MultipleSelect.stories';
export { SingleSelect } from './SingleSelect.stories';
export { MultipleSelectControlled } from './MultipleSelectControlled.stories';
export { SingleSelectControlled } from './SingleSelectControlled.stories';
export { SubtleSelection } from './SubtleSelection.stories';
export { SelectionWithCellActions } from './SelectionWithCellActions.stories';
export { Virtualization } from './Virtualization.stories';
export { DataGrid } from './DataGrid.stories';
export { Memoization } from './Memoization.stories';

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
