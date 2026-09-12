import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselPageCount,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from './index';
import type { TeachingPopoverProps } from './index';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => mountBase(element);

const triggerSelector = '[aria-expanded]';
const surfaceSelector = '[role="group"]';

const FocusExample = ({
  controlled = false,
  initiallyOpen = false,
  withTrigger = true,
  trapFocus = false,
}: {
  controlled?: boolean;
  initiallyOpen?: boolean;
  withTrigger?: boolean;
  trapFocus?: boolean;
}) => {
  const [open, setOpen] = React.useState(initiallyOpen);
  const [value, setValue] = React.useState<string | undefined>('one');
  const surface = (
    <TeachingPopoverSurface key="surface">
      <TeachingPopoverHeader>Tour</TeachingPopoverHeader>
      <TeachingPopoverCarousel
        value={controlled ? value : undefined}
        defaultValue={controlled ? undefined : 'one'}
        onValueChange={(_, data) => setValue(data.value)}
        onFinish={() => {
          setValue('one');
          setOpen(false);
        }}
      >
        <TeachingPopoverCarouselCard value="one">Feature Step 1</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Feature Step 2</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter
          previous={{ navType: 'prev', altText: null, children: 'Previous', id: 'previous' }}
          next={{ navType: 'next', altText: 'Got it', children: 'Next', id: 'next' }}
        />
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  );
  return (
    <>
      <button data-testid="outside" onClick={() => setOpen(false)}>
        Outside
      </button>
      <TeachingPopover
        open={controlled ? open : undefined}
        defaultOpen={controlled ? undefined : initiallyOpen}
        trapFocus={trapFocus}
        onOpenChange={(_, data) => setOpen(data.open)}
      >
        {withTrigger
          ? [
              <TeachingPopoverTrigger key="trigger">
                <button>Open tour</button>
              </TeachingPopoverTrigger>,
              surface,
            ]
          : surface}
      </TeachingPopover>
    </>
  );
};

