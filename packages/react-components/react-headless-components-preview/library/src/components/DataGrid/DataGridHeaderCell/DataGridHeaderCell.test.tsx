import { isConformant } from '../../../testing/isConformant';
import { DataGridHeaderCell } from './DataGridHeaderCell';
import type { DataGridHeaderCellProps } from './DataGridHeaderCell.types';

describe('DataGridHeaderCell', () => {
  isConformant<DataGridHeaderCellProps>({
    Component: DataGridHeaderCell,
    displayName: 'DataGridHeaderCell',
    // The required ARIA parents and children are verified on the complete grid in DataGrid.test.tsx
    disabledTests: ['has-top-level-file-extra', 'component-has-no-axe-violations'],
  });
});
