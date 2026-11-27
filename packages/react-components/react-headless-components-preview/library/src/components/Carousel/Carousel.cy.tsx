import * as React from 'react';
import { createPortal, flushSync } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { SlotRenderFunction } from '@fluentui/react-utilities';
import { Carousel } from './Carousel';
import type { CarouselProps, CarouselTransition } from './Carousel.types';
import { CarouselViewport } from './CarouselViewport';
import { CarouselCard } from './CarouselCard';
import { CarouselPrevious } from './CarouselPrevious';
import { CarouselNext } from './CarouselNext';
import { CarouselNav } from './CarouselNav';
import { CarouselNavButton } from './CarouselNavButton';
import { CarouselAutoplayButton } from './CarouselAutoplayButton';
import { CarouselDirectionTooltip } from './CarouselDirectionButton/CarouselDirectionTooltip';
import { Tooltip } from '../Tooltip';

const transition: CarouselTransition = ({ incoming, outgoing }) => [
  incoming.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 }),
  outgoing.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100 }),
];

const freezeWhenReady = (target: HTMLElement): Animation => {
  const animation = target.animate([], 60000);
  animation.updatePlaybackRate(0);
  return animation;
};

const setReducedMotionPreference = (value?: 'no-preference' | 'reduce') =>
  cy.then(() =>
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: value ? [{ name: 'prefers-reduced-motion', value }] : [] },
    }),
  );

