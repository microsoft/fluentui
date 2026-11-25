import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme, webLightTheme, webDarkTheme } from '@fluentui/react-theme';

import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverBody,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
} from '@fluentui/react-teaching-popover';
import type { TeachingPopoverProps } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const triggerSelector = '[aria-expanded]';
// TeachingPopover defaults to `trapFocus: true`, so the surface is rendered with role="dialog".
const surfaceSelector = '[role="dialog"]';

describe('TeachingPopover', () => {
  (['uncontrolled', 'controlled'] as const).forEach(scenario => {
    const UncontrolledExample = () => (
      <TeachingPopover>
        <TeachingPopoverTrigger disableButtonEnhancement>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverBody>
            <TeachingPopoverTitle>Title</TeachingPopoverTitle>
            <div>This is a teaching popover</div>
          </TeachingPopoverBody>
        </TeachingPopoverSurface>
      </TeachingPopover>
    );

    const ControlledExample = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <TeachingPopover open={open} onOpenChange={(e, data) => setOpen(data.open)}>
          <TeachingPopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            <TeachingPopoverBody>
              <TeachingPopoverTitle>Title</TeachingPopoverTitle>
              <div>This is a teaching popover</div>
            </TeachingPopoverBody>
          </TeachingPopoverSurface>
        </TeachingPopover>
      );
    };

    describe(scenario, () => {
      const Example = scenario === 'controlled' ? ControlledExample : UncontrolledExample;

      beforeEach(() => {
        mount(<Example />);
        cy.get('body').click('bottomRight');
      });

      it('should open when clicked', () => {
        cy.get(triggerSelector).click().get(surfaceSelector).should('be.visible');
      });

      (['{enter}', 'Space'] as const).forEach(key => {
        it(`should open with ${key}`, () => {
          cy.get(triggerSelector).focus().realPress(key);
          cy.get(surfaceSelector).should('be.visible');
        });
      });

      it('should dismiss on click outside', () => {
        cy.get(triggerSelector).click().get('body').click('bottomRight').get(surfaceSelector).should('not.exist');
      });

      it('should dismiss on Escape keydown', () => {
        cy.get(triggerSelector).click().realPress('Escape');
        cy.get(surfaceSelector).should('not.exist');
      });
    });
  });

  describe('focus trap default', () => {
    it('should trap focus by default', () => {
      mount(
        <TeachingPopover>
          <TeachingPopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            <button>One</button>
            <button>Two</button>
          </TeachingPopoverSurface>
        </TeachingPopover>,
      );

      cy.get(triggerSelector).focus().realPress('Enter');

      cy.contains('One').should('have.focus').realPress('Tab');
      cy.contains('Two').should('have.focus').realPress('Tab');
      cy.contains('One').should('have.focus');
    });
  });

  describe('updating content', () => {
    const Example = () => {
      const [visible, setVisible] = React.useState(false);
      const changeContent = () => setVisible(true);
      const onOpenChange: TeachingPopoverProps['onOpenChange'] = (e, data) => {
        if (data.open === false) {
          setVisible(false);
        }
      };

      return (
        <TeachingPopover onOpenChange={onOpenChange}>
          <TeachingPopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            {visible ? (
              <div>The second panel</div>
            ) : (
              <div>
                <button onClick={changeContent}>Action</button>
              </div>
            )}
          </TeachingPopoverSurface>
        </TeachingPopover>
      );
    };

    it('should not close when inner content changes', () => {
      mount(<Example />);
      cy.get(triggerSelector)
        .click()
        .get(surfaceSelector)
        .within(() => {
          cy.contains('Action').click();
        })
        .get(surfaceSelector)
        .should('exist')
        .contains('The second panel');
    });
  });

  describe('TeachingPopover dismiss button borders', () => {
    const setMedia = (features: { name: string; value: string }[]) =>
      cy.then(() =>
        Cypress.automation('remote:debugger:protocol', {
          command: 'Emulation.setEmulatedMedia',
          params: { features },
        }),
      );

    const assertBorders = ($button: JQuery<HTMLElement>) => {
      for (const side of ['top', 'right', 'bottom', 'left']) {
        expect($button.css(`border-${side}-style`), `${side} border style`).to.equal('solid');
        expect($button.css(`border-${side}-width`), `${side} border width`).to.equal('1px');
        expect($button.css(`border-${side}-color`), `${side} border color`).to.equal($button.css('border-top-color'));
      }
    };

    afterEach(() => setMedia([]));

    for (const colorScheme of ['light', 'dark'] as const) {
      for (const forcedColors of ['active', 'none'] as const) {
        for (const kind of ['Header', 'Title'] as const) {
          it(`preserves ${kind} dismiss borders and focus in ${colorScheme} with forced colors ${forcedColors}`, () => {
            setMedia([
              { name: 'forced-colors', value: forcedColors },
              { name: 'prefers-color-scheme', value: colorScheme },
              { name: 'prefers-reduced-motion', value: 'reduce' },
            ]);
            mountBase(
              <FluentProvider theme={colorScheme === 'light' ? webLightTheme : webDarkTheme}>
                <TeachingPopover open inline trapFocus={false}>
                  <TeachingPopoverTrigger disableButtonEnhancement>
                    <button>Trigger</button>
                  </TeachingPopoverTrigger>
                  <TeachingPopoverSurface>
                    {kind === 'Header' && <TeachingPopoverHeader>Tips</TeachingPopoverHeader>}
                    <TeachingPopoverBody>
                      <TeachingPopoverTitle dismissButton={kind === 'Title' ? {} : undefined}>
                        Title
                      </TeachingPopoverTitle>
                      This is a teaching popover
                    </TeachingPopoverBody>
                  </TeachingPopoverSurface>
                </TeachingPopover>
              </FluentProvider>,
            );
            cy.window().then(win => {
              expect(win.matchMedia('(forced-colors: active)').matches).to.equal(forcedColors === 'active');
            });

            const dismissSelector = `.fui-TeachingPopover${kind}__dismissButton`;
            cy.get('body').click('bottomRight');
            cy.get(dismissSelector).should($button => {
              assertBorders($button);
              if (forcedColors === 'none') {
                expect($button.css('border-right-color')).to.equal('rgba(0, 0, 0, 0)');
              } else {
                expect($button.css('border-right-color')).not.to.equal($button.css('background-color'));
              }
            });
            cy.get(dismissSelector).realHover().should(assertBorders);
            cy.get(triggerSelector).focus().realPress('Tab');
            cy.get(dismissSelector)
              .should('have.focus')
              .should($button => {
                expect($button).to.have.attr('data-fui-focus-visible');
                assertBorders($button);
                expect($button.css('outline-style')).to.equal('solid');
                expect($button.css('outline-width')).to.equal('2px');
              });
          });
        }
      }
    }
  });
});
