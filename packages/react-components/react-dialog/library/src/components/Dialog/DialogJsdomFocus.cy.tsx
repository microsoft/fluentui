import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { createTabster, disposeTabster } from 'tabster';
import type { Types } from 'tabster';
import { Dialog } from './Dialog';
import { DialogSurface } from '../DialogSurface/DialogSurface';
import { DialogBody } from '../DialogBody/DialogBody';
import { DialogTitle } from '../DialogTitle/DialogTitle';
import { DialogActions } from '../DialogActions/DialogActions';

const Example = () => (
  <FluentProvider theme={webLightTheme}>
    <Dialog open>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogActions>
            <button disabled>Disabled</button>
            <button hidden>Hidden</button>
            <span style={{ display: 'none' }}>
              <button>Hidden ancestor</button>
            </span>
            <button data-testid="first-action">Cancel</button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </FluentProvider>
);

describe('initial-open Dialog with the local Tabster patch', () => {
  let tabster: Types.Tabster | undefined;

  afterEach(() => {
    cy.then(() => {
      if (tabster) {
        disposeTabster(tabster);
        tabster = undefined;
      }
    });
  });

  it('retains initial focus with the default browser policy', () => {
    mount(<Example />);
    cy.get('[data-testid="first-action"]').should('be.focused');
  });

  it('retains initial focus with the opt-in non-layout policy', () => {
    cy.window().then(view => {
      tabster = createTabster(view, { autoRoot: {}, controlTab: false, visibilityMode: 'non-layout' });
      mount(<Example />);
    });
    cy.get('[data-testid="first-action"]').should('be.focused');
  });
});
