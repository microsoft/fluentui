import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import type { PopoverProps } from './Popover.types';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(element);
};

const popoverTriggerSelector = '[aria-expanded]';
const popoverContentSelector = '[role="group"]';
const popoverDialogContentSelector = '[role="dialog"]';

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
        cy.get(popoverTriggerSelector)
          .click()
          .get('body')
          .click('bottomRight')
          .get(popoverContentSelector)
          .should('not.exist');
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

  describe('ARIA attributes', () => {
    it('should set aria-expanded="false" on closed trigger', () => {
      mount(
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).should('have.attr', 'aria-expanded', 'false');
    });

    it('should set aria-expanded="true" when open', () => {
      mount(
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).click().should('have.attr', 'aria-expanded', 'true');
    });

    it('should set aria-haspopup="true" by default', () => {
      mount(
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).should('have.attr', 'aria-haspopup', 'true');
    });

    it('should set aria-haspopup="dialog" with trapFocus', () => {
      mount(
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).should('have.attr', 'aria-haspopup', 'dialog');
    });

    it('should set role="group" on surface by default', () => {
      mount(
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).click();
      cy.get(popoverContentSelector).should('exist');
    });

    it('should set role="dialog" and aria-modal with trapFocus', () => {
      mount(
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).click();
      cy.get(popoverDialogContentSelector).should('have.attr', 'aria-modal', 'true');
    });
  });

  describe('data-* attributes', () => {
    it('should set data-open on trigger when open', () => {
      mount(
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).should('not.have.attr', 'data-open');
      cy.get(popoverTriggerSelector).click().should('have.attr', 'data-open');
    });

    it('should set data-open on surface', () => {
      mount(
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).click();
      cy.get(popoverContentSelector).should('have.attr', 'data-open');
    });

    it('should set popover="manual" on surface', () => {
      mount(
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).click();
      cy.get(popoverContentSelector).should('have.attr', 'popover', 'manual');
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
      cy.get(popoverTriggerSelector).get('body').click('bottomRight').get(popoverContentSelector).should('not.exist');
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

    it('should dismiss on scroll outside', () => {
      cy.get(popoverTriggerSelector)
        .rightclick()
        .get('body')
        .trigger('wheel')
        .get(popoverContentSelector)
        .should('not.exist');
    });
  });

  describe('popover with closeOnScroll', () => {
    beforeEach(() => {
      mount(
        <Popover closeOnScroll>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>This is a popover</PopoverSurface>
        </Popover>,
      );
      cy.get('body').click('bottomRight');
    });

    it('should dismiss on scroll outside', () => {
      cy.get(popoverTriggerSelector).click().get(popoverContentSelector).should('be.visible');
      cy.get('body').trigger('wheel').get(popoverContentSelector).should('not.exist');
    });
  });

  describe('Nested', () => {
    const PopoverL1 = () => {
      return (
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button>First nested trigger</button>
          </PopoverTrigger>
          <PopoverSurface>
            <button>First nested button</button>
            <PopoverL2 />
            <PopoverL2 />
          </PopoverSurface>
        </Popover>
      );
    };

    const PopoverL2 = () => {
      return (
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button>Second nested trigger</button>
          </PopoverTrigger>
          <PopoverSurface>
            <button>Second nested button</button>
          </PopoverSurface>
        </Popover>
      );
    };

    const Example = () => {
      return (
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button>Root trigger</button>
          </PopoverTrigger>
          <PopoverSurface>
            <button>Root button</button>
            <PopoverL1 />
          </PopoverSurface>
        </Popover>
      );
    };

    beforeEach(() => {
      mount(<Example />);
      cy.contains('Root').click().get('body').contains('First').click().get('body').contains('Second').first().click();
    });

    it('should trap focus with tab', () => {
      cy.focused().then(beforeFocused => {
        cy.focused().realPress('Tab');
        cy.realPress(['Shift', 'Tab']);
        cy.focused().then(afterFocused => {
          expect(beforeFocused[0]).eq(afterFocused[0]);
        });
      });
    });

    it('should trap focus with shift+tab', () => {
      cy.focused().then(beforeFocused => {
        cy.focused().realPress('Tab');
        cy.realPress(['Shift', 'Tab']);
        cy.focused().then(afterFocused => {
          expect(beforeFocused[0]).eq(afterFocused[0]);
        });
      });
    });

    it('should dismiss all nested popovers on outside click', () => {
      cy.get('body').click('bottomRight').get(popoverDialogContentSelector).should('not.exist');
    });

    it('should not dismiss when clicking on nested content', () => {
      cy.contains('Second nested button').click().get(popoverDialogContentSelector).should('have.length', 3);
    });

    it('should dismiss child popovers when clicking on parents', () => {
      // Native top-layer popovers stack visually, so deeper popovers cover
      // ancestor surface buttons. `{ force: true }` bypasses Cypress's
      // obscurement check — we're asserting dismissal behavior, not
      // spatial layout.
      cy.contains('First nested button')
        .click({ force: true })
        .get(popoverDialogContentSelector)
        .should('have.length', 2)
        .contains('Root button')
        .click({ force: true })
        .get(popoverDialogContentSelector)
        .should('have.length', 1);
    });

    it('should when opening a sibling popover, should dismiss other sibling popover', () => {
      const secondNestedTriggerSelector = 'button:contains(Second nested trigger)';

      // The first sibling's popover is in the top layer and can cover the
      // other sibling's trigger depending on viewport size. `{ force: true }`
      // bypasses Cypress's obscurement check — the test asserts dismissal
      // behavior, not spatial layout.
      cy.get(secondNestedTriggerSelector)
        .eq(1)
        .click({ force: true })
        .get(popoverDialogContentSelector)
        .should('have.length', 3)
        .get(secondNestedTriggerSelector)
        .eq(0)
        .click({ force: true })
        .get(popoverDialogContentSelector)
        .should('have.length', 3);
    });

    it('should dismiss each popover in the stack with Escape keydown', () => {
      cy.focused().realPress('Escape');
      cy.get(popoverDialogContentSelector).should('have.length', 2);
      cy.focused().realPress('Escape');
      cy.get(popoverDialogContentSelector).should('have.length', 1);
      cy.focused().realPress('Escape');
      cy.get(popoverDialogContentSelector).should('not.exist');
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

  describe('with inline prop', () => {
    it('should render PopoverSurface in DOM order', () => {
      mount(
        <>
          <div>
            <Popover inline>
              <PopoverTrigger disableButtonEnhancement>
                <button>Popover trigger</button>
              </PopoverTrigger>
              <PopoverSurface>This is a Popover</PopoverSurface>
            </Popover>
          </div>
          <div>Outside content</div>
        </>,
      );

      cy.get(popoverTriggerSelector)
        .click()
        .get(popoverContentSelector)
        .prev()
        .then(popoverSurfacePrev => {
          cy.get(popoverTriggerSelector).then(popoverTrigger => {
            expect(popoverTrigger[0]).eq(popoverSurfacePrev[0]);
          });
        });
    });

    it('should not have popover attribute when inline', () => {
      mount(
        <Popover inline>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).click();
      cy.get(popoverContentSelector).should('not.have.attr', 'popover');
    });
  });

  describe('focus trap', () => {
    it('Tab should cycle within the surface', () => {
      mount(
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button>Popover trigger</button>
          </PopoverTrigger>
          <PopoverSurface>
            <button>One</button>
            <button>Two</button>
          </PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).focus().realPress('Enter');

      cy.contains('One').should('have.focus').realPress('Tab');
      cy.contains('Two').should('have.focus').realPress('Tab');
      cy.contains('One').should('have.focus').realPress(['Shift', 'Tab']);
      cy.contains('Two').should('have.focus');
    });

    it('should focus on PopoverSurface when its tabIndex is a number', () => {
      mount(
        <Popover trapFocus>
          <PopoverTrigger disableButtonEnhancement>
            <button>Popover trigger</button>
          </PopoverTrigger>
          <PopoverSurface tabIndex={-1} id="popover-surface">
            <button>One</button>
            <button>Two</button>
          </PopoverSurface>
        </Popover>,
      );

      cy.get(popoverTriggerSelector).focus().realPress('Enter');

      cy.get('#popover-surface').should('have.focus').realPress('Tab');
      cy.contains('One').should('have.focus').realPress('Tab');
      cy.contains('Two').should('have.focus').realPress('Tab');
      cy.contains('One').should('have.focus').realPress(['Shift', 'Tab']);
      cy.contains('Two').should('have.focus');
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

      cy.get('#trigger')
        .click()
        .get(popoverContentSelector)
        .should('exist')
        .get('#button')
        .focus()
        .type('{esc}')
        .get(popoverContentSelector)
        .should('not.exist')
        .get('#trigger')
        .should('have.focus');
    });
  });

  describe('with Iframe', () => {
    const iframeContent = `<div id="iframecontent">
  <button>Hello World!</button>
</div>`;

    const ExampleFrame = () => {
      return <iframe title="frame" srcDoc={iframeContent} />;
    };

    it('should close when focus is on an external iframe', () => {
      mount(
        <>
          <ExampleFrame />
          <div />
          <Popover>
            <PopoverTrigger disableButtonEnhancement>
              <button>Popover trigger</button>
            </PopoverTrigger>
            <PopoverSurface>This is a popover</PopoverSurface>
          </Popover>
        </>,
      );

      cy.get(popoverTriggerSelector).click().get('iframe').focus().get(popoverContentSelector).should('not.exist');
    });

    it('should not close when focus is on an internal iframe', () => {
      mount(
        <>
          <Popover>
            <PopoverTrigger disableButtonEnhancement>
              <button>Popover trigger</button>
            </PopoverTrigger>
            <PopoverSurface>
              <ExampleFrame />
            </PopoverSurface>
          </Popover>
        </>,
      );

      cy.get(popoverTriggerSelector)
        .click()
        .get('iframe')
        .focus()
        .wait(2000)
        .get(popoverContentSelector)
        .should('exist');
    });

    it('should not close when focus is on an internal iframe in a nested popover', () => {
      mount(
        <>
          <Popover>
            <PopoverTrigger disableButtonEnhancement>
              <button>First</button>
            </PopoverTrigger>
            <PopoverSurface>
              <Popover>
                <PopoverTrigger>
                  <button>Second</button>
                </PopoverTrigger>
                <PopoverSurface>
                  <ExampleFrame />
                </PopoverSurface>
              </Popover>
            </PopoverSurface>
          </Popover>
        </>,
      );

      cy.get(popoverTriggerSelector)
        .first()
        .click()
        .get(popoverTriggerSelector)
        .eq(1)
        .click()
        .get('iframe')
        .focus()
        .wait(2000)
        .get(popoverContentSelector)
        .should('have.length', 2);
    });
  });
});
