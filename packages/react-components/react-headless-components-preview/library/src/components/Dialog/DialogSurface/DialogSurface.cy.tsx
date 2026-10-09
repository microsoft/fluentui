import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { webLightTheme } from '@fluentui/react-theme';

import { Dialog, DialogSurface, DialogTrigger } from '..';
import type { DialogProps } from '..';
import { Drawer } from '../../Drawer';
import { NavDrawer } from '../../Nav/NavDrawer';
import { Provider } from '../../Provider';

const surfaceSelector = '#animated-surface';
const exitDuration = `calc(${webLightTheme.durationUltraSlow} * 20)`;
const exitStyles = `
  @keyframes surfaceExit {
    from { display: block; opacity: 1; }
    to { display: none; opacity: 0; }
  }
  @keyframes backdropExit {
    from { display: block; opacity: 1; }
    to { display: none; opacity: 0; }
  }
  @keyframes surfaceFade {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes decorativeMotion {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  ${surfaceSelector} {
    transition: overlay ${exitDuration} allow-discrete;
  }
  ${surfaceSelector}:not([data-open]) {
    animation: surfaceExit ${exitDuration} linear;
  }
  ${surfaceSelector}:not([data-open]),
  ${surfaceSelector}:not([data-open])::backdrop {
    pointer-events: none;
  }
  ${surfaceSelector}::backdrop {
    background: ${webLightTheme.colorBackgroundOverlay};
    transition: overlay ${exitDuration} allow-discrete;
  }
  ${surfaceSelector}.with-backdrop:not([data-open])::backdrop {
    animation: backdropExit ${exitDuration} linear;
  }
  ${surfaceSelector}.with-backdrop {
    transition: display ${exitDuration} allow-discrete, overlay ${exitDuration} allow-discrete;
  }
  ${surfaceSelector}.with-backdrop:not([data-open]) {
    animation-name: surfaceFade;
  }
  ${surfaceSelector}.with-transition {
    opacity: 0;
    transition: opacity ${exitDuration}, display ${exitDuration} allow-discrete,
      overlay ${exitDuration} allow-discrete;
  }
  ${surfaceSelector}.with-transition[data-open] {
    opacity: 1;
  }
  ${surfaceSelector}.with-transition:not([data-open]),
  ${surfaceSelector}.no-motion:not([data-open]) {
    animation: none;
  }
  ${surfaceSelector}.no-motion {
    transition: none;
  }
  ${surfaceSelector}.infinite:not([data-open]) {
    animation: surfaceExit ${exitDuration} infinite;
    transition: none;
  }
  ${surfaceSelector}.paused:not([data-open]) {
    animation-play-state: paused;
    transition: none;
  }
  ${surfaceSelector}.natural-finish {
    transition-duration: ${webLightTheme.durationSlow};
  }
  ${surfaceSelector}.natural-finish:not([data-open]) {
    animation-duration: ${webLightTheme.durationSlow};
  }
  ${surfaceSelector}.with-descendant {
    display: block;
  }
  ${surfaceSelector}.with-descendant:not([data-open]) {
    animation-name: surfaceFade;
  }
  ${surfaceSelector} .decorative {
    animation: decorativeMotion ${exitDuration} linear;
  }
  @media (prefers-reduced-motion: reduce) {
    ${surfaceSelector},
    ${surfaceSelector}::backdrop {
      animation: none !important;
      transition: none !important;
    }
  }
`;

type ExampleProps = Pick<DialogProps, 'modalType' | 'unmountOnClose'> & {
  className?: string;
  component?: 'dialog' | 'drawer' | 'nav-drawer';
};

