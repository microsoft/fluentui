import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import { List } from './List';
import { ListItem } from './ListItem/ListItem';

polyfillBodyAndObserve();

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

describe('List', () => {
  it('moves vertically between items and remembers focus when re-entering the list', () => {
    mount(
      <>
        <button>Before</button>
        <List aria-label="Items" navigationMode="items">
          <ListItem value="one">First item</ListItem>
          <ListItem value="two">Second item</ListItem>
          <ListItem value="three">Third item</ListItem>
        </List>
        <button>After</button>
      </>,
    );

    cy.get('[role="list"]').should('not.have.attr', 'data-tabster');
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.contains('[role="listitem"]', 'First item').should('be.focused').realPress('ArrowDown');
    cy.contains('[role="listitem"]', 'Second item').should('be.focused').realPress('Tab');
    cy.contains('button', 'After').should('be.focused').realPress(['Shift', 'Tab']);
    cy.contains('[role="listitem"]', 'Second item').should('be.focused').realPress('ArrowUp');
    cy.contains('[role="listitem"]', 'First item').should('be.focused');
  });

  it('selects once with Space, Enter, and the native checkmark', () => {
    const onSelectionChange = cy.stub().as('selectionChange');
    mount(
      <List aria-label="Items" selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one">First item</ListItem>
        <ListItem value="two">Second item</ListItem>
      </List>,
    );

    cy.contains('[role="option"]', 'First item').focus().realPress('Space');
    cy.contains('[role="option"]', 'First item')
      .should('have.attr', 'data-selected', '')
      .find('input[type="checkbox"]')
      .should('be.checked');
    cy.get('@selectionChange').should('have.been.calledOnce');

    cy.contains('[role="option"]', 'First item').realPress('ArrowDown');
    cy.contains('[role="option"]', 'Second item').should('be.focused').realPress('Enter');
    cy.contains('[role="option"]', 'Second item').should('have.attr', 'data-selected', '');
    cy.get('@selectionChange').should('have.been.calledTwice');

    cy.contains('[role="option"]', 'Second item').find('input[type="checkbox"]').click();
    cy.contains('[role="option"]', 'Second item').should('not.have.attr', 'data-selected');
    cy.get('@selectionChange').should('have.been.calledThrice');
  });

  it('keeps disabled selection inert for pointer, keyboard, and checkmark interaction', () => {
    const onSelectionChange = cy.stub().as('selectionChange');
    mount(
      <List aria-label="Items" selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one" disabledSelection>
          First item
        </ListItem>
      </List>,
    );

    cy.contains('[role="option"]', 'First item').click().focus().realPress('Space').realPress('Enter');
    cy.contains('[role="option"]', 'First item')
      .should('have.attr', 'data-disabled', '')
      .should('not.have.attr', 'data-selected');
    cy.contains('[role="option"]', 'First item')
      .find('input[type="checkbox"]')
      .should('be.disabled');
    cy.get('@selectionChange').should('not.have.been.called');
  });
});