describe('Carousel browser behavior', () => {
  let styles: string;
  beforeEach(() => setReducedMotionPreference('no-preference'));
  afterEach(() => setReducedMotionPreference());

  before(() => {
    const storiesRoot = Cypress.spec.absolute.replace(/[/\\]library[/\\]src[/\\].*$/, '/stories');
    cy.readFile(`${storiesRoot}/.storybook/tokens.css`).then(tokens => {
      cy.readFile(`${storiesRoot}/src/Carousel/carousel.module.css`).then(css => {
        styles = `${tokens}\n${css}`;
      });
    });
  });
  const renderCarousel = ({ autoplay = false, ...props }: Partial<CarouselProps> & { autoplay?: boolean } = {}) =>
    mount(
      <div className="example">
        <style>{styles}</style>
        <button>Before</button>
        <Carousel
          id="lessons"
          aria-label="Lessons"
          groupSize={2}
          className="carousel"
          transition={transition}
          {...props}
        >
          {autoplay && <CarouselAutoplayButton className="button playback" />}
          <CarouselPrevious button={{ className: 'button', icon: '<' }} tooltip={{ className: 'tooltip' }} />
          <CarouselViewport className="viewport">
            {[1, 2, 3, 4, 5].map(index => (
              <CarouselCard key={index}>
                <button>Action {index}</button>
              </CarouselCard>
            ))}
          </CarouselViewport>
          <CarouselNext
            button={{ className: 'button', icon: { children: '›', 'aria-hidden': true } }}
            tooltip={{ className: 'tooltip' }}
          />
          <CarouselNav />
        </Carousel>
        <button>After</button>
      </div>,
    );

  it('keeps inactive actions out of Tab order and recovers boundary focus after motion', () => {
    renderCarousel();
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.get('[aria-label="Slide 1 of 5"]').should('be.focused').realPress('Tab');
    cy.contains('button', 'Action 1').should('be.focused').realPress('Tab');
    cy.get('[aria-label="Slide 2 of 5"]').should('be.focused').realPress('Tab');
    cy.contains('button', 'Action 2').should('be.focused').realPress('Tab');
    cy.get('[data-carousel-action="next"]').should('be.focused').realPress('Enter');
    cy.get('[aria-busy="false"]').should('exist');
    cy.get('[data-carousel-action="next"]').should('be.focused').realPress('Enter');
    cy.get('[data-carousel-button="next"]').should('have.attr', 'hidden');
    cy.get('[data-carousel-button="next"]').should('have.attr', 'inert');
    cy.get('[aria-label="Slide 5 of 5"]').should('be.focused').realPress('Tab');
    cy.contains('button', 'Action 5').should('be.focused').realPress('Tab');
    cy.get('[aria-selected="true"]').should('be.focused').realPress('Home');
    cy.get('[role="tab"]').first().should('be.focused').and('have.attr', 'aria-selected', 'true');
  });

  it('mirrors nav keys and retains button width in RTL', () => {
    renderCarousel({ dir: 'rtl' });
    cy.get('[data-carousel-button="next"] [aria-hidden="true"]').should(
      'have.css',
      'transform',
      'matrix(-1, 0, 0, 1, 0, 0)',
    );
    cy.get('.viewport').then(viewports => {
      const { x, width, height } = viewports[0].getBoundingClientRect();
      cy.get('[aria-selected="true"]').focus().realPress('ArrowLeft');
      cy.get('[role="tab"]').eq(1).should('be.focused').and('have.attr', 'aria-selected', 'true');
      cy.get('[aria-busy="false"]').should('exist');
      cy.get('[aria-selected="true"]').realPress('End');
      cy.get('[role="tab"]').last().should('be.focused').and('have.attr', 'aria-selected', 'true');
      cy.get('[aria-busy="false"]').should('exist');
      cy.get('.viewport').should(next => {
        const rect = next[0].getBoundingClientRect();
        expect(rect.x).to.equal(x);
        expect(rect.width).to.equal(width);
        expect(rect.height).to.equal(height);
      });
    });
  });

  it('mirrors chevrons, nav keys and transitions according to the nearest direction', () => {
    const dirs: string[] = [];
    const record: CarouselTransition = data => {
      dirs.push(data.dir);
      return [];
    };
    renderCarousel({ transition: record });
    cy.get('.example').invoke('attr', 'dir', 'rtl');
    cy.get('[role="region"]').should('not.have.attr', 'dir');
    const glyph = '[data-carousel-button="next"] [aria-hidden="true"]';
    cy.get(glyph).should('have.css', 'transform', 'matrix(-1, 0, 0, 1, 0, 0)');
    cy.get('[aria-selected="true"]').focus().realPress('ArrowLeft');
    cy.get('[role="tab"]').eq(1).should('be.focused').and('have.attr', 'aria-selected', 'true');
    cy.wrap(dirs).should('deep.equal', ['rtl']);
    cy.get('.carousel').invoke('attr', 'dir', 'ltr');
    cy.get(glyph).should('have.css', 'transform', 'none');
    cy.get('[aria-selected="true"]').realPress('ArrowLeft');
    cy.get('[role="tab"]').first().should('be.focused').and('have.attr', 'aria-selected', 'true');
    cy.wrap(dirs).should('deep.equal', ['rtl', 'ltr']);
  });

  it('shows tooltips immediately on focus and dismisses Escape without moving focus', () => {
    renderCarousel();
    cy.get('[data-carousel-action="next"]').focus();
    cy.get('#lessons-next-label').should('be.visible');
    cy.get('[data-carousel-action="next"]').realPress('Escape');
    cy.get('[data-carousel-action="next"]').should('be.focused');
    cy.get('#lessons-next-label').should('not.be.visible');
    cy.get('[data-carousel-action="next"]').should('have.attr', 'aria-labelledby', 'lessons-next-label');
    cy.get('[data-carousel-action="next"]').should('not.have.attr', 'aria-label');
    cy.get('[data-carousel-action="next"]').should('not.have.attr', 'aria-describedby');
  });

  it('keeps the fallback tooltip beside its focused arrow after a sibling reflows', () => {
    let originalInsets: string[];
    cy.window().then(win => {
      const supports = win.CSS.supports.bind(win.CSS);
      cy.stub(win.CSS, 'supports').callsFake((...args: [string]) =>
        args[0] === 'position-area: self-inline-start' ? false : supports(...args),
      );
    });
    renderCarousel();
    cy.get('#lessons-next-label').then(label => {
      originalInsets = [label[0].style.left, label[0].style.top];
    });
    cy.get('[data-carousel-action="next"]')
      .focus()
      .then(button => {
        const before = button[0].getBoundingClientRect();
        const assertPlacement = () =>
          cy.get('#lessons-next-label').should(label => {
            const arrow = button[0].getBoundingClientRect();
            const tip = label[0].getBoundingClientRect();
            expect(label[0].style.left).to.equal(`${arrow.right}px`);
            expect(tip.left).to.be.closeTo(arrow.right, 1);
            expect(tip.top + tip.height / 2).to.be.closeTo(arrow.top + arrow.height / 2, 1);
          });
        assertPlacement();
        cy.contains('button', 'Before').then(sibling => {
          sibling[0].style.height = `${before.height + 80}px`;
        });
        cy.wrap(button).should(el => expect(el[0].getBoundingClientRect().top).to.be.greaterThan(before.top));
        assertPlacement();
      });
    cy.get('[data-carousel-action="next"]').realPress('Escape');
    cy.get('#lessons-next-label').should(label => {
      expect([label[0].style.left, label[0].style.top]).to.deep.equal(originalInsets);
    });
  });

  for (const native of [true, false]) {
    it(`keeps ${native ? 'anchored' : 'fallback'} arrow tooltips within the viewport edges`, () => {
      if (!native) {
        cy.window().then(win => {
          const supports = win.CSS.supports.bind(win.CSS);
          cy.stub(win.CSS, 'supports').callsFake((...args: [string]) =>
            args[0] === 'position-area: self-inline-start' ? false : supports(...args),
          );
        });
      }
      mount(
        <div style={{ position: 'fixed', insetInline: 0, top: 100, display: 'flex', justifyContent: 'space-between' }}>
          <style>{styles}</style>
          <Carousel aria-label="Lessons" circular style={{ display: 'contents' }}>
            <CarouselPrevious button={{ icon: '<' }} tooltip={{ className: 'tooltip', children: 'Previous lesson' }} />
            <CarouselViewport>{['First', 'Second']}</CarouselViewport>
            <CarouselNext button={{ icon: '>' }} tooltip={{ className: 'tooltip', children: 'Next lesson' }} />
          </Carousel>
        </div>,
      );
      for (const kind of ['previous', 'next']) {
        cy.get(`[data-carousel-action="${kind}"]`)
          .focus()
          .then(button => {
            cy.contains('[role="tooltip"]', `${kind === 'next' ? 'Next' : 'Previous'} lesson`).should(tip => {
              const { clientWidth } = tip[0].ownerDocument.documentElement;
              const arrow = button[0].getBoundingClientRect();
              const box = tip[0].getBoundingClientRect();
              expect(box.width).to.be.greaterThan(kind === 'previous' ? arrow.left : clientWidth - arrow.right);
              expect(box.left).to.be.at.least(0);
              expect(box.right).to.be.at.most(clientWidth);
              // Flipped to the side with room rather than covering its arrow.
              if (kind === 'previous') {
                expect(box.left).to.be.closeTo(arrow.right, 1);
              } else {
                expect(box.right).to.be.closeTo(arrow.left, 1);
              }
            });
          });
      }
    });
  }

  const useFallbackPositioning = () =>
    cy.window().then(win => {
      const supports = win.CSS.supports.bind(win.CSS);
      cy.stub(win.CSS, 'supports').callsFake((...args: [string]) =>
        args[0] === 'position-area: self-inline-start' ? false : supports(...args),
      );
    });
  // The tooltip box must stay in the viewport, leave its arrow uncovered and sit against it on the reported side.
  const expectTooltipBeside = (button: HTMLElement, label: string, placement: string) =>
    cy.contains('[role="tooltip"]', label).should(tip => {
      const doc = tip[0].ownerDocument;
      const { clientWidth, clientHeight } = doc.documentElement;
      const arrow = button.getBoundingClientRect();
      const box = tip[0].getBoundingClientRect();
      expect(tip[0]).to.have.attr('data-placement', placement);
      expect(box.left).to.be.at.least(-0.5);
      expect(box.top).to.be.at.least(-0.5);
      expect(box.right).to.be.at.most(clientWidth + 0.5);
      expect(box.bottom).to.be.at.most(clientHeight + 0.5);
      expect(
        button.contains(doc.elementFromPoint(arrow.left + arrow.width / 2, arrow.top + arrow.height / 2)),
      ).to.equal(true);
      const rtl = getComputedStyle(button).direction === 'rtl';
      const edges = {
        before: () => expect(rtl ? box.left : box.right).to.be.closeTo(rtl ? arrow.right : arrow.left, 1),
        after: () => expect(rtl ? box.right : box.left).to.be.closeTo(rtl ? arrow.left : arrow.right, 1),
        below: () => expect(box.top).to.be.closeTo(arrow.bottom, 1),
        above: () => expect(box.bottom).to.be.closeTo(arrow.top, 1),
      };
      edges[placement as keyof typeof edges]();
    });

  for (const native of [true, false]) {
    const kind = native ? 'anchored' : 'fallback';
    it(`re-places the ${kind} tooltip when a sibling reflow moves its arrow to the edge`, () => {
      if (!native) {
        useFallbackPositioning();
      }
      mount(
        <div style={{ position: 'fixed', insetInline: 0, top: 100, display: 'flex' }}>
          <style>{styles}</style>
          <Carousel aria-label="Lessons" circular style={{ display: 'contents' }}>
            <div id="spacer" style={{ flex: '0 0 0px' }} />
            <CarouselNext button={{ icon: '>' }} tooltip={{ className: 'tooltip', children: 'Next lesson' }} />
            <CarouselViewport style={{ flex: 1 }}>{['First', 'Second']}</CarouselViewport>
          </Carousel>
        </div>,
      );
      cy.get('[data-carousel-action="next"]')
        .focus()
        .then(button => {
          expectTooltipBeside(button[0], 'Next lesson', 'after');
          cy.get('#spacer').then(spacer => {
            spacer[0].style.flexBasis = `calc(100% - ${button[0].getBoundingClientRect().width}px)`;
          });
          expectTooltipBeside(button[0], 'Next lesson', 'before');
        });
    });

    it(`re-places the ${kind} tooltip when only the direction changes`, () => {
      if (!native) {
        useFallbackPositioning();
      }
      mount(
        <div id="host" style={{ position: 'fixed', insetInline: 0, top: 100, display: 'flex' }}>
          <style>{styles}</style>
          <Carousel aria-label="Lessons" circular style={{ display: 'contents' }}>
            <CarouselPrevious button={{ icon: '<' }} tooltip={{ className: 'tooltip', children: 'Previous lesson' }} />
            <CarouselViewport style={{ flex: 1 }}>{['First', 'Second']}</CarouselViewport>
          </Carousel>
        </div>,
      );
      cy.get('[data-carousel-action="previous"]')
        .focus()
        .then(button => {
          expectTooltipBeside(button[0], 'Previous lesson', 'after');
          // The arrow stays at the left edge, where the inline start side now has room.
          cy.get('#host').then(host => {
            host[0].dir = 'rtl';
            host[0].style.justifyContent = 'flex-end';
            host[0].style.flexDirection = 'row-reverse';
          });
          cy.wrap(button).should(el => expect(el[0].getBoundingClientRect().left).to.be.closeTo(0, 1));
          expectTooltipBeside(button[0], 'Previous lesson', 'before');
        });
    });

    for (const dir of ['ltr', 'rtl'] as const) {
      it(`moves a ${kind} ${dir} tooltip below or above its arrow when neither side has room`, () => {
        if (!native) {
          useFallbackPositioning();
        }
        const label = 'Previous lesson, too long for a side';
        let atBottom: () => void;
        const Layout = () => {
          const [bottom, setBottom] = React.useState(false);
          atBottom = () => setBottom(true);
          return (
            <div
              dir={dir}
              style={{
                position: 'fixed',
                insetInline: 0,
                ...(bottom ? { bottom: 0 } : { top: 100 }),
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <style>{`${styles}\n.wide { white-space: nowrap; max-width: none; }`}</style>
              <Carousel aria-label="Lessons" circular style={{ display: 'contents' }}>
                <CarouselPrevious button={{ icon: '<' }} tooltip={{ className: 'tooltip wide', children: label }} />
                <CarouselViewport style={{ display: 'none' }}>{['First', 'Second']}</CarouselViewport>
              </Carousel>
            </div>
          );
        };
        cy.viewport(320, 400);
        mount(<Layout />);
        cy.get('[data-carousel-action="previous"]')
          .focus()
          .then(button => {
            cy.contains('[role="tooltip"]', label).should(tip => {
              expect(tip[0].getBoundingClientRect().width).to.be.greaterThan(160);
            });
            expectTooltipBeside(button[0], label, 'below');
            cy.then(() => atBottom());
            expectTooltipBeside(button[0], label, 'above');
          });
      });
    }
  }

  it('opens the tooltip and calls onFocus once when the Next button mounts with autoFocus', () => {
    const onFocus = cy.stub();
    mount(
      <Carousel aria-label="Lessons">
        <CarouselPrevious />
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <CarouselNext button={{ autoFocus: true, onFocus }} />
      </Carousel>,
    );
    cy.get('[data-carousel-action="next"]').should('be.focused');
    cy.contains('[role="tooltip"]', 'Next').should('be.visible');
    cy.wrap(onFocus).should('have.been.calledOnce');
  });

  it('honors tab autofocus once when a complete nav mounts on an existing carousel', () => {
    const onFocus = cy.stub();
    let updateNav: (nav: { disabled?: boolean; hidden?: boolean }) => void;
    const Collection = () => {
      const [nav, setNav] = React.useState<{ disabled?: boolean; hidden?: boolean }>();
      updateNav = setNav;
      return (
        <>
          <button>Outside</button>
          <Carousel aria-label="Lessons">
            <CarouselViewport>{['First', 'Second']}</CarouselViewport>
            {nav && (
              <CarouselNav hidden={nav.hidden}>
                {i => <CarouselNavButton autoFocus={i === 0} onFocus={onFocus} disabled={i === 1 && nav.disabled} />}
              </CarouselNav>
            )}
          </Carousel>
        </>
      );
    };
    mount(<Collection />);
    cy.contains('button', 'Outside').focus();
    cy.then(() => updateNav({}));
    cy.get('[role="tablist"] [role="tab"]').first().should('be.focused');
    cy.wrap(onFocus).should('have.been.calledOnce');

    cy.contains('button', 'Outside').focus();
    cy.then(() => updateNav({}));
    cy.contains('button', 'Outside').should('be.focused');
    cy.then(() => updateNav({ disabled: true }));
    cy.get('[role="tablist"]').should('not.exist');
    cy.then(() => updateNav({}));
    cy.get('[role="tablist"]').should('be.visible');
    cy.then(() => updateNav({ hidden: true }));
    cy.get('[role="tab"]').should('not.exist');
    cy.then(() => updateNav({}));
    cy.get('[role="tablist"]').should('be.visible');
    cy.contains('button', 'Outside').should('be.focused');
    cy.wrap(onFocus).should('have.been.calledOnce');
  });

  it('calls the nav root focus callbacks for tab autofocus on mount', () => {
    const onFocus = cy.stub();
    const onBlur = cy.stub();
    mount(
      <>
        <Carousel aria-label="Lessons">
          <CarouselViewport>{['First', 'Second']}</CarouselViewport>
          <CarouselNav onFocus={onFocus} onBlur={onBlur}>
            {i => <CarouselNavButton autoFocus={i === 0} />}
          </CarouselNav>
        </Carousel>
        <button>After</button>
      </>,
    );
    cy.get('[role="tab"]').first().should('be.focused');
    cy.wrap(onFocus).should('have.been.calledOnce');
    cy.contains('button', 'After').focus();
    cy.wrap(onBlur).should('have.been.calledOnce');
  });

  for (const unavailable of ['hidden', 'inert', 'aria-disabled', 'single page'] as const) {
    it(`moves focus from a nav removed as ${unavailable} into the selected group`, () => {
      let retire: () => void;
      const Collection = () => {
        const [retired, setRetired] = React.useState(false);
        retire = () => setRetired(true);
        const flag = retired && unavailable !== 'single page' ? { [unavailable]: true } : {};
        return (
          <>
            <button>Outside</button>
            <Carousel aria-label="Lessons" circular>
              <CarouselPrevious />
              <CarouselViewport>
                <CarouselCard>First</CarouselCard>
                {!(retired && unavailable === 'single page') && <CarouselCard>Second</CarouselCard>}
              </CarouselViewport>
              <CarouselNext />
              <CarouselNav {...flag} />
            </Carousel>
          </>
        );
      };
      mount(<Collection />);
      cy.get('[role="tab"]').first().focus().should('be.focused');
      cy.then(() => retire());
      cy.get('[role="tablist"]').should('not.exist');
      cy.get('[aria-label^="Slide 1 of"]').should('be.focused');
      cy.get('[role="tab"]').should('not.exist');
    });
  }

  it('keeps an incomplete flex tablist hidden and out of focus order until its tabs are operable', () => {
    const onFocus = cy.stub();
    let enableTabs: () => void;
    const Collection = () => {
      const [disabled, setDisabled] = React.useState(true);
      enableTabs = () => setDisabled(false);
      return (
        <>
          <button>Before</button>
          <Carousel aria-label="Lessons">
            <CarouselViewport>{['First', 'Second']}</CarouselViewport>
            <CarouselNav style={{ display: 'flex' }}>
              {index => (
                <CarouselNavButton autoFocus={index === 0} onFocus={onFocus} disabled={disabled && index === 1} />
              )}
            </CarouselNav>
          </Carousel>
          <button>After</button>
        </>
      );
    };
    mount(<Collection />);
    cy.get('[role="tablist"]').should('not.exist');
    cy.get('[role="tab"]')
      .first()
      .should('not.be.visible')
      .closest('[inert]')
      .should('have.attr', 'aria-hidden', 'true');
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.contains('button', 'After').should('be.focused');
    cy.get('[role="tab"]')
      .first()
      .then(tab => tab[0].focus());
    cy.contains('button', 'After').should('be.focused');
    cy.contains('[data-carousel-page]', 'Second').should('be.visible');
    cy.then(() => enableTabs());
    cy.get('[role="tablist"]').should('be.visible').and('have.css', 'display', 'flex');
    cy.contains('button', 'After').should('be.focused');
    cy.wrap(onFocus).should('not.have.been.called');
    cy.get('[role="tab"]').last().click().should('have.attr', 'aria-selected', 'true');
    cy.contains('[role="tabpanel"]', 'Second').should('be.visible');
  });

  it('moves focus from a nav that becomes incomplete into the selected group, leaving outside focus alone', () => {
    let disable: (index: number | undefined) => void;
    const Collection = () => {
      const [disabled, setDisabled] = React.useState<number>();
      disable = setDisabled;
      return (
        <>
          <button>Outside</button>
          <Carousel aria-label="Lessons" defaultActiveIndex={1}>
            <CarouselPrevious />
            <CarouselViewport>
              <CarouselCard>First</CarouselCard>
              <CarouselCard>Second</CarouselCard>
              <CarouselCard>Third</CarouselCard>
            </CarouselViewport>
            <CarouselNext />
            <CarouselNav>{i => <CarouselNavButton disabled={i === disabled} />}</CarouselNav>
          </Carousel>
        </>
      );
    };
    mount(<Collection />);
    cy.get('[role="tab"]').first().focus().should('be.focused');
    cy.then(() => disable(2));
    cy.get('[role="tablist"]').should('not.exist');
    cy.get('[aria-label="Slide 2 of 3"]').should('be.focused');
    cy.then(() => disable(undefined));
    cy.get('[role="tablist"]').should('be.visible');
    cy.get('[role="tab"]').eq(1).should('have.attr', 'aria-selected', 'true').focus().should('be.focused');
    // The focused tab itself becoming unavailable.
    cy.then(() => disable(1));
    cy.get('[aria-label="Slide 2 of 3"]').should('be.focused');
    cy.then(() => disable(undefined));
    cy.get('[role="tablist"]').should('be.visible');
    cy.contains('button', 'Outside').focus();
    cy.then(() => disable(0));
    cy.get('[role="tablist"]').should('not.exist');
    cy.contains('button', 'Outside').should('be.focused');
  });

  it('makes a tab panel of plain slides a keyboard stop, but not a panel of cards', () => {
    mount(
      <>
        <button>Before</button>
        <Carousel aria-label="Plain">
          <CarouselViewport>{['First', 'Second']}</CarouselViewport>
          <CarouselNav />
        </Carousel>
        <Carousel aria-label="Cards">
          <CarouselViewport>
            <CarouselCard>Third</CarouselCard>
            <CarouselCard>Fourth</CarouselCard>
          </CarouselViewport>
          <CarouselNav />
        </Carousel>
      </>,
    );
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.focused().should('have.attr', 'role', 'tabpanel').and('have.text', 'First');
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'role', 'tab').realPress('ArrowRight');
    cy.focused().should('have.attr', 'aria-selected', 'true').realPress(['Shift', 'Tab']);
    cy.focused().should('have.attr', 'role', 'tabpanel').and('have.text', 'Second');
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'aria-label', 'Slide 1 of 2').and('have.text', 'Third');
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should('have.attr', 'role', 'tab');
  });

  it('allows autofocus in a static slide on the first commit', () => {
    const capture = cy.stub();
    mount(
      <Carousel aria-label="Notes" onFocusCapture={capture}>
        <CarouselViewport>
          <CarouselCard>
            <input autoFocus aria-label="Note" />
          </CarouselCard>
        </CarouselViewport>
      </Carousel>,
    );
    cy.get('[aria-label="Note"]').should('be.focused');
    cy.wrap(capture).should('have.been.calledOnce');
  });

  it('rechecks nested fieldsets while arrows are absent or hidden at a boundary', () => {
    mount(
      <Carousel aria-label="Lessons">
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <fieldset id="outer" disabled>
          <legend>
            <CarouselPrevious />
          </legend>
          <fieldset id="inner" disabled>
            <legend>
              <CarouselNext />
            </legend>
          </fieldset>
        </fieldset>
      </Carousel>,
    );
    cy.contains('[data-carousel-page]', 'Second').should('be.visible');
    cy.get('#outer').invoke('prop', 'disabled', false);
    cy.get('[data-carousel-button="previous"]').should('have.attr', 'hidden');
    cy.get('[data-carousel-action="next"]').focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'First').should('not.be.visible');
    cy.get('#outer').invoke('prop', 'disabled', true);
    cy.contains('[data-carousel-page]', 'First').should('be.visible');
    cy.get('#outer').invoke('prop', 'disabled', false);
    cy.get('[data-carousel-action="previous"]').focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'Second').should('not.be.visible');
    cy.get('#inner').then(([fieldset]) => fieldset.prepend(fieldset.ownerDocument.createElement('legend')));
    cy.contains('[data-carousel-page]', 'Second').should('be.visible');
    cy.get('#inner > legend')
      .first()
      .then(([legend]) => legend.remove());
    cy.contains('[data-carousel-page]', 'Second').should('not.be.visible');
  });

  it('uses the forwarded native button inside a fieldset returned by the arrow button slot', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const renderButton: SlotRenderFunction<React.ComponentPropsWithRef<'button'>> = (Component, props) => (
      <fieldset id="slot-fieldset" disabled>
        <Component {...props} />
      </fieldset>
    );
    mount(
      <Carousel aria-label="Lessons" circular>
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <CarouselNext button={{ ref, children: renderButton }} />
      </Carousel>,
    );
    cy.get('#slot-fieldset button').should(button => {
      expect(button[0]).to.equal(ref.current);
      expect(button[0].matches(':disabled')).to.equal(true);
    });
    cy.contains('[data-carousel-page]', 'Second').should('be.visible');
    cy.get('#slot-fieldset').invoke('prop', 'disabled', false);
    cy.get('#slot-fieldset button').should('be.enabled').and('be.visible').focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'First').should('not.be.visible');
    cy.get('#slot-fieldset').invoke('prop', 'disabled', true);
    cy.contains('[data-carousel-page]', 'First').should('be.visible');
  });

  it('detects an inner fieldset inserted around the arrow root slot children', () => {
    const showHelp = cy.stub();
    const renderRoot: SlotRenderFunction<React.ComponentPropsWithRef<'div'>> = (Component, props) => (
      <Component {...props}>
        <fieldset id="root-fieldset" disabled>
          <legend>{props.children}</legend>
        </fieldset>
      </Component>
    );
    mount(
      <Carousel aria-label="Lessons">
        <CarouselPrevious />
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <fieldset disabled>
          <legend>
            Lessons
            <button onClick={showHelp}>Navigation help</button>
            <CarouselNext>{renderRoot}</CarouselNext>
          </legend>
          <button>Outside the first legend</button>
        </fieldset>
      </Carousel>,
    );
    cy.get('#root-fieldset button').should('be.enabled').focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'First').should('not.be.visible');
    cy.get('[data-carousel-button="next"]').should('have.attr', 'hidden');
    // Inserting an earlier legend removes the exemption even though Next is hidden at the boundary.
    cy.get('#root-fieldset').then(([fieldset]) => fieldset.prepend(fieldset.ownerDocument.createElement('legend')));
    cy.contains('[data-carousel-page]', 'First').should('be.visible');
    cy.contains('[data-carousel-page]', 'Second').should('be.visible');
    cy.contains('button', 'Navigation help').should('be.visible').and('be.enabled').focus().realPress('Enter');
    cy.wrap(showHelp).should('have.been.calledOnce');
    cy.contains('button', 'Outside the first legend').should('be.disabled');
    cy.get('#root-fieldset > legend')
      .first()
      .then(([legend]) => legend.remove());
    cy.get('[data-carousel-action="previous"]').focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'Second').should('not.be.visible');
  });

  it('navigates with inline callback refs that capture each tab in a nav-only template', () => {
    const captured: (HTMLButtonElement | null)[] = [];
    const Example = () => {
      const tabs = React.useRef(captured);
      return (
        <Carousel aria-label="Lessons">
          <CarouselViewport>{['First', 'Second']}</CarouselViewport>
          <CarouselNav>
            {i => (
              <CarouselNavButton
                ref={node => {
                  tabs.current[i] = node;
                }}
              />
            )}
          </CarouselNav>
        </Carousel>
      );
    };
    mount(<Example />);
    cy.get('[role="tab"]')
      .should('have.length', 2)
      .then(elements => {
        const nodes = Array.from(elements);
        expect(captured).to.deep.equal(nodes);
        cy.wrap(nodes[0]).focus().realPress('ArrowRight');
        cy.contains('[role="tabpanel"]', 'Second').should('be.visible');
        cy.wrap(nodes[1]).should('be.focused').and('have.attr', 'aria-selected', 'true');
        cy.then(() => expect(captured).to.deep.equal(nodes));
      });
  });

  it('keeps one custom trigger inert while static and honors autofocus only on its first reveal', () => {
    const render = cy.stub();
    const onFocus = cy.stub();
    const onClick = cy.stub();
    const renderButton: SlotRenderFunction<React.ComponentPropsWithRef<'button'>> = (Component, props) => {
      render();
      return <Component {...props} />;
    };
    let update: (circular: boolean) => void;
    let rename: () => void;
    const Next = () => {
      const [title, setTitle] = React.useState<string>();
      rename = () => setTitle('Updated');
      return (
        <CarouselNext
          style={{ display: 'flex' }}
          button={{ children: renderButton, autoFocus: true, onFocus, onClick, title }}
        />
      );
    };
    const Example = () => {
      const [circular, setCircular] = React.useState(false);
      update = setCircular;
      return (
        <>
          <button>Before</button>
          <Carousel aria-label="Lessons" circular={circular}>
            <CarouselViewport>{['First', 'Second']}</CarouselViewport>
            <Next />
          </Carousel>
          <button>After</button>
        </>
      );
    };
    mount(<Example />, { strict: false });
    const next = '[data-carousel-action="next"]';
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.contains('button', 'After').should('be.focused');
    cy.get('[aria-label="Lessons"]').then(carousel => {
      expect(carousel.find(next).filter(':visible')).to.have.length(0);
      const [button] = carousel.find(next);
      if (button) {
        button.focus();
        button.click();
        expect(button.ownerDocument.activeElement).not.to.equal(button);
      }
      cy.then(() => update(true));
      cy.get(next)
        .should('have.length', 1)
        .and('be.focused')
        .then(([visibleButton]) => {
          if (button) {
            expect(visibleButton).to.equal(button);
          }
        });
    });
    cy.wrap(onClick).should('not.have.been.called');
    cy.wrap(onFocus).should('have.been.calledOnce');
    cy.contains('[role="tooltip"]', 'Next').should('be.visible');
    cy.then(() => {
      render.resetHistory();
      flushSync(rename);
      expect(render).to.have.been.calledOnce;
    });
    cy.get(next).should('have.attr', 'title', 'Updated');
    cy.contains('button', 'After').focus();
    cy.then(() => update(false));
    cy.get(`${next}:visible`).should('not.exist');
    cy.then(() => update(true));
    cy.get(next).should('be.visible');
    cy.contains('button', 'After').should('be.focused');
    cy.contains('[role="tooltip"]', 'Next').should('not.be.visible');
    cy.wrap(onFocus).should('have.been.calledOnce');
  });

  it('keeps paging only while an independent arrow or complete tab route remains operable', () => {
    mount(
      <Carousel aria-label="Lessons" circular>
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <fieldset id="arrow" disabled>
          <CarouselNext />
        </fieldset>
        <CarouselNav>
          {index =>
            index === 1 ? (
              <fieldset id="tab" disabled>
                <legend>Choose a page</legend>
                <CarouselNavButton />
              </fieldset>
            ) : (
              <CarouselNavButton />
            )
          }
        </CarouselNav>
      </Carousel>,
    );
    cy.contains('[data-carousel-page]', 'Second').should('be.visible');
    cy.get('#arrow').invoke('prop', 'disabled', false);
    cy.get('[role="tablist"]').should('not.exist');
    cy.get('[data-carousel-action="next"]').focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'First').should('not.be.visible');
    cy.get('#tab').invoke('prop', 'disabled', false);
    cy.get('[role="tablist"]').should('be.visible');
    cy.get('#arrow').invoke('prop', 'disabled', true);
    cy.get('[role="tab"]').first().focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'Second').should('not.be.visible');
    cy.get('#tab').invoke('prop', 'disabled', true);
    cy.contains('[data-carousel-page]', 'Second').should('be.visible');
  });

  it('stops playback when its fieldset is disabled without removing an independent navigation route', () => {
    mount(
      <Carousel aria-label="Lessons">
        <fieldset id="playback">
          <CarouselAutoplayButton />
        </fieldset>
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <CarouselNav />
      </Carousel>,
    );
    cy.contains('button', 'Play').focus().realPress('Enter');
    cy.get('[role="region"]').should('have.attr', 'data-playing');
    cy.get('#playback').invoke('prop', 'disabled', true);
    cy.get('[role="region"]').should('not.have.attr', 'data-playing');
    cy.get('#playback').invoke('prop', 'disabled', false);
    cy.contains('button', 'Play').should('be.enabled');
    cy.get('[role="tab"]').last().click().should('have.attr', 'aria-selected', 'true');
  });

  for (const part of ['tab', 'playback'] as const) {
    it(`re-registers a replaced native ${part} in the same part instance`, () => {
      let toggle: () => void;
      const Wrapper = (props: { children: React.ReactNode }) => {
        const [wrapped, setWrapped] = React.useState(false);
        toggle = () => setWrapped(!wrapped);
        return wrapped ? <fieldset disabled>{props.children}</fieldset> : <>{props.children}</>;
      };
      const renderButton: SlotRenderFunction<React.ComponentPropsWithRef<'button'>> = (Component, props) => (
        <Wrapper>
          <Component {...props} />
        </Wrapper>
      );
      mount(
        <Carousel aria-label="Lessons">
          {part === 'playback' && <CarouselAutoplayButton>{renderButton}</CarouselAutoplayButton>}
          <CarouselViewport>{['First', 'Second']}</CarouselViewport>
          <CarouselNav>
            {index => <CarouselNavButton>{part === 'tab' && index === 1 ? renderButton : undefined}</CarouselNavButton>}
          </CarouselNav>
        </Carousel>,
      );
      const target = part === 'tab' ? '[role="tab"][aria-label="Page 2 of 2"]' : '[data-carousel-action="autoplay"]';
      cy.get(target).then(([button]) => {
        if (part === 'playback') {
          cy.wrap(button).click();
          cy.get('[role="region"]').should('have.attr', 'data-playing');
        }
        cy.then(() => toggle());
        cy.get(target).should(el => {
          expect(el[0]).not.to.equal(button);
          expect(el[0].matches(':disabled')).to.equal(true);
        });
      });
      if (part === 'tab') {
        cy.get('[role="tablist"]').should('not.exist');
        cy.contains('[data-carousel-page]', 'Second').should('be.visible');
      } else {
        cy.get('[role="region"]').should('not.have.attr', 'data-playing');
      }
      cy.then(() => toggle());
      cy.get(target).should('be.visible').and('be.enabled').click();
      if (part === 'tab') {
        cy.contains('[role="tabpanel"]', 'Second').should('be.visible');
      } else {
        cy.get('[role="region"]').should('have.attr', 'data-playing');
      }
    });
  }

  it('does not make a custom fieldset disabled just because the arrow is staged', () => {
    let update: (disabled: boolean) => void;
    const renderButton: SlotRenderFunction<React.ComponentPropsWithRef<'button'>> = (Component, props) => (
      <fieldset disabled={props.disabled}>
        <Component {...props} />
      </fieldset>
    );
    const Example = () => {
      const [disabled, setDisabled] = React.useState(false);
      update = setDisabled;
      return (
        <Carousel aria-label="Lessons" circular>
          <CarouselViewport>{['First', 'Second']}</CarouselViewport>
          <CarouselNext button={{ disabled, children: renderButton }} />
        </Carousel>
      );
    };
    mount(<Example />);
    cy.get('[data-carousel-action="next"]').should('be.visible').and('be.enabled').click();
    cy.contains('[data-carousel-page]', 'First').should('not.be.visible');
    cy.then(() => update(true));
    cy.contains('[data-carousel-page]', 'First').should('be.visible');
    cy.get('[data-carousel-action="next"]').should('be.disabled');
    cy.then(() => update(false));
    cy.get('[data-carousel-action="next"]').should('be.visible').and('be.enabled').click();
    cy.contains('[data-carousel-page]', 'Second').should('not.be.visible');
  });

  it('stages the entire arrow root callback, including siblings outside the forwarded root', () => {
    const onFocus = cy.stub();
    const rootRef = cy.stub();
    let update: (circular: boolean) => void;
    const renderRoot: SlotRenderFunction<React.ComponentPropsWithRef<'div'>> = (Component, props) => (
      <fieldset>
        <legend>Slide navigation</legend>
        <button autoFocus onFocus={onFocus}>
          Extra control
        </button>
        <Component {...props} />
      </fieldset>
    );
    const Example = () => {
      const [circular, setCircular] = React.useState(false);
      update = setCircular;
      return (
        <>
          <button>Before</button>
          <Carousel aria-label="Lessons" circular={circular}>
            <CarouselViewport>{['First', 'Second']}</CarouselViewport>
            <CarouselNext ref={rootRef}>{renderRoot}</CarouselNext>
          </Carousel>
          <button>After</button>
        </>
      );
    };
    mount(<Example />, { strict: false });
    cy.contains('legend', 'Slide navigation').should('not.be.visible');
    cy.contains('button', 'Extra control').should('not.be.visible');
    cy.wrap(onFocus).should('not.have.been.called');
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.contains('button', 'After').should('be.focused');
    cy.then(() => update(true));
    cy.contains('legend', 'Slide navigation').should('be.visible');
    cy.contains('button', 'After').should('be.focused');
    cy.then(() => update(false));
    cy.contains('legend', 'Slide navigation').should('not.be.visible');
    cy.wrap(rootRef).should('have.been.calledOnce');
  });

  it('recovers focus from a staged root callback sibling only when that subtree owns focus', () => {
    let update: (circular: boolean) => void;
    const renderRoot: SlotRenderFunction<React.ComponentPropsWithRef<'div'>> = (Component, props) => (
      <>
        <button>Navigation help</button>
        <Component {...props} />
      </>
    );
    const Example = () => {
      const [circular, setCircular] = React.useState(true);
      update = setCircular;
      return (
        <>
          <button>Outside</button>
          <Carousel aria-label="Lessons" circular={circular}>
            <CarouselViewport>
              <CarouselCard>First</CarouselCard>
              <CarouselCard>Second</CarouselCard>
            </CarouselViewport>
            <CarouselNext>{renderRoot}</CarouselNext>
          </Carousel>
        </>
      );
    };
    mount(<Example />);
    cy.contains('button', 'Navigation help').should('be.visible').focus();
    cy.then(() => update(false));
    cy.contains('button', 'Navigation help').should('not.be.visible');
    cy.get('[aria-label="Slide 1 of 2"]').should('be.focused');
    cy.then(() => update(true));
    cy.contains('button', 'Navigation help').should('be.visible');
    cy.contains('button', 'Outside').focus();
    cy.then(() => update(false));
    cy.contains('button', 'Navigation help').should('not.be.visible');
    cy.contains('button', 'Outside').should('be.focused');
  });

  it('retains the boundary layout slot without revealing a custom arrow through display:flex', () => {
    const renderButton: SlotRenderFunction<React.ComponentPropsWithRef<'button'>> = (Component, props) => (
      <Component {...props}>Next glyph</Component>
    );
    mount(
      <Carousel aria-label="Lessons">
        <CarouselPrevious />
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <CarouselNext style={{ display: 'flex', width: '4em' }} button={{ children: renderButton }} />
      </Carousel>,
    );
    cy.get('[data-carousel-button="next"]').then(([root]) => {
      const width = root.getBoundingClientRect().width;
      cy.contains('button', 'Next glyph').focus().realPress('Enter');
      cy.get('[data-carousel-button="next"][hidden]').should(el => {
        expect(el).to.have.length(1);
        expect(el[0].getBoundingClientRect().width).to.equal(width).and.to.be.greaterThan(0);
        expect(el).to.have.css('visibility', 'hidden');
      });
      cy.contains('button', 'Next glyph').should('not.be.visible');
      cy.get('[data-carousel-action="previous"]').click();
      cy.contains('button', 'Next glyph').should('be.visible');
    });
  });

  [false, true].forEach(onSelectedPage => {
    it(`${onSelectedPage ? 'preserves' : 'recovers'} autofocus when paging starts at a controlled index`, () => {
      const adapter = cy.stub().returns([]);
      mount(
        <Carousel aria-label="Lessons" activeIndex={1} transition={adapter}>
          <CarouselViewport>
            <input autoFocus={!onSelectedPage} aria-label="First" />
            <CarouselCard>
              <input autoFocus={onSelectedPage} aria-label="Second" />
            </CarouselCard>
          </CarouselViewport>
          <CarouselNav />
        </Carousel>,
      );
      cy.get(onSelectedPage ? '[aria-label="Second"]' : '[aria-roledescription="slide"]').should('be.focused');
      cy.get('[aria-label="First"]').closest('[data-carousel-page]').should('have.attr', 'inert');
      cy.wrap(adapter).should('not.have.been.called');
    });
  });

  it('recovers only focus that entering paged mode would hide inside a shadow root', () => {
    let setControls: (value: boolean) => void;
    const adapter = cy.stub().returns([]);
    const Example = () => {
      const [shadow, setShadow] = React.useState<ShadowRoot>();
      const attach = React.useCallback((node: HTMLDivElement | null) => {
        if (node) {
          setShadow(node.shadowRoot ?? node.attachShadow({ mode: 'open' }));
        }
      }, []);
      const [controls, set] = React.useState(false);
      setControls = set;
      return (
        <div ref={attach} id="host">
          {shadow &&
            createPortal(
              <>
                <button>Outside</button>
                <Carousel aria-label="Lessons" transition={adapter}>
                  <CarouselViewport>
                    <CarouselCard>
                      <input aria-label="First" />
                    </CarouselCard>
                    <input aria-label="Second" />
                  </CarouselViewport>
                  {controls && <CarouselNav />}
                </Carousel>
              </>,
              shadow,
            )}
        </div>
      );
    };
    mount(<Example />);
    const find = (selector: string) => cy.get('#host').shadow().find(selector);
    const expectFocus = (selector: string) =>
      find(selector).should(el => expect((el[0].getRootNode() as ShadowRoot).activeElement).to.equal(el[0]));
    for (const [source, target] of [
      ['input[aria-label="Second"]', '[aria-roledescription="slide"]'],
      ['input[aria-label="First"]', 'input[aria-label="First"]'],
      ['button', 'button'],
    ]) {
      find(source).focus();
      cy.then(() => setControls(true));
      find('[aria-label="Second"]').closest('[data-carousel-page]').should('have.attr', 'inert');
      expectFocus(target);
      cy.then(() => setControls(false));
      find('[aria-label="Second"]').should('be.visible');
    }
    cy.wrap(adapter).should('not.have.been.called');
  });

  it('recovers focus when the focused arrow retires without a page change', () => {
    let removeLast: () => void;
    const Collection = () => {
      const [last, setLast] = React.useState(true);
      removeLast = () => setLast(false);
      return (
        <Carousel aria-label="Lessons" defaultActiveIndex={1}>
          <CarouselPrevious />
          <CarouselViewport>
            <CarouselCard>First</CarouselCard>
            <CarouselCard>Second</CarouselCard>
            {last && <CarouselCard>Third</CarouselCard>}
          </CarouselViewport>
          <CarouselNext />
        </Carousel>
      );
    };
    mount(<Collection />);
    cy.get('[data-carousel-action="next"]').focus();
    cy.then(() => removeLast());
    cy.get('[aria-label="Slide 2 of 2"]').should('be.focused');
  });

  it('dismisses the newest tooltip before the focused carousel tooltip', () => {
    let showNewer: () => void;
    const Tooltips = () => {
      const [visible, setVisible] = React.useState(false);
      showNewer = () => setVisible(true);
      return (
        <>
          <CarouselDirectionTooltip
            content={{ children: 'Older', popover: 'manual' }}
            position="after"
            unavailable={false}
          >
            <button>Arrow</button>
          </CarouselDirectionTooltip>
          <Tooltip
            relationship="description"
            content={{ children: 'Newer', popover: 'manual' }}
            visible={visible}
            onVisibleChange={(_, data) => setVisible(data.visible)}
          >
            <button>Other</button>
          </Tooltip>
        </>
      );
    };
    mount(<Tooltips />);
    cy.contains('button', 'Arrow').focus();
    cy.contains('[role="tooltip"]', 'Older').should('be.visible');
    cy.then(() => showNewer());
    cy.contains('[role="tooltip"]', 'Newer').should('be.visible');
    cy.contains('button', 'Arrow').realPress('Escape');
    cy.contains('[role="tooltip"]', 'Newer').should('not.be.visible');
    cy.contains('[role="tooltip"]', 'Older').should('be.visible');
    cy.contains('button', 'Arrow').realPress('Escape');
    cy.contains('[role="tooltip"]', 'Older').should('not.exist');
    cy.contains('button', 'Arrow').should('be.focused');
  });

  [
    {
      name: 'a hidden card',
      slides: [
        <CarouselCard key="hidden" hidden>
          Hidden
        </CarouselCard>,
        <CarouselCard key="visible">Visible</CarouselCard>,
      ],
      expected: '[aria-label="Slide 4 of 4"]',
    },
    {
      name: 'a hidden button',
      slides: [
        <div key="buttons">
          <button hidden>Hidden</button>
          <button>Available</button>
        </div>,
        <div key="last">Last</div>,
      ],
      expected: 'button:contains("Available")',
    },
    {
      name: 'a programmatic-only button followed by a summary',
      slides: [
        <div key="targets">
          <button tabIndex={-1}>Not a tab stop</button>
          <details>
            <summary>Open details</summary>More information
          </details>
        </div>,
        <div key="last">Last</div>,
      ],
      expected: 'summary',
    },
    {
      name: 'an unchecked radio in a group with a checked tab stop',
      slides: [
        <div key="radio">
          <input type="radio" name="choice" value="first" />
          <input type="radio" name="choice" value="current" defaultChecked />
        </div>,
        <div key="last">Last</div>,
      ],
      expected: 'input[value="current"]',
    },
    {
      name: 'all hidden candidates',
      slides: [
        <div key="buttons">
          <button hidden>Hidden</button>
        </div>,
        <div key="last">Last</div>,
      ],
      expected: '[aria-label="Page 2 of 2"]',
    },
  ].forEach(({ name, slides, expected }) => {
    it(`recovers boundary focus past ${name}`, () => {
      mount(
        <Carousel aria-label="Focus recovery" groupSize={2}>
          <CarouselPrevious />
          <CarouselViewport>
            <div>First</div>
            <div>Second</div>
            {slides}
          </CarouselViewport>
          <CarouselNext />
        </Carousel>,
      );
      cy.get('[data-carousel-action="next"]').focus().realPress('Enter');
      cy.get(expected).should('be.focused');
    });
  });

  it('keeps playback first, starts paused, and stops when focus enters content', () => {
    renderCarousel({ autoplay: true, circular: true, autoplayInterval: 1000 });
    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.contains('button', 'Play').should('be.focused').realPress('Enter');
    cy.contains('button', 'Pause').should('be.focused');
    cy.get('[role="tab"]').eq(1).should('have.attr', 'aria-selected', 'true');
    cy.contains('button', 'Pause').realPress('Tab');
    cy.contains('button', 'Play').should('exist');
    cy.get('[data-carousel-action="previous"]').should('be.focused');
    cy.get('.viewport').should('have.attr', 'aria-live', 'polite');
  });

  it("stops for pointer activation of a nested carousel's playback control, keeping its own exempt", () => {
    const outerSelected = (position: number) =>
      cy.get(`[role="tab"][aria-label="Page ${position} of 3"]`).should('have.attr', 'aria-selected', 'true');
    // Rotation only advances on cy.tick(), so slow commands can't move the outer carousel off the nested one.
    cy.clock();
    mount(
      <Carousel id="outer" aria-label="Outer" circular autoplayInterval={1000}>
        <CarouselAutoplayButton id="outer-playback" />
        <CarouselViewport>
          <CarouselCard>Outer first</CarouselCard>
          <CarouselCard>
            <Carousel id="inner" aria-label="Inner" circular autoplayInterval={60000}>
              <CarouselAutoplayButton id="inner-playback" />
              <CarouselViewport>{['Inner first', 'Inner second']}</CarouselViewport>
              <CarouselNav />
            </Carousel>
          </CarouselCard>
          <CarouselCard>Outer third</CarouselCard>
        </CarouselViewport>
        <CarouselNav />
      </Carousel>,
    );
    // The outer carousel's own Play/Pause is exempt from pointer interruption and hover suspension.
    cy.get('#outer-playback').realClick().should('have.text', 'Pause');
    cy.tick(1000);
    outerSelected(2);
    // Hovering the nested control suspends the outer rotation like any content.
    cy.get('#inner-playback').realHover();
    // pointerover renders at continuous priority: let it commit before advancing the frozen clock.
    cy.wait(100);
    cy.tick(3000);
    // Activating it stops the outer rotation. Its render also flushes any advance the tick caused.
    cy.get('#inner-playback').realClick();
    cy.get('#inner').should('have.attr', 'data-playing');
    cy.get('#outer').should('not.have.attr', 'data-playing');
    outerSelected(2);
  });

  it('waits only for finite motion, then cancels every handle and recovers boundary focus', () => {
    let finite: Animation;
    let handles: Animation[];
    renderCarousel({
      defaultActiveIndex: 1,
      transition: ({ incoming }) => {
        finite = incoming.animate([], 60000);
        const paused = incoming.animate([], 60000);
        paused.pause();
        handles = [
          finite,
          incoming.animate([], { duration: 100, iterations: Infinity }),
          paused,
          freezeWhenReady(incoming),
        ];
        return handles;
      },
    });
    cy.get('[data-carousel-action="next"]').focus().realPress('Enter');
    cy.get('.viewport').should('have.attr', 'aria-busy', 'true');
    cy.get('[data-carousel-action="next"]').should('be.focused');
    cy.then(() => finite.finish());
    cy.get('.viewport').should('have.attr', 'aria-busy', 'false');
    cy.get('[aria-label="Slide 5 of 5"]').should('be.focused');
    cy.then(() => handles.forEach(animation => expect(animation.playState).to.equal('idle')));
  });

  it('continues autoplay when none of the returned animations is advancing', () => {
    renderCarousel({
      autoplay: true,
      autoplayInterval: 1000,
      transition: ({ incoming }) => {
        const paused = incoming.animate([], 60000);
        paused.pause();
        const idle = incoming.animate([], 60000);
        idle.cancel();
        const stopped = incoming.animate([], 60000);
        stopped.playbackRate = 0;
        return [paused, idle, stopped, freezeWhenReady(incoming)];
      },
    });
    cy.contains('button', 'Play').focus().realPress('Enter');
    cy.get('[role="tab"]').last().should('have.attr', 'aria-selected', 'true');
    cy.get('.viewport').should('have.attr', 'aria-busy', 'false');
  });

  it('does not let canceled readiness settle the replacement transition', () => {
    const handles: Animation[] = [];
    renderCarousel({
      transition: ({ incoming }) => {
        const animation = incoming.animate([], 60000);
        handles.push(animation);
        return [animation];
      },
    });
    cy.get('[data-carousel-action="next"]')
      .focus()
      .then(([next]) => {
        // Commit both navigations before the browser can service the first pending play task.
        flushSync(() => next.click());
        expect(handles[0].pending).to.equal(true);
        flushSync(() => next.click());
        expect(handles[0].playState).to.equal('idle');
        return handles[1].ready;
      });
    cy.get('.viewport').should('have.attr', 'aria-busy', 'true');
    cy.get('[data-carousel-action="next"]').should('be.focused');
    cy.then(() => handles[1].finish());
    cy.get('[aria-label="Slide 5 of 5"]').should('be.focused');
    cy.get('.viewport').should('have.attr', 'aria-busy', 'false');
  });

  it('settles immediately when an input in the outgoing group would lose focus', () => {
    let change: (index: number) => void;
    const Controlled = () => {
      const [index, setIndex] = React.useState(0);
      change = setIndex;
      return (
        <Carousel aria-label="Controlled" activeIndex={index} transition={transition}>
          <CarouselViewport>
            <CarouselCard>
              <input aria-label="First" />
            </CarouselCard>
            <CarouselCard>
              <input aria-label="Second" />
            </CarouselCard>
          </CarouselViewport>
          <CarouselNav />
        </Carousel>
      );
    };
    mount(<Controlled />);
    cy.get('input[aria-label="First"]').focus();
    cy.then(() => change(1));
    cy.get('[aria-label="Slide 2 of 2"]').should('be.focused');
    cy.get('[aria-busy="false"]').should('exist');
  });

  it('recovers focus when the browser drops it from the outgoing group before settlement', () => {
    let change: (index: number) => void;
    // A layout read after the commit lets the browser apply its focus fixup to the newly hidden group.
    const LayoutReader = () => {
      useIsomorphicLayoutEffect(() => {
        document.body.getBoundingClientRect();
        const active = document.activeElement as HTMLElement | null;
        if (active?.closest('[hidden]')) {
          active.blur();
        }
      });
      return null;
    };
    const Controlled = () => {
      const [index, setIndex] = React.useState(0);
      change = setIndex;
      return (
        <Carousel aria-label="Controlled" activeIndex={index}>
          <CarouselViewport>
            <CarouselCard>
              <input aria-label="First" />
            </CarouselCard>
            <CarouselCard>
              <input aria-label="Second" />
            </CarouselCard>
          </CarouselViewport>
          <CarouselNav />
          <LayoutReader />
        </Carousel>
      );
    };
    mount(<Controlled />);
    cy.get('input[aria-label="First"]').focus();
    cy.then(() => change(1));
    cy.get('[aria-label="Slide 2 of 2"]').should('be.focused');
  });
});
