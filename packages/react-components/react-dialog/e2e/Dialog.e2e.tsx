import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { Dialog } from '@fluentui/react-dialog';

const mount = (element: JSX.Element) => mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);

describe('Dialog', () => {
  it('should be closed by default', () => {
    mount(
      <Dialog>
        <div>
          <button id="close-btn">close</button>
        </div>
      </Dialog>,
    );
    cy.get('#close-btn').should('not.exist');
  });
});
