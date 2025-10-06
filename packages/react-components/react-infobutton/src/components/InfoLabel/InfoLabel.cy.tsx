/* eslint-disable deprecation/deprecation */

import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { InfoLabel } from '@fluentui/react-infobutton';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const surfaceSelector = '[role="note"]';

describe('InfoLabel - close on tab-out', () => {
  const openInfoButton = () => {
    cy.get('button').focus().realPress('{enter}');
  };

  it('no focusable elements', () => {
    mount(<InfoLabel label="InfoLabel's label" info="Example non-focusable info" />);

    openInfoButton();
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    cy.realPress('Tab').get(surfaceSelector).should('not.exist');
  });

  it('single focusable element', () => {
    mount(
      <InfoLabel
        label="InfoLabel's label"
        info={
          <>
            Example non-focusable info
            <button>one</button>
          </>
        }
      />,
    );

    openInfoButton();
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    // moving into the focusable item
    cy.realPress('Tab').get(surfaceSelector).should('exist');
    // tabbing out with shift + tab from the first focusable item should close the surface since
    // the surface is only focusable programmatically
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    cy.realPress('Tab').realPress('Tab').get(surfaceSelector).should('not.exist');
  });

  it('one or more focusable elements', () => {
    mount(
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
      />,
    );

    openInfoButton();
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    // moving into the focusable item
    cy.realPress('Tab').get(surfaceSelector).should('exist');
    // tabbing out with shift + tab from the first focusable item should close the surface since
    // the surface is only focusable programmatically
    cy.realPress(['Shift', 'Tab']).get(surfaceSelector).should('not.exist');
    openInfoButton();
    // checking that event does not propagate to children
    cy.realPress('Tab').realPress('Tab').realPress(['Shift', 'Tab']).get(surfaceSelector).should('exist');
    cy.realPress('Tab').realPress('Tab').realPress('Tab').get(surfaceSelector).should('not.exist');
  });
});
