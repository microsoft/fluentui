import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { InfoLabel } from '@fluentui/react-infolabel';
import { infoButtonClassNames } from '../InfoButton/useInfoButtonStyles.styles';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const surfaceSelector = '[role="note"]';

describe('InfoLabel - close on tab-out', () => {
  const openInfoButton = () => {
    return cy.get(`button.${infoButtonClassNames.root}`).focus().realPress('{enter}');
  };

  it('no focusable elements', () => {
    mount(
      <>
        <button>before</button>
        <InfoLabel label="InfoLabel's label" info="Example non-focusable info" />
      </>,
    );

    openInfoButton().get(surfaceSelector).should('exist');
    // Shift-tab to InfoButton, the surface should still be visible
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('exist');
    // Shift-tab again to the 'before' button, surface should be hidden
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    cy.realPress('Tab').get(surfaceSelector).should('not.exist');
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
        />
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
        />
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
  });
});

describe('InfoLabel - toggle on click', () => {
  const clickInfoButton = () => {
    return cy.get(`button.${infoButtonClassNames.root}`).click();
  };

  it('toggles on click', () => {
    mount(<InfoLabel label="InfoLabel's label" info="Example info" />);

    clickInfoButton().get(surfaceSelector).should('exist');
    clickInfoButton().get(surfaceSelector).should('not.exist');
  });
});
