import { isConformant } from '../../../testing/isConformant';
import { TableBody } from './TableBody';
import type { TableBodyProps } from './TableBody.types';

const table = document.createElement('table');

describe('TableBody', () => {
  beforeEach(() => {
    table.remove();
    document.body.appendChild(table);
  });

  isConformant<TableBodyProps>({
    Component: TableBody,
    displayName: 'TableBody',
    renderOptions: { container: table },
    axeRenderOptions: { container: table },
    disabledTests: ['has-top-level-file-extra'],
  });
});
