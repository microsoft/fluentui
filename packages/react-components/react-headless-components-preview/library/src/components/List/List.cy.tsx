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
  it('navigates composite rows and secondary actions without flattening their focus order', () => {
    mount(
      <List aria-label="People actions" navigationMode="composite">
        {['Alex', 'Mona', 'Allan'].map(person => (
          <ListItem key={person} value={person}>
            <span role="gridcell">{person}</span>
            <span role="gridcell">
              <button aria-label={`Edit ${person}`}>Edit</button>
              <button aria-label={`More ${person}`}>More</button>
            </span>
          </ListItem>
        ))}
      </List>,
    );

    cy.get('[role="row"]').first().focus().realPress('ArrowDown');
    cy.get('[role="row"]').eq(1).should('be.focused').realPress('ArrowUp');
    cy.get('[role="row"]').first().should('be.focused').realPress('ArrowRight');
    cy.get('[aria-label="Edit Alex"]').should('be.focused').realPress('ArrowRight');
    cy.get('[aria-label="More Alex"]').should('be.focused').realPress('ArrowLeft');
    cy.get('[aria-label="Edit Alex"]').should('be.focused').realPress('ArrowLeft');
    cy.get('[role="row"]').first().should('be.focused').realPress('ArrowRight');
    cy.get('[aria-label="Edit Alex"]').should('be.focused').realPress('Escape');
    cy.get('[role="row"]').first().should('be.focused').realPress('ArrowRight');
    cy.get('[aria-label="Edit Alex"]').realPress('ArrowDown');
    cy.get('[role="row"]').eq(1).should('be.focused').realPress('ArrowRight');
    cy.get('[aria-label="Edit Mona"]').should('be.focused').realPress('ArrowUp');
    cy.get('[role="row"]').first().should('be.focused');
  });

  it('skips disabled and hidden composite controls and preserves text-input arrow keys', () => {
    mount(
      <List aria-label="Actions" navigationMode="composite">
        <ListItem value="one">
          <span role="gridcell">
            <button disabled>Disabled</button>
            <button hidden>Hidden</button>
            <input aria-label="Name" defaultValue="Alex" />
            <button>Edit</button>
          </span>
        </ListItem>
      </List>,
    );

    cy.get('[role="row"]').focus().realPress('ArrowRight');
    cy.get('[aria-label="Name"]').should('be.focused').realPress('ArrowLeft').realPress('ArrowDown');
    cy.get('[aria-label="Name"]').should('be.focused').realPress('Escape');
    cy.get('[role="row"]').should('be.focused');
  });

  it('lets the consumer cancel composite row entry and inner-control vertical navigation', () => {
    mount(
      <List aria-label="Actions" navigationMode="composite">
        <ListItem value="one" onKeyDown={event => event.preventDefault()}>
          <span role="gridcell">
            <button>Edit</button>
          </span>
        </ListItem>
        <ListItem value="two">
          <span role="gridcell">
            <button>More</button>
          </span>
        </ListItem>
      </List>,
    );

    cy.get('[role="row"]').first().focus().realPress('ArrowRight');
    cy.get('[role="row"]').first().should('be.focused');
    cy.contains('button', 'Edit').focus().realPress('ArrowDown');
    cy.contains('button', 'Edit').should('be.focused');
  });

  it('uses a single composite tab stop and remembers the current row on re-entry', () => {
    mount(
      <>
        <button>Before</button>
        <List aria-label="Actions" navigationMode="composite">
          {['Alex', 'Mona'].map(person => (
            <ListItem key={person} value={person}>
              <span role="gridcell">
                <button>{person}</button>
              </span>
            </ListItem>
          ))}
        </List>
        <button>After</button>
      </>,
    );

    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.get('[role="row"]').first().should('be.focused').realPress('ArrowDown');
    cy.get('[role="row"]').eq(1).should('be.focused').realPress('Tab');
    cy.contains('button', 'After').should('be.focused').realPress(['Shift', 'Tab']);
    cy.get('[role="row"]').eq(1).should('be.focused').realPress('ArrowRight');
    cy.contains('button', 'Mona').should('be.focused').realPress('Tab');
    cy.contains('button', 'After').should('be.focused').realPress(['Shift', 'Tab']);
    cy.contains('button', 'Mona').should('be.focused');
  });

  it('respects arrow-key cancellation by a composite child control', () => {
    mount(
      <List aria-label="Actions" navigationMode="composite">
        <ListItem value="one">
          <span role="gridcell">
            <button onKeyDown={event => event.preventDefault()}>Edit</button>
            <button>More</button>
          </span>
        </ListItem>
        <ListItem value="two">
          <span role="gridcell">
            <button>Next row</button>
          </span>
        </ListItem>
      </List>,
    );

    cy.get('[role="row"]').first().focus().realPress('ArrowRight');
    cy.contains('button', 'Edit').should('be.focused').realPress('ArrowRight').realPress('ArrowDown');
    cy.contains('button', 'Edit').should('be.focused');
  });

  it('reverses composite horizontal navigation in right-to-left layouts', () => {
    mountBase(
      <Provider dir="rtl">
        <List aria-label="Actions" navigationMode="composite">
          <ListItem value="one">
            <span role="gridcell">
              <button>Edit</button>
              <button>More</button>
            </span>
          </ListItem>
        </List>
      </Provider>,
    );

    cy.get('[role="row"]').focus().realPress('ArrowLeft');
    cy.contains('button', 'Edit').should('be.focused').realPress('ArrowLeft');
    cy.contains('button', 'More').should('be.focused').realPress('ArrowRight');
    cy.contains('button', 'Edit').should('be.focused').realPress('ArrowRight');
    cy.get('[role="row"]').should('be.focused');
  });

  it('keeps composite tab stops valid when rows are removed and preserves explicit control opt-outs', () => {
    const DynamicList = () => {
      const [people, setPeople] = React.useState(['Alex', 'Mona', 'Allan']);
      return (
        <>
          <List aria-label="Actions" navigationMode="composite">
            {people.map(person => (
              <ListItem key={person} value={person}>
                <span role="gridcell">
                  <button tabIndex={-1}>Opted out {person}</button>
                  <button>{person}</button>
                </span>
              </ListItem>
            ))}
          </List>
          <button onClick={() => setPeople(['Alex', 'Allan'])}>Remove Mona</button>
        </>
      );
    };
    mount(<DynamicList />);

    cy.get('[role="row"]').first().focus().realPress('ArrowDown').realPress('ArrowRight');
    cy.contains('button', /^Mona$/).should('be.focused');
    cy.contains('button', 'Opted out Mona').should('have.attr', 'tabindex', '-1');
    cy.contains('button', 'Remove Mona').click();
    cy.get('[data-list]').find('[tabindex="0"]').should('have.length', 1);
    cy.get('[role="row"]').first().focus().realPress('End');
    cy.get('[role="row"]').last().should('be.focused').realPress('Home');
    cy.get('[role="row"]').first().should('be.focused');
  });

  it('enters editable composite content without taking over its arrow keys', () => {
    mount(
      <List aria-label="Actions" navigationMode="composite">
        <ListItem value="one">
          <span role="gridcell">
            <div contentEditable suppressContentEditableWarning aria-label="Editable name">
              Alex
            </div>
            <button>Edit</button>
          </span>
        </ListItem>
      </List>,
    );

    cy.get('[role="row"]').focus().realPress('ArrowRight');
    cy.get('[aria-label="Editable name"]').should('be.focused').realPress('ArrowRight').realPress('ArrowDown');
    cy.get('[aria-label="Editable name"]').should('be.focused').realPress('Escape');
    cy.get('[role="row"]').should('be.focused');
  });

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
    cy.contains('[role="option"]', 'First item').find('input[type="checkbox"]').should('be.disabled');
    cy.get('@selectionChange').should('not.have.been.called');
  });
});
