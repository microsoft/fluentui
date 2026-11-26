import * as React from 'react';
import { createPortal, flushSync } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
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
        <CarouselNext>{renderRoot}</CarouselNext>
      </Carousel>,
    );
    cy.get('#root-fieldset button').should('be.enabled').focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'First').should('not.be.visible');
    cy.get('[data-carousel-button="next"]').should('have.attr', 'hidden');
    // Inserting an earlier legend removes the exemption even though Next is hidden at the boundary.
    cy.get('#root-fieldset').then(([fieldset]) => fieldset.prepend(fieldset.ownerDocument.createElement('legend')));
    cy.contains('[data-carousel-page]', 'First').should('be.visible');
    cy.contains('[data-carousel-page]', 'Second').should('be.visible');
    cy.get('#root-fieldset > legend')
      .first()
      .then(([legend]) => legend.remove());
    cy.get('[data-carousel-action="previous"]').focus().realPress('Enter');
    cy.contains('[data-carousel-page]', 'Second').should('not.be.visible');
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
});
