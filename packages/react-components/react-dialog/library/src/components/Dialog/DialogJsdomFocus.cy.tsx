import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { createTabster, disposeTabster } from 'tabster';
import type { Types } from 'tabster';
import { getParent } from '@fluentui/react-utilities';
import { getShadowDOMAPI } from 'tabster';
import { Dialog } from './Dialog';
import { DialogSurface } from '../DialogSurface/DialogSurface';
import { DialogBody } from '../DialogBody/DialogBody';
import { DialogTitle } from '../DialogTitle/DialogTitle';
import { DialogActions } from '../DialogActions/DialogActions';

const Example = ({ children }: { children?: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>
    <Dialog open>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogActions>
            {children ?? (
              <>
                <button disabled>Disabled</button>
                <button hidden>Hidden</button>
                <span style={{ display: 'none' }}>
                  <button>Hidden ancestor</button>
                </span>
                <button data-testid="first-action">Cancel</button>
              </>
            )}
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </FluentProvider>
);

describe('initial-open Dialog with the local Tabster patch', () => {
  let tabster: Types.Tabster | undefined;

  const initialize = (view: Window & { __tabsterShadowDOMAPI?: Types.DOMAPI }, DOMAPI = view.__tabsterShadowDOMAPI) => {
    tabster = createTabster(view, {
      autoRoot: {},
      controlTab: false,
      getParent,
      checkUncontrolledCompletely: element =>
        element.firstElementChild?.hasAttribute('data-is-focus-trap-zone-bumper') === true || undefined,
      DOMAPI,
      visibilityMode: 'non-layout',
    });
  };

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
      initialize(view);
      mount(<Example />);
    });
    cy.get('[data-testid="first-action"]').should('be.focused');
  });

  it('skips actions assigned into a CSS-hidden shadow slot', () => {
    cy.window().then(view => {
      initialize(view, getShadowDOMAPI());
      mount(
        <Example>
          <div
            ref={host => {
              if (host && !host.shadowRoot) {
                const wrapper = host.ownerDocument.createElement('span');
                wrapper.style.display = 'none';
                wrapper.appendChild(host.ownerDocument.createElement('slot'));
                host.attachShadow({ mode: 'open' }).appendChild(wrapper);
              }
            }}
          >
            <button data-testid="hidden-slotted-action">Hidden slotted action</button>
          </div>
          <button data-testid="first-action">Cancel</button>
        </Example>,
      );
    });
    cy.get('[data-testid="first-action"]').should('be.focused');
  });
});
