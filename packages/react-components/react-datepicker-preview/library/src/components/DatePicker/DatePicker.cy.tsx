import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';
import { DatePicker } from './DatePicker';
import type { DatePickerProps } from './DatePicker.types';

const today = new Date(2030, 0, 15);
const mount = (element: JSXElement) => mountBase(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);

const IframeExample = ({ onOpenChange }: Pick<DatePickerProps, 'onOpenChange'>): JSXElement => {
  const [frameDocument, setFrameDocument] = React.useState<Document>();
  return (
    <iframe
      title="DatePicker document"
      srcDoc="<!DOCTYPE html><html><body></body></html>"
      onLoad={event => setFrameDocument(event.currentTarget.contentDocument ?? undefined)}
    >
      {frameDocument &&
        createPortal(
          <FluentProvider targetDocument={frameDocument} theme={webLightTheme}>
            <DatePicker today={today} aria-label="Date in frame" onOpenChange={onOpenChange} />
            <button>Outside in frame</button>
          </FluentProvider>,
          frameDocument.body,
        )}
    </iframe>
  );
};

describe('DatePicker Preview browser interactions', () => {
  it('opens from the input and restores focus after Escape without reopening', () => {
    mount(<DatePicker today={today} openOnFocus />);
    cy.get('[role="combobox"]').focus();
    cy.get('[role="dialog"]').should('be.visible');
    cy.realPress('Escape');
    cy.get('[role="dialog"]').should('not.exist');
    cy.focused().should('have.attr', 'role', 'combobox');
  });

  it('contains forward and backward Tab navigation in the dialog', () => {
    mount(<DatePicker today={today} />);
    cy.get('[role="combobox"]').focus().realPress('ArrowDown');
    cy.get('[role="dialog"]').should('be.visible');
    for (let index = 0; index < 12; index++) {
      cy.realPress('Tab');
      cy.focused().closest('[role="dialog"]').should('exist');
    }
    for (let index = 0; index < 12; index++) {
      cy.realPress(['Shift', 'Tab']);
      cy.focused().closest('[role="dialog"]').should('exist');
    }
  });

  it('selects a day once, unmounts the popup, and returns input focus', () => {
    const onDateChange = cy.stub().as('dateChange');
    const onOpenChange = cy.stub().as('openChange');
    mount(<DatePicker today={today} onDateChange={onDateChange} onOpenChange={onOpenChange} />);
    cy.get('[role="combobox"]').click();
    cy.get('button[aria-label="January 20, 2030"]').click();
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('[role="combobox"]').should('have.value', new Date(2030, 0, 20).toDateString());
    cy.focused().should('have.attr', 'role', 'combobox');
    cy.get('@dateChange').should('have.been.calledOnce');
    cy.get('@openChange').should('have.been.calledTwice');
  });

  it('dismisses outside without stealing focus from the activated control', () => {
    mount(
      <>
        <DatePicker today={today} />
        <button>Outside</button>
      </>,
    );
    cy.get('[role="combobox"]').click();
    cy.contains('button', 'Outside').click();
    cy.get('[role="dialog"]').should('not.exist');
    cy.focused().should('have.text', 'Outside');
  });

  it('normalizes editable text, restores invalid text, and clears Calendar selection', () => {
    mount(<DatePicker today={today} allowTextInput openOnClick={false} />);
    cy.get('[role="combobox"]').type('January 20, 2030').blur();
    cy.get('[role="combobox"]').should('have.value', new Date(2030, 0, 20).toDateString());
    cy.get('[role="combobox"]').clear().type('not a date').blur();
    cy.get('[role="combobox"]').should('have.value', new Date(2030, 0, 20).toDateString());
    cy.get('[role="combobox"]').clear().blur();
    cy.get('[role="combobox"]').focus().realPress('ArrowDown');
    cy.get('[role="dialog"] [data-fui-calendar-picker="day"] [aria-selected="true"]').should('not.exist');
  });

  it('does not offer a popup when disabled, even with controlled open', () => {
    mount(<DatePicker today={today} disabled open />);
    cy.get('[role="combobox"]').should('be.disabled').click({ force: true });
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('uses inline placement and restores focus after selection', () => {
    mount(<DatePicker today={today} inlinePopup />);
    cy.get('[role="combobox"]').click();
    cy.get('[role="dialog"]').closest('[data-portal-node]').should('not.exist');
    cy.get('button[aria-label="January 20, 2030"]').click();
    cy.focused().should('have.attr', 'role', 'combobox');
  });

  it('uses a custom mount node for the popup', () => {
    const CustomMount = (): JSXElement => {
      const [mountNode, setMountNode] = React.useState<HTMLDivElement | null>(null);
      return (
        <>
          <div data-testid="custom-mount" ref={setMountNode} />
          <DatePicker today={today} mountNode={mountNode} />
        </>
      );
    };
    mount(<CustomMount />);
    cy.get('[role="combobox"]').click();
    cy.get('[data-testid="custom-mount"] [role="dialog"]').should('be.visible');
    cy.realPress('Escape');
    cy.get('[data-testid="custom-mount"] [role="dialog"]').should('not.exist');
    cy.focused().should('have.attr', 'role', 'combobox');
  });

  it('keeps focus and outside interactions in the provider iframe document', () => {
    const requests: string[] = [];
    mount(<IframeExample onOpenChange={(event, data) => requests.push(`${event.type}:${data.open}`)} />);
    cy.get<HTMLIFrameElement>('iframe[title="DatePicker document"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then((body: HTMLBodyElement) => {
        const frameDocument = body.ownerDocument;
        cy.wrap(frameDocument.body).find('[role="combobox"]').click();
        cy.then(() => expect(requests).to.deep.equal(['click:true']));
        cy.wrap(frameDocument.body)
          .find('[role="dialog"]')
          .should('be.visible')
          .then(dialog => {
            expect(dialog[0].ownerDocument).to.equal(frameDocument);
            expect(dialog[0].contains(frameDocument.activeElement)).to.equal(true);
          });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wrap(frameDocument.body).contains('button', 'Outside in frame').click();
        cy.wrap(frameDocument.body).find('[role="dialog"]').should('not.exist');
        cy.then(() => expect(frameDocument.activeElement?.textContent).to.equal('Outside in frame'));
      });
  });

  it('keeps focus in the popup when all dates are unavailable', () => {
    mount(
      <DatePicker
        today={today}
        defaultOpen
        minDate={today}
        maxDate={today}
        calendar={{ restrictedDates: [today], monthPicker: null, goToTodayButton: null }}
      />,
    );
    cy.get('[role="dialog"]').should('be.visible');
    cy.focused().closest('[role="dialog"]').should('exist');
    cy.realPress('Escape');
    cy.get('[role="dialog"]').should('not.exist');
    cy.focused().should('have.attr', 'role', 'combobox');
  });

  it('keeps the default adaptive calendar usable in a narrow RTL viewport', () => {
    const requests: string[] = [];
    cy.viewport(320, 640);
    mountBase(
      <FluentProvider theme={webLightTheme} dir="rtl">
        <DatePicker today={today} onOpenChange={(event, data) => requests.push(`${event.type}:${data.open}`)} />
      </FluentProvider>,
    );
    cy.get('[role="combobox"]').click();
    cy.then(() => expect(requests).to.deep.equal(['click:true']));
    cy.get('[role="dialog"]')
      .should('be.visible')
      .then(dialog => {
        const bounds = dialog[0].getBoundingClientRect();
        expect(bounds.left).to.be.at.least(0);
        expect(bounds.right).to.be.at.most(320);
      });
    cy.get('button[aria-label="January 20, 2030"]').click();
    cy.get('[role="combobox"]').should('have.value', new Date(2030, 0, 20).toDateString());
  });

  it('navigates year and month views without committing until a day is selected', () => {
    const onDateChange = cy.stub().as('dateChange');
    mount(<DatePicker today={today} onDateChange={onDateChange} calendar={{ layout: 'overlay' }} />);
    cy.get('[role="combobox"]').click();
    cy.get('.fui-CalendarDay__monthAndYear').click();
    cy.get('.fui-CalendarMonth__heading').click();
    cy.contains('[role="gridcell"]', '2031').click();
    cy.get('[role="gridcell"][aria-label="February"]').click();
    cy.get('@dateChange').should('not.have.been.called');
    cy.get('button[aria-label="February 20, 2031"]').click();
    cy.get('@dateChange').should('have.been.calledOnce');
    cy.get('[role="combobox"]').should('have.value', new Date(2031, 1, 20).toDateString());
    cy.focused().should('have.attr', 'role', 'combobox');
  });

  it('handles external controlled close without reopening from restored focus', () => {
    const Controlled = (): JSXElement => {
      const [open, setOpen] = React.useState(true);
      return (
        <DatePicker
          today={today}
          open={open}
          openOnFocus
          popupSurface={{
            onKeyDown: event => {
              if (event.key === 'F2') {
                setOpen(false);
              }
            },
          }}
        />
      );
    };
    mount(<Controlled />);
    cy.get('[role="dialog"]').should('be.visible');
    cy.focused().closest('[role="dialog"]').should('exist');
    cy.realPress('F2');
    cy.get('[role="dialog"]').should('not.exist');
    cy.focused().should('have.attr', 'role', 'combobox');
  });

  it('remains operable with forced colors and reduced motion', () => {
    cy.then(() =>
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setEmulatedMedia',
        params: {
          features: [
            { name: 'forced-colors', value: 'active' },
            { name: 'prefers-reduced-motion', value: 'reduce' },
          ],
        },
      }),
    );
    mount(<DatePicker today={today} />);
    cy.window().then(view => {
      expect(view.matchMedia('(forced-colors: active)').matches).to.equal(true);
      expect(view.matchMedia('(prefers-reduced-motion: reduce)').matches).to.equal(true);
    });
    cy.get('[role="combobox"]').focus().realPress('ArrowDown');
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('button[aria-label="January 20, 2030"]').click();
    cy.get('[role="combobox"]').should('have.value', new Date(2030, 0, 20).toDateString());
    cy.focused().should('have.attr', 'role', 'combobox');
  });

  afterEach(() => {
    cy.then(() =>
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setEmulatedMedia',
        params: { features: [] },
      }),
    );
  });
});
