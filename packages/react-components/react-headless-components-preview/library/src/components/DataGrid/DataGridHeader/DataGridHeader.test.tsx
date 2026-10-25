import { isConformant } from '../../../testing/isConformant';
import { DataGridHeader } from './DataGridHeader';
import type { DataGridHeaderProps } from './DataGridHeader.types';

describe('DataGridHeader', () => {
  isConformant<DataGridHeaderProps>({
    Component: DataGridHeader,
    displayName: 'DataGridHeader',
    // The required ARIA parents and children are verified on the complete grid in DataGrid.test.tsx
    disabledTests: ['has-top-level-file-extra', 'component-has-no-axe-violations'],
  });
});
