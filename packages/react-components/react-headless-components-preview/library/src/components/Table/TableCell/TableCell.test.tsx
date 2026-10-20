import { isConformant } from '../../../testing/isConformant';
import { TableCell } from './TableCell';
import type { TableCellProps } from './TableCell.types';

const tr = document.createElement('tr');

describe('TableCell', () => {
  beforeEach(() => {
    tr.remove();
    document.body.appendChild(tr);
  });

  isConformant<TableCellProps>({
    Component: TableCell,
    displayName: 'TableCell',
    renderOptions: { container: tr },
    axeRenderOptions: { container: tr },
    disabledTests: ['has-top-level-file-extra'],
  });
});
