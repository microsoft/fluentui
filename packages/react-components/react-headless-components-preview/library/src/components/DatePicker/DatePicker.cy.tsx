import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import { Provider } from '../Provider';
import { DatePicker } from './DatePicker';

polyfillBodyAndObserve();
const today = new Date(2030, 0, 15);
const day = (label: string) => `td[role="gridcell"]:has(button[aria-label="${label}"])`;

describe('headless DatePicker', () => {
  it('opens from the keyboard, navigates and selects, then restores input focus without reopening', () => {
    const onDateChange = cy.stub().as('dateChange');
    const onOpenChange = cy.stub().as('openChange');
    mount(
      <Provider>
        <DatePicker
          aria-label="Date"
          today={today}
          openOnFocus
          onDateChange={onDateChange}
          onOpenChange={onOpenChange}
        />
      </Provider>,
    );
    cy.get('input').focus();
    cy.get('dialog').should('be.visible').and('have.attr', 'open');
    cy.get(day('January 15, 2030')).should('be.focused').realPress('ArrowRight');
    cy.get(day('January 16, 2030')).should('be.focused').realPress('Enter');
    cy.get('dialog').should('not.exist');
    cy.get('input').should('be.focused').and('have.value', 'Wed Jan 16 2030');
    cy.get('@dateChange').should('have.been.calledOnce');
    cy.get('@openChange').should('have.been.calledTwice');
    cy.get('input').realPress('ArrowDown');
    cy.get(day('January 16, 2030')).should('be.focused').realPress('Escape');
    cy.get('dialog').should('not.exist');
    cy.get('input').should('be.focused');
  });

  it('makes outside content inert while modal and dismisses with Escape', () => {
    mount(
      <Provider>
        <button>Outside</button>
        <DatePicker aria-label="Date" today={today} popupSurface={{ open: true }} />
      </Provider>,
    );
    cy.get('input').focus().realPress('Enter');
    cy.get('dialog').should('be.visible');
    cy.get('dialog').should(surface => expect(surface[0].matches(':modal')).to.equal(true));
    cy.get(day('January 15, 2030')).focus();
    cy.contains('button', 'Outside').then(button => {
      button[0].focus();
      expect(button[0].ownerDocument.activeElement).not.to.equal(button[0]);
    });
    cy.get(day('January 15, 2030')).focus().realPress('Escape');
    cy.get('dialog').should('not.exist');
    cy.get('input').should('be.focused');
  });

  it('dismisses a backdrop click and does not immediately reopen', () => {
    mount(
      <Provider>
        <DatePicker aria-label="Date" today={today} openOnFocus />
      </Provider>,
    );
    cy.get('input').focus();
    cy.get('dialog').should('be.visible');
    cy.get('dialog').click(-10, -10, { force: true });
    cy.get('dialog').should('not.exist');
    cy.get('input').should('be.focused');
  });

  it('keeps rejected controlled close requests modal', () => {
    const onOpenChange = cy.stub().as('openChange');
    mount(
      <Provider>
        <DatePicker aria-label="Date" today={today} open onOpenChange={onOpenChange} />
      </Provider>,
    );
    cy.get('dialog').should('be.visible');
    cy.focused().realPress('Escape');
    cy.get('dialog').should('be.visible').and('have.attr', 'open');
    cy.get('@openChange').should('have.been.calledOnce');
  });

  it('renders, selects, and restores focus in the input owner document', () => {
    const Example = () => {
      const [frame, setFrame] = React.useState<HTMLIFrameElement | null>(null);
      const targetDocument = frame?.contentDocument;
      return (
        <>
          <iframe title="DatePicker document" ref={setFrame} />
          {targetDocument &&
            createPortal(
              <Provider targetDocument={targetDocument}>
                <DatePicker today={today} aria-label="Date" />
              </Provider>,
              targetDocument.body,
            )}
        </>
      );
    };
    mount(<Example />);
    cy.get('iframe').then(frame => {
      const targetDocument = (frame[0] as HTMLIFrameElement).contentDocument!;
      cy.wrap(targetDocument.body).find('input').click();
      cy.wrap(targetDocument.body)
        .find('dialog')
        .should('be.visible')
        .should(surface => expect(surface[0].ownerDocument).to.equal(targetDocument));
      cy.wrap(targetDocument.body).find('button[aria-label="January 16, 2030"]').click();
      cy.wrap(targetDocument.body).find('dialog').should('not.exist');
      cy.wrap(targetDocument.body)
        .find('input')
        .should('have.value', 'Wed Jan 16 2030')
        .should(input => expect(targetDocument.activeElement).to.equal(input[0]));
    });
  });

  it('supports month/year switching without committing until a day is selected', () => {
    const onDateChange = cy.stub().as('dateChange');
    mount(
      <Provider>
        <DatePicker aria-label="Date" today={today} calendar={{ layout: 'overlay' }} onDateChange={onDateChange} />
      </Provider>,
    );
    cy.get('input').click();
    cy.get('button[aria-label="January 2030, change month"]').click();
    cy.get('button[aria-label="2030, change year"]').click();
    cy.contains('button[role="gridcell"]', /^2031$/).click();
    cy.get('button[role="gridcell"][aria-label="February"]').click();
    cy.get('@dateChange').should('not.have.been.called');
    cy.get('button[aria-label="February 10, 2031"]').click();
    cy.get('input').should('have.value', 'Mon Feb 10 2031');
    cy.get('@dateChange').should('have.been.calledOnce');
  });

  it('validates editable text and supports disabling the picker', () => {
    const onValidationResult = cy.stub().as('validation');
    const Example = () => {
      const [disabled, setDisabled] = React.useState(false);
      return (
        <Provider>
          <button onClick={() => setDisabled(true)}>Disable</button>
          <DatePicker
            aria-label="Date"
            today={today}
            allowTextInput
            openOnClick={false}
            disabled={disabled}
            onValidationResult={onValidationResult}
          />
        </Provider>
      );
    };
    mount(<Example />);
    cy.get('input').type('not a date').blur();
    cy.get('@validation').should('have.been.calledWithMatch', Cypress.sinon.match.any, { error: 'invalid-input' });
    cy.get('input').type('2030-01-16').blur().should('have.value', 'Wed Jan 16 2030');
    cy.contains('button', 'Disable').click();
    cy.get('input').should('be.disabled');
  });

  it('preserves RTL day navigation', () => {
    mount(
      <Provider dir="rtl">
        <DatePicker aria-label="Date" today={today} />
      </Provider>,
    );
    cy.get('input').click();
    cy.get(day('January 15, 2030')).should('be.focused').realPress('ArrowLeft');
    cy.get(day('January 16, 2030')).should('be.focused').realPress('Enter');
    cy.get('input').should('have.value', 'Wed Jan 16 2030');
  });

  it('supports month-only keyboard selection', () => {
    mount(
      <Provider>
        <DatePicker aria-label="Date" today={today} calendar={{ dayPicker: null }} />
      </Provider>,
    );
    cy.get('input').click();
    cy.get('button[role="gridcell"][aria-label="January"]').should('be.focused').realPress('ArrowRight');
    cy.get('button[role="gridcell"][aria-label="February"]').should('be.focused').realPress('Enter');
    cy.get('dialog').should('not.exist');
    cy.get('input').should('be.focused').and('have.value', 'Fri Feb 15 2030');
  });

  it('restores focus without requesting a reopen after an external controlled close', () => {
    const onOpenChange = cy.stub().as('openChange');
    let close: () => void;
    const Example = () => {
      const [open, setOpen] = React.useState(false);
      close = () => setOpen(false);
      return (
        <Provider>
          <DatePicker
            today={today}
            aria-label="Date"
            open={open}
            openOnFocus
            onOpenChange={(event, data) => {
              onOpenChange(event, data);
              setOpen(data.open);
            }}
          />
        </Provider>
      );
    };
    mount(<Example />);
    cy.get('input').focus();
    cy.get('dialog').should('be.visible');
    cy.then(() => close());
    cy.get('dialog').should('not.exist');
    cy.get('input').should('be.focused');
    cy.get('@openChange').should('have.been.calledOnce');
  });
});
