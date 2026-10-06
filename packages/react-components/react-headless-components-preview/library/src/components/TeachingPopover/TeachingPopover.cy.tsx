import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselPageCount,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from './index';
import type { TeachingPopoverProps } from './index';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => mountBase(element);

const triggerSelector = '[aria-expanded]';
const surfaceSelector = '[role="group"]';

describe('TeachingPopover', () => {
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
        cy.get(triggerSelector).should('have.focus');
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

  describe('initially open controlled tour', () => {
    const Example = ({
      trapFocus = false,
      redirectFocus = false,
    }: {
      trapFocus?: boolean;
      redirectFocus?: boolean;
    }) => {
      const [open, setOpen] = React.useState(true);
      const [value, setValue] = React.useState('one');
      const outsideRef = React.useRef<HTMLButtonElement>(null);

      return (
        <>
          <button ref={outsideRef}>Outside</button>
          <TeachingPopover
            open={open}
            trapFocus={trapFocus}
            onOpenChange={(_, data) => {
              setOpen(data.open);
              if (data.open) {
                setValue('one');
              }
            }}
          >
            <TeachingPopoverTrigger>
              <button>Start feature tour</button>
            </TeachingPopoverTrigger>
            <TeachingPopoverSurface aria-label="Feature tour" role="dialog">
              <button autoFocus>Tour help</button>
              <TeachingPopoverCarousel
                value={value}
                onValueChange={(_, data) => {
                  if (data.value) {
                    setValue(data.value);
                  }
                }}
                onFinish={() => {
                  setValue('one');
                  setOpen(false);
                  if (redirectFocus) {
                    outsideRef.current?.focus();
                  }
                }}
              >
                {['one', 'two', 'three'].map(page => (
                  <TeachingPopoverCarouselCard key={page} value={page}>
                    Feature step {page}
                  </TeachingPopoverCarouselCard>
                ))}
                <TeachingPopoverCarouselFooter
                  previous={{ navType: 'prev', children: 'Previous', altText: null }}
                  next={{ navType: 'next', children: 'Next', altText: 'Got it' }}
                />
              </TeachingPopoverCarousel>
            </TeachingPopoverSurface>
          </TeachingPopover>
        </>
      );
    };

    ([false, true] as const).forEach(trapFocus => {
      describe(trapFocus ? 'modal' : 'non-modal', () => {
        beforeEach(() => mount(<Example trapFocus={trapFocus} />));

        it('restores trigger focus after Got it closes the tour and resets its value', () => {
          cy.contains('button', 'Tour help').should('have.focus');
          cy.contains('button', 'Next').focus().realPress('Enter');
          cy.contains('button', 'Next').should('have.focus').realPress('Enter');
          cy.contains('button', 'Got it').should('have.focus').realPress('Enter');
          cy.get('[aria-label="Feature tour"]').should('not.exist');
          cy.get(triggerSelector).should('have.focus');
          cy.focused().realPress('Enter');
          cy.get('[aria-label="Feature tour"]').should('be.visible');
          cy.get('[data-carousel-item="one"]').should('not.have.attr', 'hidden');
        });

        it('restores trigger focus after Escape dismisses the tour', () => {
          cy.contains('button', 'Tour help').should('have.focus').realPress('Escape');
          cy.get('[aria-label="Feature tour"]').should('not.exist');
          cy.get(triggerSelector).should('have.focus');
        });
      });
    });

    it('preserves intentional focus movement on finish', () => {
      mount(<Example redirectFocus />);
      cy.contains('button', 'Next').focus().realPress('Enter');
      cy.contains('button', 'Next').realPress('Enter');
      cy.contains('button', 'Got it').realPress('Enter');
      cy.get('[aria-label="Feature tour"]').should('not.exist');
      cy.contains('button', 'Outside').should('have.focus');
    });
  });
});
