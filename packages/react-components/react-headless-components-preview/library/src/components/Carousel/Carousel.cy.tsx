import * as React from 'react';
import { createPortal, flushSync } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { SlotRenderFunction } from '@fluentui/react-utilities';
import { Carousel } from './Carousel';
import type { CarouselProps } from './Carousel.types';
import { CarouselViewport } from './CarouselViewport';
import { CarouselCard } from './CarouselCard';
import { CarouselPrevious } from './CarouselPrevious';
import { CarouselNext } from './CarouselNext';
import { CarouselNav } from './CarouselNav';
import { CarouselNavButton } from './CarouselNavButton';
import { CarouselAutoplayButton } from './CarouselAutoplayButton';
import { Tooltip } from '../Tooltip';

/**
 * Starts script animations on the incoming page as the carousel reads its animations, like an effect that calls
 * `element.animate()` would. The carousel tracks them along with the page's CSS animations.
 */
const animateIncoming = (animate: (incoming: HTMLElement) => void) =>
  cy.window().then(win => {
    const original = win.Element.prototype.getAnimations;
    cy.stub(win.Element.prototype, 'getAnimations').callsFake(function (this: Element, options?: GetAnimationsOptions) {
      if (this.hasAttribute('data-incoming')) {
        animate(this as HTMLElement);
      }
      return original.call(this, options);
    });
  });

