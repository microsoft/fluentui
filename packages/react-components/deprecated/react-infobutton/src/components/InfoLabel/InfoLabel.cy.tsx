/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightThemeClassName, webDarkThemeClassName } from '@fluentui/react-theme';
import { InfoLabel } from './InfoLabel';

const mount = (element: React.ReactElement) => {
  mountBase(<FluentProvider themeClassName={teamsLightThemeClassName}>{element}</FluentProvider>);
};

const surfaceSelector = '[role="note"]';

/**
 * Theming Phase 2b evidence for DEPRECATED (still-Griffel) packages: this package's
 * runtime-injected Griffel styles read `tokens.*` strings (canonical kebab var()
 * references since Phase 2a), which must resolve against the static theme CLASSES now
 * that FluentProvider's runtime theme tag is gone. The deprecated InfoButton's Griffel
 * style sets `color: tokens.colorNeutralForeground2`; under `webDarkThemeClassName` that
 * must compute to the webDark value (#d6d6d6) — end-to-end proof that
 * Griffel-var-reference → theme-class value still themes deprecated packages.
 */
describe('InfoLabel - theming (Phase 2b, deprecated Griffel package)', () => {
  it('resolves Griffel token references against a dark theme class', () => {
    mountBase(
      <FluentProvider themeClassName={webDarkThemeClassName}>
        <InfoLabel label="Dark InfoLabel" info="Example info" />
      </FluentProvider>,
    );

    // webDarkTheme.colorNeutralForeground2 === '#d6d6d6'
    cy.get('button').should('have.css', 'color', 'rgb(214, 214, 214)');
  });

  it('resolves the same reference to the light value under the default light class', () => {
    mount(<InfoLabel label="Light InfoLabel" info="Example info" />);

    // webLight/teamsLight colorNeutralForeground2 === '#424242'
    cy.get('button').should('have.css', 'color', 'rgb(66, 66, 66)');
  });
});

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
