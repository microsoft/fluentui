import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverBody,
  TeachingPopoverTitle,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselFooterButton,
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
  (['autoFocus', 'callback ref'] as const).forEach(source => {
    it(`tracks footer focus established by ${source} during mounting`, () => {
      const onFocus = cy.stub().as('onFocus');
      mount(
        <TeachingPopoverCarousel defaultValue="two">
          <TeachingPopoverCarouselCard value="one">First</TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselCard value="two">Second</TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselFooterButton
            navType="prev"
            altText={null}
            autoFocus={source === 'autoFocus'}
            ref={source === 'callback ref' ? button => button?.focus() : undefined}
            onFocus={onFocus}
            id="previous"
          >
            Previous
          </TeachingPopoverCarouselFooterButton>
          <TeachingPopoverCarouselFooterButton navType="next" altText="Got it" id="next">
            Next
          </TeachingPopoverCarouselFooterButton>
        </TeachingPopoverCarousel>,
      );

      cy.get('#previous').should('have.focus');
      cy.get('@onFocus').should('have.been.calledOnce');
      cy.get('#previous').realPress('Enter');
      cy.get('#previous').should('not.be.visible');
      cy.get('#next').should('have.focus');
    });
  });

  (['callback ref', 'key'] as const).forEach(change => {
    it(`transfers focus after the destination footer button's ${change} changes`, () => {
      const Example = () => {
        const [hidden, setHidden] = React.useState(false);
        const nextRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
        return (
          <TeachingPopoverCarousel value="one">
            <TeachingPopoverCarouselCard value="one">First</TeachingPopoverCarouselCard>
            <TeachingPopoverCarouselCard value="two">Second</TeachingPopoverCarouselCard>
            <TeachingPopoverCarouselFooterButton
              navType="prev"
              altText={hidden ? null : 'Start'}
              onClick={() => setHidden(true)}
              id="previous"
            >
              Previous
            </TeachingPopoverCarouselFooterButton>
            <TeachingPopoverCarouselFooterButton
              navType="next"
              altText="Got it"
              ref={
                change === 'callback ref'
                  ? button => {
                      nextRef.current = button;
                    }
                  : nextRef
              }
              key={change === 'key' && hidden ? 'after' : 'before'}
              id="next"
            >
              Next
            </TeachingPopoverCarouselFooterButton>
          </TeachingPopoverCarousel>
        );
      };
      mount(<Example />);

      cy.get('#previous').focus().realPress('Enter');
      cy.get('#previous').should('not.be.visible');
      cy.get('#next').should('have.focus');
    });
  });

  it('focuses Next when returning to the first page hides Previous', () => {
    mount(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverCarousel defaultValue="two">
            <TeachingPopoverCarouselCard value="one">First</TeachingPopoverCarouselCard>
            <TeachingPopoverCarouselCard value="two">Second</TeachingPopoverCarouselCard>
            <TeachingPopoverCarouselFooter
              initialStepText=""
              finalStepText="Got it"
              previous={{ navType: 'prev', altText: null, children: 'Previous', id: 'previous' }}
              next={{ navType: 'next', altText: 'Got it', children: 'Next', id: 'next' }}
            />
          </TeachingPopoverCarousel>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );
    cy.get('#previous').focus().realPress('Enter');
    cy.get('#previous').should('not.be.visible');
    cy.get('#next').should('have.focus');
  });

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
});
