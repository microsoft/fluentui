import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import { createTableColumn } from '@fluentui/react-table';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import { DataGrid } from './DataGrid';
import { DataGridBody } from './DataGridBody/DataGridBody';
import { DataGridCell } from './DataGridCell/DataGridCell';
import { DataGridRow } from './DataGridRow/DataGridRow';

polyfillBodyAndObserve();

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

interface Item {
  name: string;
  age: number;
}

const items: Item[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
];

const columns = [
  createTableColumn<Item>({ columnId: 'name', renderCell: item => item.name }),
  createTableColumn<Item>({ columnId: 'age', renderCell: item => String(item.age) }),
];

const Grid = (props: { dir?: 'ltr' | 'rtl' }) => (
  <div dir={props.dir}>
    <DataGrid items={items} columns={columns} aria-label="People">
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  </div>
);

describe('DataGrid', () => {
  it('moves within a row with the horizontal arrow keys and stops at the edges of the row', () => {
    mount(<Grid />);

    cy.contains('[role="gridcell"]', 'Alice').focus().realPress('ArrowRight');
    cy.contains('[role="gridcell"]', '25').should('be.focused').realPress('ArrowRight');
    cy.contains('[role="gridcell"]', '25').should('be.focused');

    cy.contains('[role="gridcell"]', 'Bob').focus().realPress('ArrowLeft');
    cy.contains('[role="gridcell"]', 'Bob').should('be.focused').realPress('ArrowRight');
    cy.contains('[role="gridcell"]', '35').should('be.focused');
  });

  it('stops at the edges of the row in right-to-left layouts', () => {
    mount(<Grid dir="rtl" />);

    cy.contains('[role="gridcell"]', 'Alice').focus().realPress('ArrowLeft');
    cy.contains('[role="gridcell"]', '25').should('be.focused').realPress('ArrowLeft');
    cy.contains('[role="gridcell"]', '25').should('be.focused');

    cy.contains('[role="gridcell"]', 'Bob').focus().realPress('ArrowRight');
    cy.contains('[role="gridcell"]', 'Bob').should('be.focused');
  });

  it('keeps the vertical arrow keys in the same column', () => {
    mount(<Grid />);

    cy.contains('[role="gridcell"]', '25').focus().realPress('ArrowDown');
    cy.contains('[role="gridcell"]', '35').should('be.focused');
  });
});
