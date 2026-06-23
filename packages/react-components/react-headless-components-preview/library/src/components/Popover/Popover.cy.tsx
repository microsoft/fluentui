import * as React from 'react';
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

/**
 * Marks a focus-restoration scenario as a known gap of the native
 * `popover="auto"` model.
 *
 * Two distinct gaps put scenarios in this bucket:
 *
 * 1. Programmatic close: when React state flips `open: true → false`, the
 *    surface unmounts before any close-side effect can call `hidePopover()`,
 *    so the spec hide algorithm never runs and no focus restoration happens.
 *    The trailing pointer event from the close interaction (e.g. clicking a
 *    "Close" button) leaves focus on that button.
 *
 * 2. Hover and contextmenu opens: the spec hide algorithm restores focus to
 *    the element that was focused when `showPopover()` ran. Hover and
 *    contextmenu paths never move focus to the trigger before opening, so
 *    the snapshot points at whatever was focused before — usually `<body>` —
 *    and restoration after close lands on the wrong element.
 *
 * Both gaps require a manual focus snapshot taken at intent-to-open and
 * replayed when `open` transitions back to false. The tests below are kept
 * as executable documentation; un-skipping them is the canary that the
 * manual snapshot is in place.
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
    itSkipUnsupportedFocusRestore('programmatic close: should restore focus to trigger', () => {
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
      cy.focused().should('have.attr', 'data-testid', 'trigger');
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
    const trapSurfaceSelector = '[role="dialog"]';

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

    it('should open popover when tooltip-wrapped trigger is hovered', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').should('exist');
      cy.get(surfaceSelector).should('not.exist');
      cy.get('#tooltip-wrapped-trigger').trigger('pointerover');
      cy.get(surfaceSelector).should('not.exist');
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('[role="tooltip"]').should('contain.text', 'Open popover for more info');

      cy.get('#tooltip-wrapped-trigger').click();
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
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should handle keyboard interaction (Enter) with tooltip-wrapped trigger', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').focus().realPress('Enter');
      cy.get(surfaceSelector).should('be.visible');
    });

    it('should dismiss on Escape even with tooltip wrapper', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get(surfaceSelector).should('be.visible');
      cy.focused().realPress('Escape');
      cy.get(surfaceSelector).should('not.exist');
    });

    it('should show tooltip on hover without opening popover', () => {
      mount(<TooltipWrappedPopoverExample />);
      cy.get('#tooltip-wrapped-trigger').trigger('pointerover');
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('[role="tooltip"]').should('contain.text', 'Open popover for more info');
      cy.get(surfaceSelector).should('not.exist');
    });
  });
});
