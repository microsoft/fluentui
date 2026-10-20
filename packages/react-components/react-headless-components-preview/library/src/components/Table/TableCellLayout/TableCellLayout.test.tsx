import { isConformant } from '../../../testing/isConformant';
import { TableCellLayout } from './TableCellLayout';
import type { TableCellLayoutProps } from './TableCellLayout.types';

describe('TableCellLayout', () => {
  isConformant<TableCellLayoutProps>({
    Component: TableCellLayout,
    displayName: 'TableCellLayout',
    disabledTests: ['has-top-level-file-extra'],
  });
});
