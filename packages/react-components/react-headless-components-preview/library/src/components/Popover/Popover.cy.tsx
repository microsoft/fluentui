import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import type { PopoverProps } from './Popover.types';
import { Tooltip } from '../Tooltip';
import type { JSXElement } from '@fluentui/react-utilities';
import type { PositioningImperativeRef } from '@fluentui/react-positioning';

const mount = (element: JSXElement) => {
  mountBase(element);
};

const popoverTriggerSelector = '[aria-expanded]';
const popoverContentSelector = '[role="group"]';

describe('native surface lifecycle', () => {
  const Example = ({ trapFocus, preventOpening = false }: { trapFocus: boolean; preventOpening?: boolean }) => {
    const [open, setOpen] = React.useState(true);
    const [version, setVersion] = React.useState(0);
    const attachSurface = React.useCallback(
      (surface: HTMLDialogElement | HTMLDivElement | null) => {
        if (surface && preventOpening) {
          surface.addEventListener('beforetoggle', event => {
            if ((event as Event & { newState: string }).newState === 'open') {
              event.preventDefault();
            }
          });
        }
      },
      [preventOpening],
    );
    return (
      <>
        <button data-testid="outside-close" onClick={() => setOpen(false)}>
          Close
        </button>
        <Popover open={open} trapFocus={trapFocus} onOpenChange={(_, data) => setOpen(data.open)}>
          <PopoverTrigger>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface key={version} ref={attachSurface} data-testid="surface">
            <button
              autoFocus
              data-testid="finish"
              onClick={() => {
                setOpen(false);
                setVersion(value => value + 1);
              }}
            >
              Finish
            </button>
          </PopoverSurface>
        </Popover>
      </>
    );
  };
  ([false, true] as const).forEach(trapFocus => {
    it(`dismisses a replacement surface after reopening (${trapFocus ? 'modal' : 'non-modal'})`, () => {
      mount(<Example trapFocus={trapFocus} />);
      cy.get('[data-testid=finish]').focus().realPress('Enter');
      cy.get('[data-testid=surface]').should('not.exist');
      cy.get('[data-testid=trigger]').focus().realPress('Enter');
      cy.get('[data-testid=surface]').should('be.visible');
      cy.get('[data-testid=finish]').focus().realPress('Escape');
      cy.get('[data-testid=surface]').should('not.exist');
      cy.get('[data-testid=trigger]').should('have.attr', 'aria-expanded', 'false');
    });

    it(`unmounts after prevented native opening (${trapFocus ? 'modal' : 'non-modal'})`, function () {
      if (trapFocus) {
        cy.document().then(doc => {
          const dialog = doc.createElement('dialog');
          dialog.addEventListener('beforetoggle', event => event.preventDefault());
          doc.body.append(dialog);
          dialog.showModal();
          const supportsCancelableOpening = !dialog.open;
          if (dialog.open) {
            dialog.close();
          }
          dialog.remove();
          if (!supportsCancelableOpening) {
            this.skip();
          }
        });
      }
      mount(<Example trapFocus={trapFocus} preventOpening />);
      cy.get('[data-testid=surface]').should('not.be.visible');
      cy.get('[data-testid=outside-close]').click();
      cy.get('[data-testid=surface]').should('not.exist');
    });
  });
});

