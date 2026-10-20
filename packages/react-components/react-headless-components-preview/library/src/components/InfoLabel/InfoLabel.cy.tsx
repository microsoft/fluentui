import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { InfoLabel } from './InfoLabel';
import { Provider } from '../Provider';
import type { ExtractSlotProps, SlotRenderFunction } from '@fluentui/react-utilities';
import type { InfoLabelProps } from './InfoLabel.types';
import type { InfoButtonProps } from './InfoButton/InfoButton.types';

const mount = (element: React.ReactElement) => {
  mountBase(<Provider>{element}</Provider>);
};

const surfaceSelector = '[role="note"]';

describe('InfoLabel - rendered ownership lifetime', () => {
  (['root', 'infoButton'] as const).forEach(target => {
    it(`clears ownership after a ${target} renderer replaces its returned element`, () => {
      let replace: () => void;
      const change = cy.spy().as('change');
      const Example = () => {
        const [replacement, setReplacement] = React.useState(false);
        replace = () => setReplacement(true);
        const key = replacement ? 'second' : 'first';
        const renderRoot: SlotRenderFunction<ExtractSlotProps<InfoLabelProps['root']>> = (Component, props) => (
          <Component {...props} key={key} />
        );
        const renderButton: SlotRenderFunction<InfoButtonProps> = (Component, props) => (
          <Component {...props} key={key} />
        );
        return (
          <InfoLabel
            root={{ id: 'ownership', children: target === 'root' ? renderRoot : undefined }}
            info="Information"
            infoButton={{
              children: target === 'infoButton' ? renderButton : undefined,
              popover: { defaultOpen: !replacement, onOpenChange: change },
            }}
          >
            Label
          </InfoLabel>
        );
      };
      mount(<Example />);
      cy.get(surfaceSelector).should('exist');
      cy.get('#ownership').should('have.attr', 'aria-owns');
      // Replace without moving focus outside first, which would dismiss the old popup.
      cy.then(() => replace());
      cy.get(surfaceSelector).should('not.exist');
      cy.get('#ownership').should('not.have.attr', 'aria-owns');
      cy.get('@change').should('not.have.been.called');
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
