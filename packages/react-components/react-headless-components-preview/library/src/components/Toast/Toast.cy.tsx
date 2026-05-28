import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { JSXElement } from '@fluentui/react-utilities';

import { Toaster, Toast, ToastTitle, useToastController } from '.';
import { Provider } from '../Provider';

/**
 * Selectors used by the headless tests. Unlike the styled v9 layer, the headless
 * Toast does not emit Griffel class names — we target structural roles and the
 * `data-intent` attribute the headless `Toast` adds to its root.
 */
const TOAST_CONTAINER = '[role="listitem"]';
const TOAST = '[data-intent]';

const mount = (element: JSXElement) =>
  mountBase(
    <Provider>
      <div style={{ marginTop: 160 }}>{element}</div>
    </Provider>,
    {
      strict: false,
    },
  );

describe('Toast (headless)', () => {
  it('should dispatch toast', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const onClick = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
        );

      return (
        <>
          <button onClick={onClick}>Make toast</button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('button').click().get(TOAST).should('exist');
  });

  it('should dismiss toast', () => {
    const Example = () => {
      const toastId = 'foo';
      const { dispatchToast, dismissToast } = useToastController();
      const makeToast = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { toastId, timeout: -1 },
        );
      const removeToast = () => dismissToast(toastId);

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <button id="dismiss" onClick={removeToast}>
            Dismiss toast
          </button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().get(TOAST).should('exist');
    cy.get('#dismiss').click().get(TOAST).should('not.exist');
  });

  it('should dismiss all toasts', () => {
    const Example = () => {
      const { dispatchToast, dismissAllToasts } = useToastController();
      const makeToast = () => {
        for (let i = 0; i < 5; i++) {
          dispatchToast(
            <Toast>
              <ToastTitle>This is a toast</ToastTitle>
            </Toast>,
            { timeout: -1 },
          );
        }
      };

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <button id="dismiss" onClick={dismissAllToasts}>
            Dismiss toasts
          </button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().get(TOAST).should('have.length', 5);
    cy.get('#dismiss').click().get(TOAST).should('not.exist');
  });

  it('should play and pause toast', () => {
    const Example = () => {
      const toastId = 'foo';
      const { dispatchToast, playToast, pauseToast } = useToastController();
      const makeToast = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { toastId, timeout: 3000 },
        );

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <button id="pause" onClick={() => pauseToast(toastId)}>
            Pause
          </button>
          <button id="play" onClick={() => playToast(toastId)}>
            Play
          </button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().get(TOAST).should('exist');
    cy.get('#pause').click().wait(1000).get(TOAST).should('exist');
    cy.get('#play').click().get(TOAST).should('not.exist');
  });

  it('should update toast content', () => {
    const Example = () => {
      const toastId = 'foo';
      const { dispatchToast, updateToast } = useToastController();
      const makeToast = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: -1, toastId },
        );
      const update = () =>
        updateToast({
          content: (
            <Toast>
              <ToastTitle>Foo</ToastTitle>
            </Toast>
          ),
          toastId,
        });

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <button id="update" onClick={update}>
            Update toast
          </button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().get(TOAST).should('exist');
    cy.get('#update').click().get('body').contains('Foo');
  });

  it('should pause auto-dismiss on hover', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: 3000, pauseOnHover: true },
        );

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().get(TOAST).trigger('mouseenter').wait(700).get(TOAST).should('exist');
  });

  it('should follow lifecycle', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const [log, setLog] = React.useState<string[]>([]);
      const makeToast = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: 500, onStatusChange: (_, data) => setLog(s => [...s, data.status]) },
        );

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <ul>
            {log.map((msg, i) => (
              <li key={`${msg}-${i}`}>{msg}</li>
            ))}
          </ul>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').realClick();
    cy.get('li').should('have.length.at.least', 3);
    cy.get('li').eq(0).should('have.text', 'queued');
    cy.get('li').eq(1).should('have.text', 'visible');
    cy.get('li').last().should('have.text', 'unmounted');
  });

  it('should focus most recent toast with shortcut', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: -1 },
        );
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: -1, root: { id: 'most-recent' } },
        );
      };

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <Toaster shortcuts={{ focus: e => e.ctrlKey && e.key === 'm' }} />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().get('#most-recent').should('exist');
    cy.get('body').type('{ctrl+m}');
    cy.get('#most-recent').should('be.focused');
  });

  it('should dismiss toast with Delete and restore focus to the next visible toast', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: -1 },
        );
      };

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <Toaster shortcuts={{ focus: e => e.ctrlKey && e.key === 'm' }} />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().click().click();
    cy.get(TOAST_CONTAINER).should('have.length', 3);
    cy.get('body').type('{ctrl+m}');
    cy.focused().should('have.attr', 'role', 'listitem').realPress('Delete');
    cy.get(TOAST_CONTAINER).should('have.length', 2);
    cy.focused().should('have.attr', 'role', 'listitem').realPress('Delete');
    cy.get(TOAST_CONTAINER).should('have.length', 1);
    cy.focused().should('have.attr', 'role', 'listitem').realPress('Delete');
    cy.get(TOAST_CONTAINER).should('not.exist');
    cy.get('#make').should('be.focused');
  });

  it('should dismiss all toasts with Escape and restore focus', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: -1 },
        );
      };

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <Toaster shortcuts={{ focus: e => e.ctrlKey && e.key === 'm' }} />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().click().click();
    cy.get(TOAST_CONTAINER).should('have.length', 3);
    cy.get('body').type('{ctrl+m}');
    cy.focused().should('have.attr', 'role', 'listitem').realPress('Escape');
    cy.get(TOAST_CONTAINER).should('not.exist');
    cy.get('#make').should('be.focused');
  });
});
