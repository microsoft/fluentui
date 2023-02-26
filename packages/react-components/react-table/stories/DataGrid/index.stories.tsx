import {
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  DataGridSelectionCell,
} from '@fluentui/react-components';
import descriptionMd from './DataGridDescription.md';

export { Default } from './Default.stories';
export { RowNavigation } from './RowNavigation.stories';
export { Sort } from './Sort.stories';
export { SortControlled } from './SortControlled.stories';
export { MultipleSelect } from './MultipleSelect.stories';
export { MultipleSelectControlled } from './MultipleSelectControlled.stories';
export { SingleSelect } from './SingleSelect.stories';
export { SingleSelectControlled } from './SingleSelectControlled.stories';
export { SubtleSelection } from './SubtleSelection.stories';
export { SelectionAppearance } from './SelectionAppearance.stories';
export { ResizableColumns } from './ResizableColumns.stories';
export { Virtualization } from './Virtualization.stories';
export { CustomRowId } from './CustomRowId.stories';

export default {
  title: 'Components/DataGrid',
  component: DataGrid,
  subcomponents: {
    DataGridHeader,
    DataGridHeaderCell,
    DataGridBody,
    DataGridRow,
    DataGridCell,
    DataGridSelectionCell,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
