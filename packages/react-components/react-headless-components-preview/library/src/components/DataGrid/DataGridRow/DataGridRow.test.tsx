import { isConformant } from '../../../testing/isConformant';
import { DataGridRow } from './DataGridRow';
import type { DataGridRowProps } from './DataGridRow.types';

describe('DataGridRow', () => {
  isConformant<DataGridRowProps>({
    Component: DataGridRow,
    displayName: 'DataGridRow',
    requiredProps: { children: () => null } as DataGridRowProps,
    // The required ARIA parents and children are verified on the complete grid in DataGrid.test.tsx
    disabledTests: ['has-top-level-file-extra', 'component-has-no-axe-violations'],
  });
});