describe('nested shadow focus restoration', () => {
  const NestedControl = ({ onClose }: { onClose: () => void }) => {
    const [root, setRoot] = React.useState<ShadowRoot | null>(null);
    const attachRoot = React.useCallback((host: HTMLDivElement | null) => {
      if (host) {
        setRoot(host.shadowRoot ?? host.attachShadow({ mode: 'open' }));
      }
    }, []);
    // A portal puts the focused control inside the shadow root, not in the host's light DOM.
    return (
      <div ref={attachRoot} data-testid="nested-host">
        {root &&
          createPortal(
            <button autoFocus onClick={onClose}>
              Finish
            </button>,
            root,
          )}
      </div>
    );
  };
  const Example = ({ trapFocus }: { trapFocus: boolean }) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Popover trapFocus={trapFocus} open={open} onOpenChange={(_, data) => setOpen(data.open)}>
        <PopoverTrigger>
          <button data-testid="trigger">Trigger</button>
        </PopoverTrigger>
        <PopoverSurface data-testid="surface">
          <NestedControl onClose={() => setOpen(false)} />
        </PopoverSurface>
      </Popover>
    );
  };
  ([false, true] as const).forEach(trapFocus => {
    (['Enter', 'Escape'] as const).forEach(key => {
      it(`restores nested shadow focus on ${key} (${trapFocus ? 'modal' : 'non-modal'})`, () => {
        mount(<Example trapFocus={trapFocus} />);
        cy.get('[data-testid=nested-host]').shadow().contains('button', 'Finish').focus().realPress(key);
        cy.get('[data-testid=surface]').should('not.exist');
        cy.get('[data-testid=trigger]').should('have.focus');
      });
    });
  });
});

/**
 * Marks a focus-restoration scenario as a known gap of the native
 * `popover="auto"` model.
 *
 * Hover and contextmenu opens: the spec hide algorithm restores focus to
 *    the element that was focused when `showPopover()` ran. Hover and
 *    contextmenu paths never move focus to the trigger before opening, so
 *    the snapshot points at whatever was focused before — usually `<body>` —
 *    and restoration after close lands on the wrong element.
 *
 * These scenarios never give the surface focus, so closing must not
 * acquire unrelated trigger focus. The skipped tests document the legacy
 * expectations, not the current focus-ownership contract.
 */
const itSkipUnsupportedFocusRestore = (description: string, fn: () => void): void => {
  it.skip(description, fn);
};

