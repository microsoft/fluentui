import { isConformant } from '../../../testing/isConformant';
import { DataGridCell } from './DataGridCell';
import type { DataGridCellProps } from './DataGridCell.types';

describe('DataGridCell', () => {
  isConformant<DataGridCellProps>({
    Component: DataGridCell,
    displayName: 'DataGridCell',
    // The required ARIA parents and children are verified on the complete grid in DataGrid.test.tsx
    disabledTests: ['has-top-level-file-extra', 'component-has-no-axe-violations'],
  });
});
