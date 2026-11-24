import { isConformant } from '../../../testing/isConformant';
import { TableCellActions } from './TableCellActions';
import type { TableCellActionsProps } from './TableCellActions.types';

describe('TableCellActions', () => {
  isConformant<TableCellActionsProps>({
    Component: TableCellActions,
    displayName: 'TableCellActions',
    disabledTests: ['has-top-level-file-extra'],
  });
});
