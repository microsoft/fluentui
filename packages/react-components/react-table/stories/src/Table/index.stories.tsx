import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableSelectionCell,
  TableCellLayout,
} from '@fluentui/react-components';
import descriptionMd from './TableDescription.md';
import bestPracticesMd from './TableBestPractices.md';

export { Default } from './Default.stories';
export { SizeSmall } from './SizeSmall.stories';
export { SizeExtraSmall } from './SizeExtraSmall.stories';
export { NonNativeElements } from './NonNativeElements.stories';
export { CellActions } from './CellActions.stories';
export { PrimaryCell } from './PrimaryCell.stories';
export { CellNavigation } from './CellNavigation.stories';
export { FocusableElementsInCells } from './FocusableElements.Cells.stories';
export { CompositeNavigation } from './CompositeNavigation.stories';

export { Sort } from './Sort.stories';
export { ResizableColumnsUncontrolled } from './ResizableColumnsUncontrolled.stories';
export { ResizableColumnsControlled } from './ResizableColumnsControlled.stories';
export { ResizableColumnsDisableAutoFit } from './ResizableColumnsDisableAutoFit.stories';

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
  title: 'Components/Table',
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
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
