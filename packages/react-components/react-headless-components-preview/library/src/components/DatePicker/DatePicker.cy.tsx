import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import { DatePicker } from './DatePicker';
import type { DatePickerProps } from './DatePicker.types';

const today = new Date(2026, 7, 12);
const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);
const day = (label: string) => `td[role="gridcell"]:has(button[aria-label="${label}"])`;

const Example = (props: Partial<DatePickerProps>) => (
  <>
    <button>Before</button>
    <DatePicker aria-label="Due date" today={today} icon={{ children: 'icon' }} {...(props as DatePickerProps)} />
    <button>After</button>
  </>
);

describe('DatePicker', () => {
  // The unstyled calendar is tall; leave room below the field so the popup does not flip over it.
  beforeEach(() => {
    cy.viewport(1000, 1200);
  });

  it('shows the calendar in the top layer below the field and focuses today', () => {
    mount(<Example />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.get('[role="dialog"]').should('match', ':popover-open').and('have.attr', 'aria-label', 'August 2026');
    cy.get(day('August 12, 2026')).should('be.focused');
    cy.get('[role="dialog"]').then(dialog => {
      cy.get('button[aria-haspopup="dialog"]').then(trigger => {
        expect(dialog[0].getBoundingClientRect().top).to.be.at.least(trigger[0].getBoundingClientRect().bottom - 1);
      });
    });
  });

  it('selects a day by click and returns focus to the field', () => {
    mount(<Example />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.get(day('August 20, 2026')).find('button').click();
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('button[aria-haspopup="dialog"]').should('be.focused').and('contain.text', 'August 20, 2026');
  });

  it('closes on Escape and returns focus to the field', () => {
    mount(<Example />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.get(day('August 12, 2026')).should('be.focused').realPress('Escape');
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('button[aria-haspopup="dialog"]').should('be.focused');
  });

  it('closes when the trigger is pressed again without reopening', () => {
    mount(<Example />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.get(day('August 12, 2026')).should('be.focused');
    cy.get('button[aria-haspopup="dialog"]').realClick();
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('button[aria-haspopup="dialog"]').should('be.focused').and('have.attr', 'aria-expanded', 'false');
  });

  (['Enter', 'Space'] as const).forEach(key => {
    it(`closes from the Calendar close button with ${key}`, () => {
      mount(<Example calendar={{ dayPicker: { closeButton: { children: 'Close calendar' } } }} />);

      cy.get('button[aria-haspopup="dialog"]').click();
      cy.contains('button', 'Close calendar').focus().realPress(key);
      cy.get('[role="dialog"]').should('not.exist');
      cy.get('button[aria-haspopup="dialog"]').should('be.focused');
    });
  });

  it('tabs through each grid and control once, then closes when Tab leaves the calendar', () => {
    mount(<Example />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.get(day('August 12, 2026')).should('be.focused');
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'aria-label', '2026, change year');
    cy.realPress('Tab');
    cy.focused()
      .should('have.attr', 'aria-label')
      .and('match', /^Previous year/);
    cy.realPress('Tab');
    cy.focused()
      .should('have.attr', 'aria-label')
      .and('match', /^Next year/);
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'role', 'gridcell').and('have.attr', 'aria-label', 'August 2026');
    cy.realPress('Tab');
    cy.get('[role="dialog"]').should('not.exist');
    cy.contains('button', 'After').should('be.focused');
  });

  it('closes on Shift+Tab from the first calendar control back to the field', () => {
    mount(<Example />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.contains('button', 'August 2026').focus().realPress(['Shift', 'Tab']);
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('button[aria-haspopup="dialog"]').should('be.focused');
  });

  it('closes on an outside click without validating twice', () => {
    const onValidationResult = cy.spy().as('onValidationResult');
    mount(<Example allowTextInput onValidationResult={onValidationResult} />);

    cy.get('input').type('not a date');
    cy.get('[role="button"][aria-label="Choose date"]').realClick();
    cy.get('[role="dialog"]').should('exist');
    cy.get('body').realClick({ x: 5, y: 5 });
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('input').should('have.attr', 'aria-invalid', 'true').and('have.value', '');
    cy.get('@onValidationResult').should('have.been.calledOnce');
  });

  it('opens with Alt + Arrow Down from an editable field and keeps typing focus on click', () => {
    mount(<Example allowTextInput />);

    cy.get('input').realClick();
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('input').should('be.focused').realPress(['Alt', 'ArrowDown']);
    cy.get(day('August 12, 2026')).should('be.focused');
  });

  it('opens the year-range grid from the day heading', () => {
    mount(<Example />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.contains('button', 'August 2026').click();
    cy.get('[role="dialog"] [role="grid"]').eq(1).find('[role="gridcell"]').should('have.length', 12);
    cy.get('[role="dialog"] [role="grid"]').eq(1).find('[aria-current="date"]').should('contain.text', '2026');
  });

  it('closes on Escape without dismissing a surrounding modal dialog', () => {
    const InDialog = () => {
      const dialogRef = React.useRef<HTMLDialogElement>(null);
      React.useEffect(() => dialogRef.current?.showModal(), []);
      return (
        <dialog ref={dialogRef}>
          <DatePicker aria-label="Due date" today={today} />
        </dialog>
      );
    };
    mount(<InDialog />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.get(day('August 12, 2026')).should('be.focused');
    cy.realPress('Escape');
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('dialog').should('have.attr', 'open');
    cy.get('button[aria-haspopup="dialog"]').should('be.focused');
  });

  it('moves a single roving tab stop through the day grid with the keyboard', () => {
    mount(<Example />);

    cy.get('button[aria-haspopup="dialog"]').click();
    cy.get(day('August 12, 2026')).should('be.focused');
    cy.get('[role="dialog"] table td[tabindex="0"]').should('have.length', 1);
    cy.realPress('ArrowRight');
    cy.get(day('August 13, 2026')).should('be.focused').and('have.attr', 'tabindex', '0');
    cy.realPress('ArrowDown');
    cy.get(day('August 20, 2026')).should('be.focused');
    cy.realPress('End');
    cy.get(day('August 22, 2026')).should('be.focused');
    cy.realPress('ArrowDown');
    cy.realPress('ArrowDown');
    cy.get(day('September 5, 2026')).should('be.focused');
    cy.get('[role="dialog"]').should('have.attr', 'aria-label', 'September 2026');
    cy.realPress('PageDown');
    cy.get(day('October 5, 2026')).should('be.focused');
    cy.get('[role="dialog"] table td[tabindex="0"]').should('have.length', 1);
    cy.realPress('Enter');
    cy.get('button[aria-haspopup="dialog"]').should('be.focused').and('contain.text', 'October 5, 2026');
  });
});