describe('TeachingPopover', () => {
  describe('focus management', () => {
    [false, true].forEach(controlled => {
      describe(controlled ? 'controlled' : 'uncontrolled', () => {
        it('moves focus to Next when Previous becomes hidden on the first step', () => {
          mount(<FocusExample controlled={controlled} initiallyOpen />);
          cy.get('#next').realClick();
          cy.get('#previous').focus().realPress('Enter');
          cy.contains('Feature Step 1').should('be.visible');
          cy.get('#previous').should('not.be.visible');
          cy.get('#next').should('have.focus');
        });

        [false, true].forEach(initiallyOpen => {
          (['finish', 'escape', 'dismiss'] as const).forEach(action => {
            it(`restores trigger focus on ${action} (initiallyOpen=${initiallyOpen})`, () => {
              mount(<FocusExample controlled={controlled} initiallyOpen={initiallyOpen} />);
              if (!initiallyOpen) {
                cy.get(triggerSelector).realClick();
              }
              cy.get('#next').should('be.visible').focus();
              if (action === 'finish') {
                cy.realPress('Enter');
                cy.get('#next').should('have.text', 'Got it').realPress('Enter');
              } else if (action === 'escape') {
                cy.realPress('Escape');
              } else {
                cy.get('[aria-label="dismiss"]').realClick();
              }
              cy.get(surfaceSelector).should('not.exist');
              cy.get(triggerSelector).should('have.focus');
            });
          });
        });
      });
    });

    it('restores the trigger after light dismissal of an initially open tour', () => {
      mount(<FocusExample controlled initiallyOpen />);
      cy.get('#next').focus();
      cy.get('body').realClick({ position: 'bottomRight' });
      cy.get(surfaceSelector).should('not.exist');
      cy.get(triggerSelector).should('have.focus');
    });

    it('preserves intentional outside focus on controlled close', () => {
      mount(<FocusExample controlled initiallyOpen />);
      cy.get('#next').focus();
      cy.get('[data-testid="outside"]').realClick();
      cy.get(surfaceSelector).should('not.exist');
      cy.get('[data-testid="outside"]').should('have.focus');
    });

    it('does not move focus on an initially closed mount', () => {
      mount(<FocusExample controlled />);
      cy.get(surfaceSelector).should('not.exist');
      cy.get(triggerSelector).should('not.have.focus');
    });

    it('can finish an initially open triggerless tour', () => {
      mount(<FocusExample controlled initiallyOpen withTrigger={false} />);
      cy.get('#next').realClick();
      cy.get('#next').realClick();
      cy.get(surfaceSelector).should('not.exist');
      cy.get('[data-testid="outside"]').should('not.have.focus');
    });

    (['escape', 'dismiss'] as const).forEach(action => {
      it(`restores trigger focus on modal ${action} when initially open`, () => {
        mount(<FocusExample controlled initiallyOpen trapFocus />);
        cy.get('[role="dialog"]').should('be.visible');
        if (action === 'escape') {
          cy.realPress('Escape');
        } else {
          cy.get('[aria-label="dismiss"]').realClick();
        }
        cy.get('[role="dialog"]').should('not.exist');
        cy.get(triggerSelector).should('have.focus');
      });
    });
  });

  (['uncontrolled', 'controlled'] as const).forEach(scenario => {
    const UncontrolledExample = () => (
      <TeachingPopover>
        <TeachingPopoverTrigger>
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
        <TeachingPopover open={open} onOpenChange={(_, data) => setOpen(data.open)}>
          <TeachingPopoverTrigger>
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
      });

      it('opens on trigger click', () => {
        cy.get(triggerSelector).realClick();
        cy.get(surfaceSelector).should('be.visible');
      });

      (['{enter}', 'Space'] as const).forEach(key => {
        it(`opens with ${key}`, () => {
          cy.get(triggerSelector).focus().realPress(key);
          cy.get(surfaceSelector).should('be.visible');
        });
      });

      it('dismisses on click outside', () => {
        cy.get(triggerSelector).realClick();
        cy.get(surfaceSelector).should('be.visible');
        cy.get('body').realClick({ position: 'bottomRight' });
        cy.get(surfaceSelector).should('not.exist');
      });

      it('dismisses on Escape keydown', () => {
        cy.get(triggerSelector).realClick();
        cy.get(surfaceSelector).should('be.visible');
        cy.realPress('Escape');
        cy.get(surfaceSelector).should('not.exist');
      });
    });
  });

  describe('updating content', () => {
    const Example = () => {
      const [visible, setVisible] = React.useState(false);
      const changeContent = () => setVisible(true);
      const onOpenChange: TeachingPopoverProps['onOpenChange'] = (_e, data) => {
        if (data.open === false) {
          setVisible(false);
        }
      };

      return (
        <TeachingPopover onOpenChange={onOpenChange}>
          <TeachingPopoverTrigger>
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

    it('does not close when inner content changes', () => {
      mount(<Example />);
      cy.get(triggerSelector).realClick();
      cy.get(surfaceSelector).within(() => {
        cy.contains('Action').realClick();
      });
      cy.get(surfaceSelector).should('be.visible').contains('The second panel');
    });
  });

  describe('carousel integration', () => {
    const PAGES = ['intro', 'features', 'wrap-up'] as const;

    const CarouselExample = () => (
      <TeachingPopover>
        <TeachingPopoverTrigger>
          <button>Open tour</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverCarousel defaultValue={PAGES[0]}>
            <TeachingPopoverCarouselCard value="intro">
              <TeachingPopoverBody>
                <TeachingPopoverTitle>Welcome</TeachingPopoverTitle>
                <div>Intro content</div>
              </TeachingPopoverBody>
            </TeachingPopoverCarouselCard>

            <TeachingPopoverCarouselCard value="features">
              <TeachingPopoverBody>
                <TeachingPopoverTitle>Features</TeachingPopoverTitle>
                <div>Features content</div>
              </TeachingPopoverBody>
            </TeachingPopoverCarouselCard>

            <TeachingPopoverCarouselCard value="wrap-up">
              <TeachingPopoverBody>
                <TeachingPopoverTitle>Wrap up</TeachingPopoverTitle>
                <div>Wrap-up content</div>
              </TeachingPopoverBody>
            </TeachingPopoverCarouselCard>

            <TeachingPopoverCarouselFooter
              previous={{ navType: 'prev', altText: 'Back', children: 'Back' }}
              next={{ navType: 'next', altText: 'Done', children: 'Next' }}
            >
              <TeachingPopoverCarouselPageCount>
                {(current, total) => (
                  <span data-testid="page-count">
                    {current} / {total}
                  </span>
                )}
              </TeachingPopoverCarouselPageCount>
            </TeachingPopoverCarouselFooter>
          </TeachingPopoverCarousel>
        </TeachingPopoverSurface>
      </TeachingPopover>
    );

    it('advances pages via the next button and updates the page count', () => {
      mount(<CarouselExample />);
      cy.get(triggerSelector).realClick();
      cy.get(surfaceSelector).should('be.visible');

      cy.get('[data-testid="page-count"]').should('have.text', '1 / 3');
      cy.contains('Welcome').should('be.visible');

      cy.contains('button', 'Next').realClick();
      cy.contains('Features').should('be.visible');
      cy.get('[data-testid="page-count"]').should('have.text', '2 / 3');

      cy.contains('button', 'Next').realClick();
      cy.contains('Wrap up').should('be.visible');
      cy.get('[data-testid="page-count"]').should('have.text', '3 / 3');
    });

    it('goes back via the previous button', () => {
      mount(<CarouselExample />);
      cy.get(triggerSelector).realClick();
      cy.contains('button', 'Next').realClick();
      cy.contains('Features').should('be.visible');

      cy.contains('button', 'Back').realClick();
      cy.contains('Welcome').should('be.visible');
      cy.get('[data-testid="page-count"]').should('have.text', '1 / 3');
    });

    it('closes the popover when next is pressed on the final page', () => {
      mount(<CarouselExample />);
      cy.get(triggerSelector).realClick();
      cy.contains('button', 'Next').realClick();
      cy.contains('button', 'Next').realClick();
      // On the trailing page the next button renders `altText` ("Done") instead of "Next".
      cy.contains('button', 'Done').realClick();
      cy.get(surfaceSelector).should('not.exist');
    });
  });
});