const Example = ({ className, component = 'dialog', modalType, unmountOnClose = true }: ExampleProps) => {
  const [open, setOpen] = React.useState(false);
  const content = (
    <>
      <span className="decorative">Animated surface content</span>
      <button id="close-surface" onClick={() => setOpen(false)}>
        Close
      </button>
    </>
  );
  const props = {
    id: 'animated-surface',
    className,
    open,
    modalType,
    unmountOnClose,
  };

  return (
    <Provider>
      <style>{exitStyles}</style>
      {component === 'dialog' ? (
        <Dialog
          open={open}
          onOpenChange={(_, data) => setOpen(data.open)}
          modalType={modalType}
          unmountOnClose={unmountOnClose}
        >
          <DialogTrigger>
            <button id="open-surface">Open</button>
          </DialogTrigger>
          <DialogSurface id={props.id} className={className}>
            {content}
          </DialogSurface>
        </Dialog>
      ) : (
        <>
          <button id="open-surface" onClick={() => setOpen(true)}>
            Open
          </button>
          {component === 'drawer' ? (
            <Drawer {...props} onOpenChange={(_, data) => setOpen(data.open)}>
              {content}
            </Drawer>
          ) : (
            <NavDrawer {...props} onOpenChange={(_, data) => setOpen(data.open)}>
              {content}
            </NavDrawer>
          )}
        </>
      )}
    </Provider>
  );
};

const getSurfaceAnimations = (surface: HTMLElement) =>
  surface.getAnimations({ subtree: true }).filter(animation => {
    const effect = animation.effect;
    return effect && 'target' in effect && effect.target === surface;
  });

const openSurface = () => cy.get('#open-surface').realClick();
const closeSurface = () => cy.get('#close-surface').realClick();
const assertExiting = () =>
  cy.get<HTMLDialogElement>(surfaceSelector).should(([surface]) => {
    expect(surface).not.to.have.attr('data-open');
    expect(surface).not.to.have.attr('open');
    const computedStyle = surface.ownerDocument.defaultView?.getComputedStyle(surface);
    expect(computedStyle?.display).not.to.equal('none');
    expect(computedStyle?.getPropertyValue('overlay')).to.equal('auto');
  });
const finishExit = () =>
  cy.get<HTMLDialogElement>(surfaceSelector).then(([surface]) => {
    const animations = getSurfaceAnimations(surface);
    expect(animations.length).to.be.greaterThan(0);
    animations.forEach(animation => animation.finish());
  });
const setReducedMotionPreference = (value?: 'no-preference' | 'reduce') =>
  cy.then(() =>
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: value ? [{ name: 'prefers-reduced-motion', value }] : [] },
    }),
  );

