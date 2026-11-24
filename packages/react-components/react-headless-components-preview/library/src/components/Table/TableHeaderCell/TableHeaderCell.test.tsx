import { isConformant } from '../../../testing/isConformant';
import { TableHeaderCell } from './TableHeaderCell';
import type { TableHeaderCellProps } from './TableHeaderCell.types';

const tr = document.createElement('tr');

describe('TableHeaderCell', () => {
  beforeEach(() => {
    tr.remove();
    document.body.appendChild(tr);
  });

  isConformant<TableHeaderCellProps>({
    Component: TableHeaderCell,
    displayName: 'TableHeaderCell',
    renderOptions: { container: tr },
    axeRenderOptions: { container: tr },
    disabledTests: ['has-top-level-file-extra'],
  });
});
