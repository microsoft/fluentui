import { Table } from '../..';
import descriptionMd from './TableDescription.md';

export { Default } from './Default.stories';
export { Sort } from './Sort.stories';
export { SortControlled } from './SortControlled.stories';
export { CellActions } from './CellActions.stories';
export { PrimaryCell } from './PrimaryCell.stories';
export { SizeSmall } from './SizeSmall.stories';
export { SizeSmaller } from './SizeSmaller.stories';
export { NonNativeElements } from './NonNativeElements.stories';
export { MultipleSelect } from './MultipleSelect.stories';
export { SingleSelect } from './SingleSelect.stories';
export { MultipleSelectControlled } from './MultipleSelectControlled.stories';
export { SingleSelectControlled } from './SingleSelectControlled.stories';
export { CellNavigationMode } from './CellNavigationMode.stories';
export { RowNavigationMode } from './RowNavigationMode.stories';
export { CompositeNavigationMode } from './CompositeNavigationMode.stories';

export default {
  title: 'Preview Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
