import { isConformant } from '../../../testing/isConformant';
import { TableRow } from './TableRow';
import type { TableRowProps } from './TableRow.types';

const tbody = document.createElement('tbody');

describe('TableRow', () => {
  beforeEach(() => {
    tbody.remove();
    document.body.appendChild(tbody);
  });

  isConformant<TableRowProps>({
    Component: TableRow,
    displayName: 'TableRow',
    renderOptions: { container: tbody },
    axeRenderOptions: { container: tbody },
    disabledTests: ['has-top-level-file-extra'],
  });
});
