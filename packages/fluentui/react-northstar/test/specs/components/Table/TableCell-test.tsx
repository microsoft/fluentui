import * as React from 'react';
import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent } from 'test/utils';
import { TableCell } from 'src/components/Table/TableCell';

describe('TableCell', () => {
  isConformant(TableCell, { testPath: __filename, constructorName: 'TableCell' });

  describe('accessiblity', () => {
    handlesAccessibility(TableCell, { defaultRootRole: 'cell' });
  });

  it('renders as `div`', () => {
    const tableCell = mountWithProviderAndGetComponent(TableCell, <TableCell content="CellContent" />)
      .find('.ui-table__cell')
      .hostNodes();

    expect(tableCell.is('div')).toBe(true);
    expect(tableCell.text()).toBe('CellContent');
  });
});