describe('Popover', () => {
  ['uncontrolled', 'controlled'].forEach(scenario => {
    const UncontrolledExample = () => (
      <Popover>
        <PopoverTrigger disableButtonEnhancement>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>This is a popover</PopoverSurface>
      </Popover>
    );

    const ControlledExample = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <Popover open={open} onOpenChange={(e, data) => setOpen(data.open)}>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>This is a popover</PopoverSurface>
        </Popover>
      );
    };

    describe(scenario, () => {
      const Example = scenario === 'controlled' ? ControlledExample : UncontrolledExample;

      beforeEach(() => {
        mount(<Example />);
        cy.get('body').click('bottomRight');
      });

      it('should open when clicked', () => {
        cy.get(popoverTriggerSelector).click().get(popoverContentSelector).should('be.visible');
      });

      (['{enter}', 'Space'] as const).forEach((key: '{enter}' | 'Space') => {
        it(`should open with ${key}`, () => {
          cy.get(popoverTriggerSelector).focus().realPress(key);
          cy.get(popoverContentSelector).should('be.visible');
        });
      });

      it('should dismiss on click outside', () => {
        cy.get(popoverTriggerSelector).realClick();
        cy.get(popoverContentSelector).should('be.visible');
        cy.get('body').realClick({ position: 'bottomRight' });
        cy.get(popoverContentSelector).should('not.exist');
      });

      it('should dismiss on Escape keydown', () => {
        cy.get(popoverTriggerSelector).click().realPress('Escape');
        cy.get(popoverContentSelector).should('not.exist');
      });

      it('should keep open state on scroll outside', () => {
        cy.get(popoverTriggerSelector).click().get(popoverContentSelector).should('be.visible');
        cy.get('body').trigger('wheel').get(popoverContentSelector).should('be.visible');
      });
    });
  });

  describe('Open on hover', () => {
    beforeEach(() => {
      mount(
        <Popover openOnHover>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>This is a popover</PopoverSurface>
        </Popover>,
      );
      cy.get('body').click('bottomRight');
    });

    it('should open on hover, and keep open on mouse move to content', () => {
      cy.get(popoverTriggerSelector).trigger('mouseover').get(popoverContentSelector).should('be.visible');
      cy.get(popoverContentSelector).trigger('mouseover').get(popoverContentSelector).should('be.visible');
    });
  });

  describe('With custom trigger', () => {
    const CustomTrigger = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
      return (
        <button {...props} ref={ref}>
          Custom Trigger
        </button>
      );
    });

    it('should dismiss on click outside', () => {
      mount(
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <CustomTrigger />
          </PopoverTrigger>
          <PopoverSurface>This is a popover</PopoverSurface>
        </Popover>,
      );
      cy.get(popoverTriggerSelector).realClick();
      cy.get(popoverContentSelector).should('be.visible');
      cy.get('body').realClick({ position: 'bottomRight' });
      cy.get(popoverContentSelector).should('not.exist');
    });
  });

  describe('Context popover', () => {
    beforeEach(() => {
      mount(
        <Popover openOnContext>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>This is a popover</PopoverSurface>
        </Popover>,
      );
      cy.get('body').click('bottomRight');
    });

    it('should open when right clicked', () => {
      cy.get(popoverTriggerSelector).rightclick().get(popoverContentSelector).should('be.visible');
    });

    it('should stay open after right click (no immediate light-dismiss)', () => {
      // Regression: previously the trailing pointerup/auxclick from the
      // right-click sequence was interpreted by the browser's `popover="auto"`
      // light-dismiss algorithm as an outside-click and immediately closed
      // the popover after opening.
      cy.get(popoverTriggerSelector).rightclick();
      cy.get(popoverContentSelector).should('be.visible');
      cy.wait(150);
      cy.get(popoverContentSelector).should('be.visible');
    });
  });

  describe('updating content', () => {
    const Example = () => {
      const [visible, setVisible] = React.useState(false);

      const changeContent = () => setVisible(true);
      const onOpenChange: PopoverProps['onOpenChange'] = (e, data) => {
        if (data.open === false) {
          setVisible(false);
        }
      };

      return (
        <Popover onOpenChange={onOpenChange}>
          <PopoverTrigger disableButtonEnhancement>
            <button>Popover trigger</button>
          </PopoverTrigger>
          <PopoverSurface>
            {visible ? (
              <div>The second panel</div>
            ) : (
              <div>
                <button onClick={changeContent}>Action</button>
              </div>
            )}
          </PopoverSurface>
        </Popover>
      );
    };

    it('should not close popover', () => {
      mount(<Example />);
      cy.get(popoverTriggerSelector)
        .click()
        .get(popoverContentSelector)
        .within(() => {
          cy.get('button').click();
        })
        .get(popoverContentSelector)
        .should('exist');
    });
  });

  describe('Focus on open', () => {
    it('browser focuses a text-only surface on open', () => {
      mount(
        <Popover>
          <PopoverTrigger>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">Text only</PopoverSurface>
        </Popover>,
      );
      cy.get('[data-testid=trigger]').focus().realPress('Enter');
      cy.get('[data-testid=surface]').should('have.focus');
    });

    it('browser focuses the first focusable element inside the surface on open', () => {
      mount(
        <Popover>
          <PopoverTrigger>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">
            <button data-testid="inner">Inner</button>
          </PopoverSurface>
        </Popover>,
      );
      cy.get('[data-testid=trigger]').focus().realPress('Enter');
      cy.get('[data-testid=inner]').should('have.focus');
    });
  });

  describe('Focus restoration', () => {
    it('should restore focus to trigger on close', () => {
      mount(
        <Popover>
          <PopoverTrigger>
            <button id="trigger">trigger</button>
          </PopoverTrigger>
          <PopoverSurface>
            <button id="button">button</button>
          </PopoverSurface>
        </Popover>,
      );

      cy.get('#trigger').realClick();
      cy.get(popoverContentSelector).should('exist');
      cy.get('#button').focus();
      cy.realPress('Escape');
      cy.get(popoverContentSelector).should('not.exist');
      cy.get('#trigger').should('have.focus');
    });
  });

  describe('Focus restore — unsupported scenarios', () => {
    it('programmatic close: preserves intentional focus on the outside close button', () => {
      const Example = () => {
        const [open, setOpen] = React.useState(false);
        return (
          <>
            <Popover open={open} onOpenChange={(_, data) => setOpen(data.open)}>
              <PopoverTrigger disableButtonEnhancement>
                <button data-testid="trigger">Trigger</button>
              </PopoverTrigger>
              <PopoverSurface data-testid="surface">Content</PopoverSurface>
            </Popover>
            <button data-testid="close" onClick={() => setOpen(false)}>
              Close
            </button>
          </>
        );
      };
      mount(<Example />);
      cy.get('[data-testid=trigger]').focus().realPress('Enter');
      cy.get('[data-testid=surface]').should('be.visible');
      cy.get('[data-testid=close]').click();
      cy.get('[data-testid=surface]').should('not.exist');
      cy.focused().should('have.attr', 'data-testid', 'close');
    });

    describe('native close lifecycle', () => {
      const Example = ({
        trapFocus,
        initiallyOpen = false,
        redirectFocus = false,
      }: {
        trapFocus: boolean;
        initiallyOpen?: boolean;
        redirectFocus?: boolean;
      }) => {
        const [open, setOpen] = React.useState(initiallyOpen);
        const outsideRef = React.useRef<HTMLButtonElement>(null);
        return (
          <>
            <button ref={outsideRef} data-testid="outside">
              Outside
            </button>
            <Popover trapFocus={trapFocus} open={open} onOpenChange={(_, data) => setOpen(data.open)}>
              <PopoverTrigger>
                <button data-testid="trigger">Trigger</button>
              </PopoverTrigger>
              <PopoverSurface data-testid="surface">
                <button
                  autoFocus
                  data-testid="finish"
                  onClick={() => {
                    setOpen(false);
                    if (redirectFocus) {
                      outsideRef.current?.focus();
                    }
                  }}
                >
                  Finish
                </button>
              </PopoverSurface>
            </Popover>
          </>
        );
      };

      ([false, true] as const).forEach(trapFocus => {
        describe(trapFocus ? 'modal' : 'non-modal', () => {
          ([false, true] as const).forEach(initiallyOpen => {
            it(`closes natively before unmounting (${initiallyOpen ? 'initially' : 'trigger'} open)`, () => {
              mount(<Example trapFocus={trapFocus} initiallyOpen={initiallyOpen} />);
              if (!initiallyOpen) {
                cy.get('[data-testid=trigger]').focus().realPress('Enter');
              }
              cy.get<HTMLDialogElement>('[data-testid=surface]').then($surface => {
                const surface = $surface[0];
                const method = trapFocus ? 'close' : 'hidePopover';
                const nativeClose = surface[method].bind(surface);
                cy.stub(surface, method)
                  .callsFake(() => {
                    expect(surface.isConnected).to.equal(true);
                    nativeClose();
                  })
                  .as('nativeClose');
              });
              cy.get('[data-testid=finish]').focus().realPress('Enter');
              cy.get('@nativeClose').should('have.been.calledOnce');
              cy.get('[data-testid=surface]').should('not.exist');
              cy.get('[data-testid=trigger]').should('have.focus').realPress('Enter');
              cy.get('[data-testid=surface]').should('be.visible');
            });
          });

          it('restores focus when an initially open surface is dismissed natively', () => {
            mount(<Example trapFocus={trapFocus} initiallyOpen />);
            cy.get('[data-testid=finish]').should('have.focus').realPress('Escape');
            cy.get('[data-testid=surface]').should('not.exist');
            cy.get('[data-testid=trigger]').should('have.focus');
          });
        });
      });

      it('preserves intentional focus movement during programmatic close', () => {
        mount(<Example trapFocus={false} initiallyOpen redirectFocus />);
        cy.get('[data-testid=finish]').focus().realPress('Enter');
        cy.get('[data-testid=surface]').should('not.exist');
        cy.get('[data-testid=outside]').should('have.focus');
      });

      it('preserves the browser restoration target when it differs from the trigger', () => {
        const NativeSnapshotExample = () => {
          const [open, setOpen] = React.useState(false);
          return (
            <>
              <button data-testid="opener" onClick={() => setOpen(true)}>
                Open
              </button>
              <Popover open={open}>
                <PopoverTrigger>
                  <button data-testid="trigger">Trigger</button>
                </PopoverTrigger>
                <PopoverSurface data-testid="surface">
                  <button data-testid="finish" onClick={() => setOpen(false)}>
                    Finish
                  </button>
                </PopoverSurface>
              </Popover>
            </>
          );
        };
        mount(<NativeSnapshotExample />);
        cy.get('[data-testid=opener]').focus().realPress('Enter');
        cy.get('[data-testid=finish]').focus().realPress('Enter');
        cy.get('[data-testid=surface]').should('not.exist');
        cy.get('[data-testid=opener]').should('have.focus');
      });
    });

    itSkipUnsupportedFocusRestore('hover-leave close: should restore focus to trigger', () => {
      mount(
        <Popover openOnHover mouseLeaveDelay={0}>
          <PopoverTrigger disableButtonEnhancement>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">Content</PopoverSurface>
        </Popover>,
      );
      cy.get('[data-testid=trigger]').focus().trigger('mouseenter');
      cy.get('[data-testid=surface]').should('be.visible');
      cy.get('[data-testid=trigger]').trigger('mouseleave');
      cy.get('[data-testid=surface]').should('not.exist');
      cy.focused().should('have.attr', 'data-testid', 'trigger');
    });

    itSkipUnsupportedFocusRestore('hover-open + Esc: should restore focus to trigger', () => {
      mount(
        <Popover openOnHover>
          <PopoverTrigger disableButtonEnhancement>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">Content</PopoverSurface>
        </Popover>,
      );
      cy.get('[data-testid=trigger]').trigger('mouseenter');
      cy.get('[data-testid=surface]').should('be.visible');
      cy.realPress('Escape');
      cy.focused().should('have.attr', 'data-testid', 'trigger');
    });

    itSkipUnsupportedFocusRestore('context-open + Esc: should restore focus to trigger', () => {
      mount(
        <Popover openOnContext>
          <PopoverTrigger disableButtonEnhancement>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">Content</PopoverSurface>
        </Popover>,
      );
      cy.get('[data-testid=trigger]').rightclick();
      cy.get('[data-testid=surface]').should('be.visible');
      cy.realPress('Escape');
      cy.focused().should('have.attr', 'data-testid', 'trigger');
    });
  });

  describe('Focus trap', () => {
    const trapSurfaceSelector = 'dialog';

    it('keeps the surface open when native Escape cancellation is prevented', () => {
      const onOpenChange = cy.stub().as('onOpenChange');
      mount(
        <Popover defaultOpen trapFocus onOpenChange={onOpenChange}>
          <PopoverTrigger>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface onCancel={event => event.preventDefault()}>
            <button data-testid="inner">Inner</button>
          </PopoverSurface>
        </Popover>,
      );

      cy.get('[data-testid=inner]').should('have.focus').realPress('Escape');
      cy.get(trapSurfaceSelector).should('be.visible').and('have.attr', 'open');
      cy.get('[data-testid=trigger]').should('have.attr', 'aria-expanded', 'true');
      cy.get('[data-testid=inner]').should('have.focus');
      cy.get('@onOpenChange').should('not.have.been.called');
    });

    ([false, true] as const).forEach(withBeforeToggle => {
      it(`restores focus after native dialog close ${withBeforeToggle ? 'with' : 'without'} beforetoggle`, () => {
        mount(
          <Popover defaultOpen trapFocus>
            <PopoverTrigger>
              <button data-testid="trigger">Trigger</button>
            </PopoverTrigger>
            <PopoverSurface>
              <button data-testid="inner">Inner</button>
            </PopoverSurface>
          </Popover>,
        );

        cy.get('[data-testid=inner]').should('have.focus');
        cy.get<HTMLDialogElement>(trapSurfaceSelector).then($dialog => {
          if (!withBeforeToggle) {
            $dialog[0].addEventListener('beforetoggle', event => event.stopImmediatePropagation(), true);
          }
          $dialog[0].close();
        });
        cy.get(trapSurfaceSelector).should('not.exist');
        cy.get('[data-testid=trigger]').should('have.focus');
      });
    });

    it('preserves focus moved outside before the queued native dialog close event', () => {
      mount(
        <>
          <button data-testid="outside">Outside</button>
          <Popover defaultOpen trapFocus>
            <PopoverTrigger>
              <button data-testid="trigger">Trigger</button>
            </PopoverTrigger>
            <PopoverSurface>
              <button data-testid="inner">Inner</button>
            </PopoverSurface>
          </Popover>
        </>,
      );

      cy.get('[data-testid=inner]').should('have.focus');
      cy.get<HTMLDialogElement>(trapSurfaceSelector).then($dialog => {
        $dialog[0].close();
        $dialog[0].ownerDocument.querySelector<HTMLButtonElement>('[data-testid=outside]')!.focus();
      });
      cy.get(trapSurfaceSelector).should('not.exist');
      cy.get('[data-testid=outside]').should('have.focus');
    });

    it('does not move focus into the surface when opened on hover without focus trapping', () => {
      mount(
        <>
          <button data-testid="current-task">Current task</button>
          <Popover openOnHover>
            <PopoverTrigger disableButtonEnhancement>
              <button data-testid="trigger">Hover trigger</button>
            </PopoverTrigger>
            <PopoverSurface as="div" data-testid="surface" tabIndex={-1}>
              Hover disclosure
            </PopoverSurface>
          </Popover>
        </>,
      );

      cy.get('[data-testid=current-task]').focus();
      cy.get('[data-testid=trigger]').trigger('mouseover');
      cy.get('[data-testid=surface]').should('be.visible').and('have.attr', 'tabindex', '-1');
      cy.focused().should('have.attr', 'data-testid', 'current-task');
    });

    it('moves focus into the surface on open and walks through focusables', () => {
      mount(
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">
            <button data-testid="first">First</button>
            <button data-testid="second">Second</button>
            <button data-testid="third">Third</button>
          </PopoverSurface>
        </Popover>,
      );

      cy.get('[data-testid=trigger]').realClick();
      cy.get(trapSurfaceSelector).should('be.visible');

      cy.focused().should('have.attr', 'data-testid', 'first');

      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-testid', 'second');
      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-testid', 'third');
    });

    it('honors the autofocus HTML attribute on a child', () => {
      const setAutofocus = (el: HTMLInputElement | null) => el?.setAttribute('autofocus', '');

      mount(
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">
            <button data-testid="first">First</button>
            <input data-testid="auto" ref={setAutofocus} />
            <button data-testid="last">Last</button>
          </PopoverSurface>
        </Popover>,
      );

      cy.get('[data-testid=trigger]').realClick();
      cy.get(trapSurfaceSelector).should('be.visible');
      cy.focused().should('have.attr', 'data-testid', 'auto');
    });

    it('restores focus to the trigger on Escape', () => {
      mount(
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">
            <button data-testid="inner">Inner</button>
          </PopoverSurface>
        </Popover>,
      );

      cy.get('[data-testid=trigger]').realClick();
      cy.get(trapSurfaceSelector).should('be.visible');
      cy.realPress('Escape');
      cy.get(trapSurfaceSelector).should('not.exist');
      cy.focused().should('have.attr', 'data-testid', 'trigger');
    });

    it('makes content behind the surface inert (cannot be clicked)', () => {
      const Example = () => {
        const [outsideClicks, setOutsideClicks] = React.useState(0);
        return (
          <>
            <button data-testid="outside" onClick={() => setOutsideClicks(c => c + 1)}>
              Outside ({outsideClicks})
            </button>
            <Popover trapFocus>
              <PopoverTrigger disableButtonEnhancement>
                <button data-testid="trigger">Trigger</button>
              </PopoverTrigger>
              <PopoverSurface data-testid="surface">
                <button data-testid="inner">Inner</button>
              </PopoverSurface>
            </Popover>
          </>
        );
      };

      mount(<Example />);
      cy.get('[data-testid=trigger]').realClick();
      cy.get(trapSurfaceSelector).should('be.visible');

      cy.get('[data-testid=outside]').realClick();
      cy.get('[data-testid=outside]').should('have.text', 'Outside (0)');
      cy.get(trapSurfaceSelector).should('be.visible');
    });
  });
});

