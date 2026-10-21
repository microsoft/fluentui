import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell } from '../../index';
import { tableHeaderCellClassNames } from './useTableHeaderCellStyles.styles';

const mountTable = (headerStyle: React.CSSProperties) =>
  mount(
    <FluentProvider theme={webLightTheme}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell sortable style={headerStyle}>
              Amount
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>12</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FluentProvider>,
  );

/** Bounds of the header label itself, which is a text node inside the button. */
function labelBounds(button: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(button);
  return range.getBoundingClientRect();
}

describe('TableHeaderCell', () => {
  it('aligns the sortable button with the cell justification', () => {
    mountTable({ justifyContent: 'flex-end' });

    cy.get(`.${tableHeaderCellClassNames.button}`).should('have.css', 'justify-content', 'flex-end');
  });

  it('moves the sortable label to the end edge when the cell is justified to the end', () => {
    mountTable({ justifyContent: 'flex-end', width: '240px' });

    cy.get(`.${tableHeaderCellClassNames.button}`).then($button => {
      const button = $button[0];
      const label = labelBounds(button);
      const buttonRight = button.getBoundingClientRect().right;
      expect(Math.round(label.right)).to.be.closeTo(Math.round(buttonRight), 8);
    });
  });

  it('keeps the sortable label at the start when the cell sets no justification', () => {
    mountTable({ width: '240px' });

    cy.get(`.${tableHeaderCellClassNames.button}`).then($button => {
      const button = $button[0];
      const label = labelBounds(button);
      const buttonLeft = button.getBoundingClientRect().left;
      expect(Math.round(label.left)).to.be.closeTo(Math.round(buttonLeft), 8);
    });
  });
});
