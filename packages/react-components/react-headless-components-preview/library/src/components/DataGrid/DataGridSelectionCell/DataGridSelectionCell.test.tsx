import { isConformant } from '../../../testing/isConformant';
import { DataGridSelectionCell } from './DataGridSelectionCell';
import type { DataGridSelectionCellProps } from './DataGridSelectionCell.types';

describe('DataGridSelectionCell', () => {
  isConformant<DataGridSelectionCellProps>({
    Component: DataGridSelectionCell,
    displayName: 'DataGridSelectionCell',
    // the native selection indicator needs an accessible name
    requiredProps: { checkboxIndicator: { 'aria-label': 'Select row' } },
    // The required ARIA parents and children are verified on the complete grid in DataGrid.test.tsx
    disabledTests: ['has-top-level-file-extra', 'component-has-no-axe-violations'],
  });
});
