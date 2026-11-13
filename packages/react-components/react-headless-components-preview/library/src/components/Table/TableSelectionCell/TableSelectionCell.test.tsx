import { isConformant } from '../../../testing/isConformant';
import { TableSelectionCell } from './TableSelectionCell';
import type { TableSelectionCellProps } from './TableSelectionCell.types';

const tr = document.createElement('tr');

describe('TableSelectionCell', () => {
  beforeEach(() => {
    tr.remove();
    document.body.appendChild(tr);
  });

  isConformant<TableSelectionCellProps>({
    Component: TableSelectionCell,
    displayName: 'TableSelectionCell',
    // the native selection indicator needs an accessible name
    requiredProps: { checkboxIndicator: { 'aria-label': 'Select row' } },
    renderOptions: { container: tr },
    axeRenderOptions: { container: tr },
    disabledTests: ['has-top-level-file-extra'],
  });
});
