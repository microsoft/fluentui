import { isConformant } from '../../../testing/isConformant';
import { DataGridBody } from './DataGridBody';
import type { DataGridBodyProps } from './DataGridBody.types';

describe('DataGridBody', () => {
  isConformant<DataGridBodyProps>({
    Component: DataGridBody,
    displayName: 'DataGridBody',
    requiredProps: { children: () => null } as DataGridBodyProps,
    // The required ARIA parents and children are verified on the complete grid in DataGrid.test.tsx
    disabledTests: ['has-top-level-file-extra', 'component-has-no-axe-violations'],
  });
});