/** Turns off the example's CSS page animations, leaving only the ones a test starts. */
const noCssMotion = '.viewport[data-direction] > [data-carousel-page] { animation: none; }';

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
  const renderCarousel = ({
    autoplay = false,
    cssMotion = true,
    ...props
  }: Partial<CarouselProps> & { autoplay?: boolean; cssMotion?: boolean } = {}) =>
    mount(
      <div className="example">
        <style>{cssMotion ? styles : `${styles}\n${noCssMotion}`}</style>
        <button>Before</button>
        <Carousel id="lessons" aria-label="Lessons" groupSize={2} className="carousel" {...props}>
          {autoplay && <CarouselAutoplayButton className="button playback" />}
          <CarouselPrevious button={{ className: 'button', icon: '<' }} />
          <CarouselViewport className="viewport">
            {[1, 2, 3, 4, 5].map(index => (
              <CarouselCard key={index}>
                <button>Action {index}</button>
              </CarouselCard>
            ))}
          </CarouselViewport>
          <CarouselNext button={{ className: 'button', icon: { children: '›', 'aria-hidden': true } }} />
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

  it('settles after the CSS page animations, or immediately when reduced motion removes them', () => {
    renderCarousel();
    cy.get('[data-carousel-action="next"]').click();
    cy.get('.viewport').should('have.attr', 'data-direction', 'next').and('have.attr', 'aria-busy', 'true');
    cy.get('[data-incoming]').then(([page]) => expect(page.getAnimations()).to.have.length(1));
    cy.get('[data-outgoing]').then(([page]) => expect(page.getAnimations()).to.have.length(1));
    cy.get('.viewport').should('have.attr', 'aria-busy', 'false').and('not.have.attr', 'data-direction');
    cy.get('[data-incoming], [data-outgoing]').should('not.exist');

    setReducedMotionPreference('reduce');
    cy.get('[data-carousel-action="previous"]').then(([previous]) => {
      flushSync(() => previous.click());
      const viewport = previous.ownerDocument.querySelector('.viewport')!;
      expect(viewport).to.have.attr('aria-busy', 'false');
      expect(viewport.querySelector('[data-incoming], [data-outgoing]')).to.equal(null);
    });
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

  it('mirrors chevrons, nav keys and the slide axis according to the nearest direction', () => {
    renderCarousel();
    const axis = () =>
      cy.get('.carousel').then(([el]) => getComputedStyle(el).getPropertyValue('--carousel-axis').trim());
    cy.get('.example').invoke('attr', 'dir', 'rtl');
    cy.get('[role="region"]').should('not.have.attr', 'dir');
    const glyph = '[data-carousel-button="next"] [aria-hidden="true"]';
    cy.get(glyph).should('have.css', 'transform', 'matrix(-1, 0, 0, 1, 0, 0)');
    cy.get('[aria-selected="true"]').focus().realPress('ArrowLeft');
    cy.get('[role="tab"]').eq(1).should('be.focused').and('have.attr', 'aria-selected', 'true');
    axis().should('equal', '-1');
    cy.get('.carousel').invoke('attr', 'dir', 'ltr');
    cy.get(glyph).should('have.css', 'transform', 'none');
    cy.get('[aria-selected="true"]').realPress('ArrowLeft');
    cy.get('[role="tab"]').first().should('be.focused').and('have.attr', 'aria-selected', 'true');
    axis().should('equal', '');
  });

  it('names arrows through aria-label unless the button slot names them', () => {
    mount(
      <>
        <span id="next-name">Next lesson</span>
        <Carousel aria-label="Lessons">
          <CarouselPrevious button={{ 'aria-label': 'Précédent' }} />
          <CarouselViewport>{['First', 'Second', 'Third']}</CarouselViewport>
          <CarouselNext button={{ 'aria-labelledby': 'next-name' }} />
        </Carousel>
        <Carousel aria-label="Defaults" circular>
          <CarouselPrevious />
          <CarouselViewport>{['First', 'Second']}</CarouselViewport>
          <CarouselNext />
        </Carousel>
      </>,
    );
    cy.get('[aria-label="Lessons"] [data-carousel-action="next"]')
      .should('have.attr', 'aria-labelledby', 'next-name')
      .and('not.have.attr', 'aria-label');
    cy.get('[aria-label="Lessons"] [data-carousel-action="next"]').click();
    cy.get('[aria-label="Lessons"] [data-carousel-action="previous"]').should('have.attr', 'aria-label', 'Précédent');
    cy.get('[aria-label="Defaults"] [data-carousel-action="previous"]').should('have.attr', 'aria-label', 'Previous');
    cy.get('[aria-label="Defaults"] [data-carousel-action="next"]').should('have.attr', 'aria-label', 'Next');
  });

  it('composes a Tooltip that shows the arrow name through the button slot render function', () => {
    const withTooltip: SlotRenderFunction<React.ComponentPropsWithRef<'button'>> = (Component, props) => (
      <Tooltip relationship="inaccessible" content={props['aria-label'] ?? ''}>
        <Component {...props} />
      </Tooltip>
    );
    mount(
      <Carousel aria-label="Lessons" circular>
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <CarouselNext button={{ children: withTooltip, 'aria-label': 'Next lesson' }} />
      </Carousel>,
    );
    cy.get('[data-carousel-action="next"]').focus();
    cy.contains('[role="tooltip"]', 'Next lesson').should('be.visible');
    cy.get('[data-carousel-action="next"]').should('not.have.attr', 'aria-labelledby');
    cy.get('[data-carousel-action="next"]').should('not.have.attr', 'aria-describedby');
    cy.get('[data-carousel-action="next"]').should('have.attr', 'aria-label', 'Next lesson');
  });

  it('focuses the Next button and calls onFocus once when it mounts with autoFocus', () => {
    const onFocus = cy.stub();
    mount(
      <Carousel aria-label="Lessons">
        <CarouselPrevious />
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <CarouselNext button={{ autoFocus: true, onFocus }} />
      </Carousel>,
    );
    cy.get('[data-carousel-action="next"]').should('be.focused');
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
      const adapter = cy.stub();
      animateIncoming(adapter);
      mount(
        <Carousel aria-label="Lessons" activeIndex={1}>
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
    const adapter = cy.stub();
    animateIncoming(adapter);
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
                <Carousel aria-label="Lessons">
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
    const outerTab = (position: number) => `[role="tab"][aria-label="Page ${position} of 3"]`;
    const outerSelected = (position: number) => cy.get(outerTab(position)).should('have.attr', 'aria-selected', 'true');
    // Rotation only advances on the fake clock, so slow commands can't move the outer carousel off the nested one.
    let clock: Cypress.Clock;
    cy.clock().then(value => {
      clock = value;
    });
    mount(
      <>
        <button id="outside">Outside</button>
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
        </Carousel>
      </>,
    );
    // Start with the pointer outside: a pointer left over the carousel by an earlier test would suspend it.
    cy.get('#outside').realHover();
    // The outer carousel's own Play/Pause is exempt from pointer interruption and hover suspension.
    cy.get('#outer-playback').realClick().should('have.text', 'Pause');
    // The timer arms after a passive effect and an IntersectionObserver callback, so advance the fake clock in
    // small steps until the outer carousel moves rather than assuming one tick lands after arming.
    cy.get(outerTab(2)).should($tab => {
      clock.tick(100);
      expect($tab).to.have.attr('aria-selected', 'true');
    });
    // Hovering the nested control suspends the outer rotation like any content.
    cy.get('#inner-playback').realHover();
    // pointerover renders at continuous priority: let it commit before advancing the frozen clock.
    cy.wait(250);
    cy.tick(3000);
    // Activating it stops the outer rotation. Its render also flushes any advance the tick caused.
    cy.get('#inner-playback').realClick();
    cy.get('#inner').should('have.attr', 'data-playing');
    cy.get('#outer').should('not.have.attr', 'data-playing');
    outerSelected(2);
  });

  it('waits only for finite motion, then recovers boundary focus', () => {
    let finite: Animation;
    animateIncoming(incoming => {
      finite = incoming.animate([], 60000);
      incoming.animate([], { duration: 100, iterations: Infinity });
      incoming.animate([], 60000).pause();
      freezeWhenReady(incoming);
    });
    renderCarousel({ defaultActiveIndex: 1, cssMotion: false });
    cy.get('[data-carousel-action="next"]').focus().realPress('Enter');
    cy.get('.viewport').should('have.attr', 'aria-busy', 'true');
    cy.get('[data-carousel-action="next"]').should('be.focused');
    cy.then(() => finite.finish());
    cy.get('.viewport').should('have.attr', 'aria-busy', 'false');
    cy.get('[aria-label="Slide 5 of 5"]').should('be.focused');
  });

  it('continues autoplay when none of the page animations is advancing', () => {
    animateIncoming(incoming => {
      incoming.animate([], 60000).pause();
      incoming.animate([], 60000).cancel();
      incoming.animate([], 60000).playbackRate = 0;
      freezeWhenReady(incoming);
    });
    renderCarousel({ autoplay: true, autoplayInterval: 1000, cssMotion: false });
    cy.contains('button', 'Play').focus().realPress('Enter');
    cy.get('[role="tab"]').last().should('have.attr', 'aria-selected', 'true');
    cy.get('.viewport').should('have.attr', 'aria-busy', 'false');
  });

  it('does not let canceled readiness settle the replacement transition', () => {
    const handles: Animation[] = [];
    animateIncoming(incoming => {
      // Like a consumer's effect, replace the running animation.
      handles[handles.length - 1]?.cancel();
      handles.push(incoming.animate([], 60000));
    });
    renderCarousel({ cssMotion: false });
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
        </Carousel>
      );
    };
    const animate = cy.stub();
    animateIncoming(animate);
    mount(<Controlled />);
    cy.get('input[aria-label="First"]').focus();
    cy.then(() => change(1));
    cy.get('[aria-label="Slide 2 of 2"]').should('be.focused');
    cy.get('[aria-busy="false"]').should('exist');
    // Motion is skipped, not waited for.
    cy.wrap(animate).should('not.have.been.called');
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