describe('positioning observer', () => {
  const surfaceSelector = popoverContentSelector;

  it('imperative updatePosition() is callable while the surface is open and does not throw', () => {
    const positioningRef = React.createRef<PositioningImperativeRef>();

    const Fixture = () => (
      <div style={{ padding: 16, paddingTop: 240 }}>
        <Popover defaultOpen positioning={{ position: 'above', positioningRef }}>
          <PopoverTrigger disableButtonEnhancement>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface style={{ width: 200, height: 80, padding: 8 }}>Surface</PopoverSurface>
        </Popover>
      </div>
    );

    cy.viewport(1000, 600);
    mount(<Fixture />);
    cy.get(surfaceSelector).should('be.visible');
    cy.then(() => {
      expect(() => positioningRef.current?.updatePosition()).not.to.throw();
    });
    // Only assert the resolved placement when the browser supports CSS anchor positioning
    // (Chromium 125+). Without it the surface stays at its static DOM position and the
    // observer correctly reports whatever side it ends up on — not necessarily 'above'.
    cy.window().then(win => {
      if (win.CSS?.supports?.('anchor-name: --x')) {
        cy.get(surfaceSelector).should('have.attr', 'data-placement', 'above');
      }
    });
  });

  describe('with Tooltip wrapping PopoverTrigger', () => {
    const TooltipWrappedPopoverExample = () => {
      return (
        <Popover>
          <Tooltip
            hideDelay={0}
            showDelay={0}
            content={{ id: 'tooltip-content', children: 'Open popover for more info' }}
            relationship="label"
          >
            <PopoverTrigger disableButtonEnhancement>
              <button id="tooltip-wrapped-trigger">More Info</button>
            </PopoverTrigger>
          </Tooltip>
          <PopoverSurface>Additional information goes here.</PopoverSurface>
        </Popover>
      );
    };

    it('should open popover when tooltip-wrapped trigger is clicked', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').should('exist');
      cy.get(surfaceSelector).should('not.exist');
      cy.get('#tooltip-wrapped-trigger').trigger('pointerover', { force: true });
      cy.get(surfaceSelector).should('not.exist');
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('[role="tooltip"]').should('contain.text', 'Open popover for more info');

      cy.get('#tooltip-wrapped-trigger').click({ force: true });
      cy.get(surfaceSelector).should('be.visible');
      cy.get('[role="tooltip"]').should('not.exist');
      cy.get(surfaceSelector).should('contain.text', 'Additional information');
    });

    it('should have tooltip accessible on the trigger', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-label', 'Open popover for more info');
    });

    it('should have proper ARIA expanded state', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-expanded', 'false');
      cy.get('#tooltip-wrapped-trigger').click({ force: true });
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should handle keyboard interaction (Enter) with tooltip-wrapped trigger', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').focus().realPress('Enter');
      cy.get(surfaceSelector).should('be.visible');
    });

    it('should dismiss on Escape even with tooltip wrapper', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').focus().realPress('Enter');
      cy.get(surfaceSelector).should('be.visible');
      cy.focused().realPress('Escape');
      cy.get(surfaceSelector).should('not.exist');
    });

    it('should show tooltip on hover without opening popover', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').trigger('pointerover', { force: true });
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('[role="tooltip"]').should('contain.text', 'Open popover for more info');
      cy.get(surfaceSelector).should('not.exist');
    });
  });

  // CSS anchor positioning is only available in Chromium 125+; skip the entire suite on older browsers.
  if (typeof window !== 'undefined' && window.CSS?.supports?.('anchor-name: --x')) {
    describe('Popover and Tooltip on same trigger (anchor-name sharing)', () => {
      const PopoverWithTooltipExample = () => {
        return (
          <Popover>
            <PopoverTrigger disableButtonEnhancement>
              <Tooltip
                hideDelay={0}
                showDelay={0}
                positioning="after"
                content={{ id: 'tooltip-content', children: 'Click for options', style: { pointerEvents: 'none' } }}
                relationship="label"
              >
                <button id="popover-tooltip-trigger">Trigger</button>
              </Tooltip>
            </PopoverTrigger>
            <PopoverSurface>Popover content</PopoverSurface>
          </Popover>
        );
      };

      it('should not clobber anchor-name when both Popover and Tooltip target the same trigger', () => {
        mount(<PopoverWithTooltipExample />);

        // Show tooltip on hover
        cy.get('#popover-tooltip-trigger').trigger('pointerover', { force: true });
        cy.get('[role="tooltip"]').should('exist');
        cy.get('[role="tooltip"]').should('contain.text', 'Click for options');

        // Clicking the popover trigger is allowed to dismiss the tooltip, but it must
        // leave the popover's anchor-name wiring intact.
        cy.get('#popover-tooltip-trigger').click();
        cy.get(surfaceSelector).should('be.visible');
        cy.get('[role="tooltip"]').should('not.exist');

        cy.get('#popover-tooltip-trigger').should($trigger => {
          const anchorName = $trigger[0].style.getPropertyValue('anchor-name');
          expect(anchorName).to.not.be.empty;
        });
      });

      it('should show tooltip and open popover independently', () => {
        mount(<PopoverWithTooltipExample />);

        // Hover to show tooltip
        cy.get('#popover-tooltip-trigger').trigger('pointerover', { force: true });
        cy.get('[role="tooltip"]').should('exist');
        cy.get('[role="tooltip"]').should('contain.text', 'Click for options');
        cy.get(surfaceSelector).should('not.exist');

        // Click to open popover
        cy.get('#popover-tooltip-trigger').click();
        cy.get(surfaceSelector).should('be.visible');
        cy.get('[role="tooltip"]').should('not.exist');

        // Close popover with Escape
        cy.focused().realPress('Escape');
        cy.get(surfaceSelector).should('not.exist');
      });

      it('should properly clean up anchor-name on unmount', () => {
        mount(<PopoverWithTooltipExample />);

        // Open popover to set anchor-name
        cy.get('#popover-tooltip-trigger').click();
        cy.get(surfaceSelector).should('be.visible');

        // Verify anchor-name was set
        cy.get('#popover-tooltip-trigger').should($trigger => {
          const anchorName = $trigger[0].style.getPropertyValue('anchor-name');
          expect(anchorName).to.not.be.empty;
        });

        // Close popover
        cy.focused().realPress('Escape');
        cy.get(surfaceSelector).should('not.exist');
      });
    });
  }
});
