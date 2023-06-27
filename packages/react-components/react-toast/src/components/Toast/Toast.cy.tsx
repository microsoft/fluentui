import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { Toaster, ToastTitle, Toast, useToastController, toastClassNames } from '../..';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Toast', () => {
  it('should dispatch toast', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const onClick = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
        );
      };

      return (
        <>
          <button onClick={onClick}>Make toast</button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('button').click().get(`.${toastClassNames.root}`).should('exist');
  });

  it('should dismiss toast', () => {
    const Example = () => {
      const toastId = 'foo';
      const { dispatchToast, dismissToast } = useToastController();
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { toastId, timeout: -1 },
        );
      };

      const removeToast = () => {
        dismissToast(toastId);
      };

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
    cy.get('#make')
      .click()
      .get(`.${toastClassNames.root}`)
      .should('exist')
      .get('#dismiss')
      .click()
      .get(`.${toastClassNames.root}`)
      .should('not.exist');
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

      const removeToast = () => {
        dismissAllToasts();
      };

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
    cy.get('#make')
      .click()
      .get(`.${toastClassNames.root}`)
      .should('have.length', 5)
      .get('#dismiss')
      .click()
      .get(`.${toastClassNames.root}`)
      .should('not.exist');
  });

  it('should be update toast', () => {
    const Example = () => {
      const toastId = 'foo';
      const { dispatchToast, updateToast } = useToastController();
      const makeToast = () => {
        for (let i = 0; i < 5; i++) {
          dispatchToast(
            <Toast>
              <ToastTitle>This is a toast</ToastTitle>
            </Toast>,
            { timeout: -1, toastId },
          );
        }
      };

      const update = () => {
        updateToast({
          content: (
            <Toast>
              <ToastTitle>Foo</ToastTitle>
            </Toast>
          ),
          toastId,
        });
      };

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
    cy.get('#make')
      .click()
      .get(`.${toastClassNames.root}`)
      .should('exist')
      .get('#update')
      .click()
      .get('body')
      .contains('Foo');
  });

  it('should be pause on hover', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: 500, pauseOnHover: true },
        );
      };

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
    cy.get('#make')
      .click()
      .get(`.${toastClassNames.root}`)
      .trigger('mouseenter')
      .wait(700)
      .get(`.${toastClassNames.root}`)
      .should('exist');
  });

  it('should be pause all toasts on focus', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () => {
        for (let i = 0; i < 4; i++) {
          dispatchToast(
            <Toast>
              <ToastTitle>This is a toast</ToastTitle>
            </Toast>,
            { timeout: 500, pauseOnHover: true },
          );
        }

        dispatchToast(
          <Toast>
            <ToastTitle action={<button id="action">action</button>}>This is a toast</ToastTitle>
          </Toast>,
          { timeout: 500, pauseOnHover: true },
        );
      };

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
    cy.get('#make').click().get(`#action`).focus().wait(700).get(`.${toastClassNames.root}`).should('have.length', 5);
  });

  it('should follow lifecycle', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const [log, setLog] = React.useState<string[]>([]);
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: 500, onStatusChange: (_, data) => setLog(s => [...s, data.status]) },
        );
      };

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <ul>
            {log.map(msg => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make')
      .click()
      .get('li')
      .should('have.length', 4)
      .get('li')
      .eq(0)
      .should('have.text', 'queued')
      .get('li')
      .eq(1)
      .should('have.text', 'visible')
      .get('li')
      .eq(2)
      .should('have.text', 'dismissed')
      .get('li')
      .eq(3)
      .should('have.text', 'unmounted');
  });
});
