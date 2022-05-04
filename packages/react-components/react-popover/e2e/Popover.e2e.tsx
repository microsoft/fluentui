import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import type { PopoverProps } from '@fluentui/react-popover';
const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const popoverTriggerSelector = '[aria-haspopup]';
const popoverContentSelector = '[role="complementary"]';
const popoverInteractiveContentSelector = '[role="dialog"]';

describe('Popover', () => {
  ['uncontrolled', 'controlled'].forEach(scenario => {
    const UncontrolledExample = () => (
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>This is a popover</PopoverSurface>
      </Popover>
    );

    const ControlledExample = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <Popover open={open} onOpenChange={(e, data) => setOpen(data.open)}>
          <PopoverTrigger>
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

  describe('Open on hover', () => {
    beforeEach(() => {
      mount(
        <Popover openOnHover>
          <PopoverTrigger>
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
          <PopoverTrigger>
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
          <PopoverTrigger>
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
          <PopoverTrigger>
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
      const id = 'first';
      return (
        <Popover trapFocus>
          <PopoverTrigger>
            <button>First nested trigger</button>
          </PopoverTrigger>

          <PopoverSurface aria-labelledby={id}>
            <button>First nested button</button>
            <PopoverL2 />
            <PopoverL2 />
          </PopoverSurface>
        </Popover>
      );
    };

    const PopoverL2 = () => {
      const id = 'second';
      return (
        <Popover trapFocus>
          <PopoverTrigger>
            <button>Second nested trigger</button>
          </PopoverTrigger>

          <PopoverSurface aria-labelledby={id}>
            <button>Second nested button</button>
          </PopoverSurface>
        </Popover>
      );
    };

    const Example = () => {
      return (
        <Popover trapFocus>
          <PopoverTrigger>
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
      // Open the whole stack of popovers
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
      cy.get('body').click('bottomRight').get(popoverInteractiveContentSelector).should('not.exist');
    });

    it('should not dismiss when clicking on nested content', () => {
      cy.contains('Second nested button').click().get(popoverInteractiveContentSelector).should('have.length', 3);
    });

    it('should dismiss child popovers when clicking on parents', () => {
      cy.contains('First nested button')
        .click()
        .get(popoverInteractiveContentSelector)
        .should('have.length', 2)
        .contains('Root button')
        .click()
        .get(popoverInteractiveContentSelector)
        .should('have.length', 1);
    });

    it('should when opening a sibling popover, should dismiss other sibling popover', () => {
      const secondNestedTriggerSelector = 'button:contains(Second nested trigger)';

      cy.get(secondNestedTriggerSelector)
        .eq(1)
        .click()
        .get(popoverInteractiveContentSelector)
        .should('have.length', 3)
        .get(secondNestedTriggerSelector)
        .eq(0)
        .click()
        .get(popoverInteractiveContentSelector)
        .should('have.length', 3);
    });

    it('should dismiss each popover in the stack with Escape keydown', () => {
      cy.focused().realPress('Escape');
      cy.get(popoverInteractiveContentSelector).should('have.length', 2);
      cy.focused().realPress('Escape');
      cy.get(popoverInteractiveContentSelector).should('have.length', 1);
      cy.focused().realPress('Escape');
      cy.get(popoverInteractiveContentSelector).should('not.exist');
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
          <PopoverTrigger>
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
              <PopoverTrigger>
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
  });
});
