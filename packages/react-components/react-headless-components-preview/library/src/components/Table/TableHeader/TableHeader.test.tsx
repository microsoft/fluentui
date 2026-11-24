import { isConformant } from '../../../testing/isConformant';
import { TableHeader } from './TableHeader';
import type { TableHeaderProps } from './TableHeader.types';

const table = document.createElement('table');

describe('TableHeader', () => {
  beforeEach(() => {
    table.remove();
    document.body.appendChild(table);
  });

  isConformant<TableHeaderProps>({
    Component: TableHeader,
    displayName: 'TableHeader',
    renderOptions: { container: table },
    axeRenderOptions: { container: table },
    disabledTests: ['has-top-level-file-extra'],
  });
});
