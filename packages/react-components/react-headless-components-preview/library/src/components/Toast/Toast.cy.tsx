import * as React from 'react';
import { flushSync } from 'react-dom';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import type { JSXElement } from '@fluentui/react-utilities';

import { Toaster, Toast, ToastTitle, useToastController } from '.';
import { Provider } from '../Provider';

/**
 * Selectors used by the headless tests. Unlike the styled v9 layer, the headless
 * Toast does not emit Griffel class names — we target structural roles and the
 * structural roles on the headless `ToastContainer` root.
 */
const TOAST_CONTAINER = '[role="listitem"]';

polyfillBodyAndObserve();

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
    cy.get('button').click().get(TOAST_CONTAINER).should('exist');
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
    cy.get('#make').click().get(TOAST_CONTAINER).should('exist');
    cy.get('#dismiss').click().get(TOAST_CONTAINER).should('not.exist');
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
    cy.get('#make').click().get(TOAST_CONTAINER).should('have.length', 5);
    cy.get('#dismiss').click().get(TOAST_CONTAINER).should('not.exist');
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
    cy.get('#make').click().get(TOAST_CONTAINER).should('exist');
    cy.get('#pause').click().wait(1000).get(TOAST_CONTAINER).should('exist');
    cy.get('#play').click().get(TOAST_CONTAINER).should('not.exist');
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
    cy.get('#make').click().get(TOAST_CONTAINER).should('exist');
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
    cy.get('#make').click().get(TOAST_CONTAINER).trigger('mouseenter').wait(700).get(TOAST_CONTAINER).should('exist');
  });

  it('should not run the timeout of a queued toast until it becomes visible', () => {
    const Example = () => {
      const { dispatchToast, dismissToast } = useToastController();
      const makeToasts = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>Visible toast</ToastTitle>
          </Toast>,
          { toastId: 'visible', timeout: -1 },
        );
        dispatchToast(
          <Toast>
            <ToastTitle>Queued toast</ToastTitle>
          </Toast>,
          { toastId: 'queued', timeout: 500 },
        );
      };

      return (
        <>
          <button id="make" onClick={makeToasts}>
            Make toasts
          </button>
          <button id="dismiss" onClick={() => dismissToast('visible')}>
            Dismiss visible toast
          </button>
          <Toaster limit={1} />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().wait(700);
    cy.get('#dismiss').click();
    cy.contains(TOAST_CONTAINER, 'Queued toast').should('exist');
    cy.wait(700);
    cy.contains(TOAST_CONTAINER, 'Queued toast').should('not.exist');
  });

  it('should promote a queued toast when the first is dismissed in the same event', () => {
    const Example = () => {
      const { dispatchToast, dismissToast } = useToastController();
      const makeToasts = () => {
        dispatchToast(<Toast>First toast</Toast>, { toastId: 'first', timeout: -1 });
        dispatchToast(<Toast>Queued toast</Toast>, { toastId: 'queued', timeout: -1 });
        dismissToast('first');
      };

      return (
        <>
          <button onClick={makeToasts}>Make toasts</button>
          <Toaster limit={1} />
        </>
      );
    };

    mount(<Example />);
    cy.get('button').click();
    cy.contains(TOAST_CONTAINER, 'First toast').should('not.exist');
    cy.contains(TOAST_CONTAINER, 'Queued toast').should('exist');
  });

  it('should start a fresh timer for a same-id replacement', () => {
    const Example = () => {
      const { dispatchToast, dismissToast } = useToastController();
      const makeToast = () =>
        dispatchToast(<Toast>First toast</Toast>, {
          toastId: 'same',
          timeout: 2000,
          onStatusChange: (_, { status }) => {
            if (status === 'dismissed') {
              dispatchToast(<Toast>Replacement toast</Toast>, { toastId: 'same', timeout: 2000 });
            }
          },
        });

      return (
        <>
          <button id="make" onClick={makeToast}>
            Make toast
          </button>
          <button id="dismiss" onClick={() => dismissToast('same')}>
            Dismiss toast
          </button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().wait(1300);
    cy.get('#dismiss').click();
    cy.contains(TOAST_CONTAINER, 'Replacement toast').should('exist').wait(900).should('exist');
  });

  it('should not open an empty position while its toast is queued', () => {
    const Example = () => {
      const { dispatchToast, dismissToast } = useToastController();
      const makeToasts = () => {
        dispatchToast(<Toast>First toast</Toast>, { toastId: 'first', position: 'bottom-end', timeout: -1 });
        dispatchToast(<Toast>Queued toast</Toast>, { toastId: 'queued', position: 'top-end', timeout: -1 });
      };

      return (
        <>
          <button id="make" onClick={makeToasts}>
            Make toasts
          </button>
          <button id="dismiss" onClick={() => dismissToast('first')}>
            Dismiss first toast
          </button>
          <Toaster limit={1} />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click();
    cy.get('[data-toaster-position="top-end"]').should('not.match', ':popover-open');
    cy.get('#dismiss').click();
    cy.get('[data-toaster-position="top-end"]').should('match', ':popover-open');
    cy.contains(TOAST_CONTAINER, 'Queued toast').should('exist');
  });

  it('should pause a promoted queued toast while focus is in the toaster', () => {
    const Example = () => {
      const { dispatchToast, dismissToast } = useToastController();
      const makeToasts = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>Visible toast</ToastTitle>
          </Toast>,
          { toastId: 'visible', timeout: -1 },
        );
        dispatchToast(
          <Toast>
            <ToastTitle>Queued toast</ToastTitle>
          </Toast>,
          { toastId: 'queued', timeout: 500 },
        );
      };

      return (
        <>
          <button id="make" onClick={makeToasts}>
            Make toasts
          </button>
          <button id="dismiss" onClick={() => dismissToast('visible')}>
            Dismiss visible toast
          </button>
          <Toaster limit={1} />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click();
    cy.get('#dismiss').click();
    cy.contains(TOAST_CONTAINER, 'Queued toast').focus().wait(700);
    cy.contains(TOAST_CONTAINER, 'Queued toast').should('exist');
    cy.get('#make').focus().wait(700);
    cy.contains(TOAST_CONTAINER, 'Queued toast').should('not.exist');
  });

  it('should pause all toasts while focus is in the toaster', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: 500 },
        );
        dispatchToast(
          <Toast>
            <ToastTitle>This is another toast</ToastTitle>
          </Toast>,
          { timeout: 500 },
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
    cy.get('#make').click().get(TOAST_CONTAINER).first().focus().wait(700);
    cy.get(TOAST_CONTAINER).should('have.length', 2);
    cy.get('#make').focus().wait(700);
    cy.get(TOAST_CONTAINER).should('not.exist');
  });

  it('should keep toasts dispatched while focus is in the toaster paused', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const dispatchSecondToast = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is another toast</ToastTitle>
          </Toast>,
          { timeout: 500 },
        );
      const dispatchFirstToast = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
            <button id="dispatch-second" onClick={dispatchSecondToast}>
              Dispatch another toast
            </button>
          </Toast>,
          { timeout: 500 },
        );

      return (
        <>
          <button id="make" onClick={dispatchFirstToast}>
            Make toast
          </button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click();
    cy.get(TOAST_CONTAINER).focus();
    cy.get('#dispatch-second').click().wait(700);
    cy.get(TOAST_CONTAINER).should('have.length', 2);
    cy.get('#make').focus().wait(700);
    cy.get(TOAST_CONTAINER).should('not.exist');
  });

  it('should keep a toast paused on hover after focus leaves the toaster', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () =>
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
          </Toast>,
          { timeout: 1000, pauseOnHover: true },
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
    cy.get('#make').click();
    cy.get(TOAST_CONTAINER)
      .realHover()
      .then(toast => toast[0].focus());
    cy.get('#make')
      .then(button => button[0].focus())
      .wait(1200);
    cy.get(TOAST_CONTAINER).should('exist');
    cy.get('#make').realHover().wait(1200);
    cy.get(TOAST_CONTAINER).should('not.exist');
  });

  it('should move focus between toasts with ArrowDown', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>First toast</ToastTitle>
          </Toast>,
          { timeout: -1 },
        );
        dispatchToast(
          <Toast>
            <ToastTitle>Second toast</ToastTitle>
          </Toast>,
          { timeout: -1 },
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
    cy.get('#make').click();
    cy.get(TOAST_CONTAINER).first().focus().realPress('ArrowDown');
    cy.get(TOAST_CONTAINER).eq(1).should('be.focused');
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
          <Toaster limit={2} shortcuts={{ focus: e => e.ctrlKey && e.key === 'm' }} />
        </>
      );
    };

    mount(<Example />);
    cy.get('#make').click().click().click();
    cy.get(TOAST_CONTAINER).should('have.length', 2);
    cy.get('body').type('{ctrl+m}');
    cy.focused().should('have.attr', 'role', 'listitem').realPress('Escape');
    cy.get(TOAST_CONTAINER).should('not.exist');
    cy.get('#make').should('be.focused');
  });

  it('should allow a pending dismissal callback to synchronously focus a replacement', () => {
    const reportFocus = cy.stub().as('reportFocus');
    const Example = () => {
      const { dispatchToast } = useToastController();
      const replacementRef = React.useRef<HTMLButtonElement>(null);
      const makeToasts = () => {
        dispatchToast('First toast', {
          toastId: 'first',
          timeout: -1,
          onStatusChange: (_, data) => {
            if (data.status === 'dismissed') {
              flushSync(() => dispatchToast('First replacement', { toastId: 'first-replacement', timeout: -1 }));
            }
          },
        });
        dispatchToast('Second toast', {
          toastId: 'second',
          timeout: -1,
          onStatusChange: (_, data) => {
            if (data.status === 'dismissed') {
              flushSync(() =>
                dispatchToast(<button ref={replacementRef}>Second replacement</button>, {
                  toastId: 'second-replacement',
                  timeout: -1,
                }),
              );
              const replacement = replacementRef.current;
              replacement?.focus();
              reportFocus(!!replacement && replacement.ownerDocument.activeElement === replacement);
            }
          },
        });
      };

      return (
        <>
          <button onClick={makeToasts}>Make toasts</button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);
    cy.contains('button', 'Make toasts').click();
    cy.contains(TOAST_CONTAINER, 'First toast').focus().realPress('Escape');
    cy.get('@reportFocus').should('have.been.calledOnceWith', true);
  });

  it('should keep toasts on an Escape that toast content already handled', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();
      const makeToast = () => {
        dispatchToast(
          <Toast>
            <ToastTitle>This is a toast</ToastTitle>
            {/* Handles Escape without stopping it, like a nested popover or combobox. */}
            <input
              className="handles-escape"
              aria-label="Handles Escape"
              onKeyDown={e => e.key === 'Escape' && e.preventDefault()}
            />
          </Toast>,
          { timeout: -1 },
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
    cy.get('#make').click().click();
    cy.get(TOAST_CONTAINER).should('have.length', 2);
    cy.get('.handles-escape').first().focus();
    cy.realPress('Escape');
    cy.get(TOAST_CONTAINER).should('have.length', 2);
  });
});