describe('DialogSurface exit animations', () => {
  beforeEach(() => setReducedMotionPreference('no-preference'));
  afterEach(() => setReducedMotionPreference());

  (['modal', 'alert', 'non-modal'] as const).forEach(modalType => {
    it(`waits for exit keyframes while closing ${modalType} natively and restoring focus`, () => {
      mountBase(<Example modalType={modalType} />);
      openSurface();
      closeSurface();

      assertExiting();
      cy.get('#open-surface').should('be.focused');
      if (modalType === 'non-modal') {
        cy.get(surfaceSelector).should('not.match', ':popover-open');
      }

      finishExit();
      cy.get(surfaceSelector).should('not.exist');
    });
  });

  it('waits for all surface and backdrop animations, excluding animated descendants', () => {
    mountBase(<Example className="with-backdrop" />);
    openSurface();
    closeSurface();

    cy.get<HTMLDialogElement>(surfaceSelector).then(([surface]) => {
      const animations = getSurfaceAnimations(surface);
      expect(
        animations.some(animation => 'animationName' in animation && animation.animationName === 'backdropExit'),
      ).to.equal(true);
      animations
        .filter(animation => 'animationName' in animation && animation.animationName === 'surfaceFade')
        .forEach(animation => animation.finish());
    });
    cy.get(surfaceSelector).should('exist');
    finishExit();
    cy.get(surfaceSelector).should('not.exist');
  });

  it('waits for CSS exit transitions', () => {
    mountBase(<Example className="with-transition" />);
    openSurface();
    closeSurface();

    assertExiting();
    cy.get<HTMLDialogElement>(surfaceSelector).then(([surface]) => {
      expect(getSurfaceAnimations(surface).some(animation => 'transitionProperty' in animation)).to.equal(true);
    });
    finishExit();
    cy.get(surfaceSelector).should('not.exist');
  });

  it('does not wait for finite animations on descendants', () => {
    mountBase(<Example className="with-descendant" />);
    openSurface();
    closeSurface();
    cy.get<HTMLDialogElement>(surfaceSelector).then(([surface]) => {
      const child = surface.querySelector('.decorative');
      expect(child?.getAnimations().some(animation => animation.playState === 'running')).to.equal(true);
      getSurfaceAnimations(surface).forEach(animation => animation.finish());
      expect(child?.getAnimations().some(animation => animation.playState === 'running')).to.equal(true);
    });
    cy.get(surfaceSelector).should('not.exist');
  });

  it('unmounts after exit animations are cancelled', () => {
    mountBase(<Example />);
    openSurface();
    closeSurface();
    cy.get<HTMLDialogElement>(surfaceSelector).then(([surface]) => {
      getSurfaceAnimations(surface).forEach(animation => animation.cancel());
    });
    cy.get(surfaceSelector).should('not.exist');
  });

  it('unmounts when exit keyframes finish naturally', () => {
    mountBase(<Example className="natural-finish" />);
    openSurface();
    closeSurface();
    assertExiting();
    cy.get(surfaceSelector).should('not.exist');
  });

  it('does not let a previous exit unmount a reopened surface', () => {
    let exitAnimations: Animation[] = [];
    let exitFinished: Promise<Animation>[] = [];
    mountBase(<Example />);
    openSurface();
    closeSurface();
    cy.get<HTMLDialogElement>(surfaceSelector).then(([surface]) => {
      exitAnimations = getSurfaceAnimations(surface);
      exitFinished = exitAnimations.map(animation => animation.finished);
    });
    openSurface();
    cy.get(surfaceSelector).should(([surface]) => {
      expect(surface).to.have.attr('data-open');
      expect(surface).to.have.attr('open');
    });
    cy.then(() => {
      exitAnimations.forEach(animation => animation.cancel());
      return Promise.all(
        exitFinished.map(finished =>
          finished.then(
            () => undefined,
            () => undefined,
          ),
        ),
      );
    });
    cy.get(surfaceSelector).should('have.attr', 'data-open');
    cy.get(surfaceSelector).should('have.attr', 'open');
    closeSurface();
    finishExit();
    cy.get(surfaceSelector).should('not.exist');
  });

  (['no-motion', 'infinite', 'paused'] as const).forEach(className => {
    it(`unmounts immediately for ${className}, even with animated descendants`, () => {
      mountBase(<Example className={className} />);
      openSurface();
      closeSurface();
      cy.get(surfaceSelector).should('not.exist');
    });
  });

  it('preserves unmountOnClose=false after motion completes', () => {
    mountBase(<Example unmountOnClose={false} />);
    openSurface();
    closeSurface();
    finishExit();
    cy.get(surfaceSelector).should('exist').and('not.be.visible');
    cy.get(surfaceSelector).should('not.have.attr', 'open');
  });

  (['drawer', 'nav-drawer'] as const).forEach(component => {
    it(`inherits animation-aware unmounting in ${component}`, () => {
      mountBase(<Example component={component} />);
      openSurface();
      closeSurface();
      assertExiting();
      finishExit();
      cy.get(surfaceSelector).should('not.exist');
    });
  });

  describe('reduced motion', () => {
    it('unmounts immediately when consumer styles honor prefers-reduced-motion', () => {
      setReducedMotionPreference('reduce');
      mountBase(<Example className="with-backdrop" />);
      openSurface();
      closeSurface();
      cy.get(surfaceSelector).should('not.exist');
    });
  });
});
