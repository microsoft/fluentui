import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { InfoLabel } from './InfoLabel';
import { Provider } from '../Provider';
import type { ExtractSlotProps, SlotRenderFunction } from '@fluentui/react-utilities';
import type { InfoButtonProps } from './InfoButton/InfoButton.types';
import { InfoButton } from './InfoButton/InfoButton';

const mount = (element: React.ReactElement) => {
  mountBase(<Provider>{element}</Provider>);
};

const surfaceSelector = '[role="note"]';

describe('InfoLabel - note semantics', () => {
  it('preserves a named native dialog when focus trapping is explicitly requested', () => {
    mount(<InfoButton info="Information" popover={{ inertTrapFocus: true, defaultOpen: true }} />);
    cy.get('button').should('have.attr', 'aria-haspopup', 'dialog');
    cy.get('button')
      .invoke('attr', 'id')
      .then(id => {
        cy.get('[role="dialog"]')
          .should('have.prop', 'tagName', 'DIALOG')
          .and('have.attr', 'aria-labelledby', id)
          .and('be.visible')
          .and('have.focus');
      });
    cy.realPress('Escape');
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('button')
      .should('have.focus')
      .and('have.attr', 'aria-expanded', 'false')
      .and('not.have.attr', 'aria-details');
  });

  (['inline', 'portaled'] as const).forEach(placement => {
    it(`supports Enter, Space, and Escape with a valid ${placement} note relationship`, () => {
      const Example = () => {
        const [host, setHost] = React.useState<HTMLDivElement | null>(null);
        type NoteProps = Extract<ExtractSlotProps<InfoButtonProps['info']>, { as: 'div' }>;
        const renderNote: SlotRenderFunction<NoteProps> = (Component, props) =>
          host
            ? createPortal(
                <Component {...props} as="div">
                  Information
                </Component>,
                host,
              )
            : null;
        const portaledInfo: NoteProps = { as: 'div', children: renderNote };
        return (
          <>
            <div ref={setHost} id="portal-host" />
            <InfoLabel
              root={{ id: 'note-wrapper' }}
              info={placement === 'inline' ? 'Information' : portaledInfo}
              infoButton={{ className: 'info-button' }}
            >
              Label
            </InfoLabel>
          </>
        );
      };
      mount(<Example />);
      cy.get('#note-wrapper').should('not.have.attr', 'aria-owns');
      cy.get('button.info-button').should('not.have.attr', 'aria-haspopup');
      cy.get('button.info-button').should('have.attr', 'aria-expanded', 'false').and('not.have.attr', 'aria-details');
      cy.get('button.info-button').focus().realPress('Enter');
      cy.get(surfaceSelector).should('be.visible').and('have.focus');
      cy.get('button.info-button').should('have.attr', 'aria-expanded', 'true');
      cy.get('button.info-button')
        .invoke('attr', 'aria-details')
        .then(id => {
          cy.get(surfaceSelector).should('have.attr', 'id', id);
        });
      if (placement === 'portaled') {
        cy.get('#portal-host').find(surfaceSelector).should('exist');
        cy.get('#note-wrapper').find(surfaceSelector).should('not.exist');
      }
      cy.get('button.info-button').focus().realPress('Escape');
      cy.get(surfaceSelector).should('not.exist');
      cy.get('button.info-button').should('have.focus').and('not.have.attr', 'aria-details');
      cy.get('button.info-button').realPress('Space');
      cy.get(surfaceSelector).should('be.visible');
      cy.get('button.info-button').focus().realPress('Space');
      cy.get(surfaceSelector).should('not.exist');
      cy.get('button.info-button').should('have.attr', 'aria-expanded', 'false').and('not.have.attr', 'aria-details');
      cy.get('#note-wrapper').should('not.have.attr', 'aria-owns');
    });
  });
});

describe('InfoLabel - close on tab-out', () => {
  const openInfoButton = () => {
    return cy.get('button.info-button').focus().realPress('{enter}');
  };

  it('no focusable elements', () => {
    mount(
      <>
        <button>before</button>
        <InfoLabel
          label="InfoLabel's label"
          info="Example non-focusable info"
          infoButton={{ className: 'info-button', children: 'i' }}
        />
        <button data-testid="after">after</button>
      </>,
    );

    openInfoButton().get(surfaceSelector).should('exist').and('have.focus');
    // Shift-tab to InfoButton, the surface should still be visible
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('exist');
    // Shift-tab again to the 'before' button, surface should be hidden
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    cy.realPress('Tab').get(surfaceSelector).should('not.exist');
    cy.get('[data-testid=after]').should('have.focus');
  });

  it('single focusable element', () => {
    mount(
      <>
        <button>before</button>
        <InfoLabel
          label="InfoLabel's label"
          info={
            <>
              Example non-focusable info
              <button>one</button>
            </>
          }
          infoButton={{ className: 'info-button', children: 'i' }}
        />
        <button data-testid="after">after</button>
      </>,
    );

    openInfoButton().get(surfaceSelector).should('exist');
    // Shift-tab to InfoButton, the surface should still be visible
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('exist');
    // Shift-tab again to the 'before' button, surface should be hidden
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    // moving into the focusable item
    cy.realPress('Tab').get(surfaceSelector).should('exist');
    // tabbing out with shift + tab from the first focusable item should close the surface since
    // the surface is only focusable programmatically
    cy.realPress(['Shift', 'Tab']).realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    cy.realPress('Tab').realPress('Tab').get(surfaceSelector).should('not.exist');
    cy.get('[data-testid=after]').should('have.focus');
  });

  it('one or more focusable elements', () => {
    mount(
      <>
        <button>before</button>
        <InfoLabel
          label="InfoLabel's label"
          info={
            <>
              Example non-focusable info
              <button>one</button>
              <button>two</button>
              <button>three</button>
            </>
          }
          infoButton={{ className: 'info-button', children: 'i' }}
        />
        <button data-testid="after">after</button>
      </>,
    );

    openInfoButton().get(surfaceSelector).should('exist');
    // Shift-tab to InfoButton, the surface should still be visible
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('exist');
    // Shift-tab again to the 'before' button, surface should be hidden
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    // moving into the focusable item
    cy.realPress('Tab').get(surfaceSelector).should('exist');
    // tabbing out with shift + tab from the first focusable item should close the surface since
    // the surface is only focusable programmatically
    cy.realPress(['Shift', 'Tab']).realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    // checking that event does not propagate to children
    cy.realPress('Tab').realPress('Tab').realPress(['Shift', 'Tab']).get(surfaceSelector).should('exist');
    cy.realPress('Tab').realPress('Tab').realPress('Tab').get(surfaceSelector).should('not.exist');
    cy.get('[data-testid=after]').should('have.focus');
  });
});

describe('InfoLabel - toggle on click', () => {
  const clickInfoButton = () => {
    return cy.get('button.info-button').click();
  };

  it('toggles on click', () => {
    mount(
      <InfoLabel
        label="InfoLabel's label"
        info="Example info"
        infoButton={{ className: 'info-button', children: 'i' }}
      />,
    );

    clickInfoButton().get(surfaceSelector).should('exist');
    clickInfoButton().get(surfaceSelector).should('not.exist');
  });
});
