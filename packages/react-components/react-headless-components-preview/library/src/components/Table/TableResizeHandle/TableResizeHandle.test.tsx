import { isConformant } from '../../../testing/isConformant';
import { TableResizeHandle } from './TableResizeHandle';
import type { TableResizeHandleProps } from './TableResizeHandle.types';

describe('TableResizeHandle', () => {
  isConformant<TableResizeHandleProps>({
    Component: TableResizeHandle,
    displayName: 'TableResizeHandle',
    disabledTests: ['has-top-level-file-extra'],
  });
});
