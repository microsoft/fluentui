import * as React from 'react';
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent } from 'test/utils';
import { TableCell } from 'src/components/Table/TableCell';

import { TableRow } from 'src/components/Table/TableRow';

describe('TableRow', () => {
  isConformant(TableRow, { testPath: __filename, constructorName: 'TableRow' });

  describe('accessiblity', () => {
    handlesAccessibility(TableRow, { defaultRootRole: 'row' });
  });

  const items = [
    { content: '1', key: '1-1' },
    {
      content: 'Roman van von der Longername',

      key: '1-2',
    },
    { content: 'None', key: '1-3' },
    { content: '30 years', key: '1-4' },
  ];

  it('renders as `div`', () => {
    const tableRow = mountWithProviderAndGetComponent(TableRow, <TableRow items={items} />)
      .find('.ui-table__row')
      .hostNodes();

    expect(tableRow.is('div')).toBe(true);
  });

  describe('items', () => {
    it('render children', () => {
      const tableRow = mountWithProviderAndGetComponent(TableRow, <TableRow items={items} />)
        .find('.ui-table__row')
        .hostNodes();

      const tableCells = tableRow.find(TableCell);
      expect(tableCells.length).toBe(4);
      expect(tableCells.first().props().content).toBe('1');
      expect(tableCells.last().props().content).toBe('30 years');
    });

    it('does not render empty children', () => {
      const tableRow = mountWithProviderAndGetComponent(TableRow, <TableRow items={[]} />)
        .find('.ui-table__row')
        .hostNodes();

      const tableCells = tableRow.find(TableCell);
      expect(tableCells.length).toBe(0);
    });
  });

  describe('header', () => {
    it('render columnheader role when is true', () => {
      const tableRow = mountWithProviderAndGetComponent(TableRow, <TableRow items={items} header />)
        .find('.ui-table__row')
        .hostNodes();

      const tableCells = tableRow.find(TableCell);
      expect(tableCells.length).toBe(4);
      expect(getRenderedAttribute(tableCells.first(), 'role', '')).toBe('columnheader');
      expect(getRenderedAttribute(tableCells.last(), 'role', '')).toBe('columnheader');
    });

    it('not render columnheader cells when is false', () => {
      const tableRow = mountWithProviderAndGetComponent(TableRow, <TableRow items={items} />)
        .find('.ui-table__row')
        .hostNodes();

      const tableCells = tableRow.find(TableCell);
      expect(tableCells.length).toBe(4);
      expect(getRenderedAttribute(tableCells.first(), 'role', '')).not.toBe('columnheader');
      expect(getRenderedAttribute(tableCells.last(), 'role', '')).not.toBe('columnheader');
    });
  });
});
