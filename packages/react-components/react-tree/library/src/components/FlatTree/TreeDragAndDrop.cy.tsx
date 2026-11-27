import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { DragAndDrop } from '../../../../stories/src/Tree/TreeDragAndDrop.stories';

describe('Tree drag and drop example', () => {
  beforeEach(() => {
    cy.viewport(1000, 660);
    mount(
      <FluentProvider theme={webLightTheme}>
        <DragAndDrop />
      </FluentProvider>,
    );
  });

  const item = (label: string) => cy.contains('.fui-TreeItem', label);
  const order = () =>
    cy.get('.fui-TreeItem[aria-level="2"]').then(elements => Array.from(elements, element => element.textContent));

  it('sorts by sibling with the keyboard without moving focus or leaving the tree', () => {
    item('Sortable item 1').focus();
    cy.realPress('Enter');
    cy.realPress('ArrowDown');
    cy.realPress('ArrowDown');
    item('Sortable item 1').should('be.focused');
    cy.realPress('Enter');
    order().should('deep.equal', [
      'Sortable item 2',
      'Sortable item 3',
      'Sortable item 1',
      'Sortable item 4',
      'Sortable item 5',
      'Sortable item 6',
      'Sortable item 7',
      'Sortable item 8',
    ]);

    item('Sortable item 1').should('be.focused');
    cy.realPress('ArrowDown');
    item('Sortable item 4').should('be.focused');
  });

  it('keeps keyboard dragging within the sortable siblings and cancels without reordering', () => {
    item('Sortable item 8').focus();
    cy.realPress('Enter');
    cy.realPress('ArrowDown');
    cy.realPress('ArrowRight');
    item('Sortable item 8')
      .should('be.focused')
      .then(element => {
        const itemRect = element[0].getBoundingClientRect();
        const treeRect = element[0].closest('[role="tree"]')!.getBoundingClientRect();
        expect(itemRect.bottom).to.be.at.most(treeRect.bottom);
        expect(itemRect.right).to.be.at.most(treeRect.right);
      });
    cy.realPress('ArrowUp');
    cy.realPress('Escape');
    order().should(
      'deep.equal',
      Array.from({ length: 8 }, (_, index) => `Sortable item ${index + 1}`),
    );
    item('Sortable item 8').should('be.focused');
    cy.get('.fui-TreeItem').each(element => expect(element).to.have.attr('role', 'treeitem'));
    cy.get('[role="treeitem"][tabindex="0"]').should('have.length', 1);
  });

  it('cancels a Space-activated drag after scrolling and restores ordinary navigation', () => {
    cy.viewport(600, 250);
    item('Sortable item 1').focus();
    cy.realPress('Space');
    cy.scrollTo('bottom');
    cy.realPress('Escape');
    order().should(
      'deep.equal',
      Array.from({ length: 8 }, (_, index) => `Sortable item ${index + 1}`),
    );
    item('Sortable item 1').should('be.focused');
    cy.realPress('ArrowDown');
    item('Sortable item 2').should('be.focused');
  });

  it('still supports pointer sorting', () => {
    item('Sortable item 3').then(element => {
      const targetRect = element[0].getBoundingClientRect();
      item('Sortable item 1').then(active => {
        const activeRect = active[0].getBoundingClientRect();
        item('Sortable item 1').realMouseDown();
        item('Sortable item 1').realMouseMove(0, targetRect.top - activeRect.top, { position: 'center' });
        item('Sortable item 1').realMouseUp();
      });
    });
    order().should('deep.equal', [
      'Sortable item 2',
      'Sortable item 3',
      'Sortable item 1',
      'Sortable item 4',
      'Sortable item 5',
      'Sortable item 6',
      'Sortable item 7',
      'Sortable item 8',
    ]);
  });
});
