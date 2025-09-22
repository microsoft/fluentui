import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { createPresenceComponent } from './createPresenceComponent';
import { MotionBehaviourProvider } from '../contexts/MotionBehaviourContext';

describe('createPresenceComponent', () => {
  const noop = () => {
    return;
  };
  // Ensure reduced-motion is disabled for deterministic animation behavior
  beforeEach(() => {
    cy.window().then(win => {
      const orig = win.matchMedia;
      // Redefine matchMedia so that prefers-reduced-motion never matches
      Object.defineProperty(win, 'matchMedia', {
        configurable: true,
        value: (query: string) => {
          if (query.includes('prefers-reduced-motion')) {
            return {
              matches: false,
              media: query,
              onchange: null,
              addListener: noop, // deprecated API still sometimes read
              removeListener: noop,
              addEventListener: noop,
              removeEventListener: noop,
              dispatchEvent: () => false,
            };
          }
          return orig.call(win, query);
        },
      });
    });
  });

  it('should call onMotionCancel', () => {
    const TestMotion = createPresenceComponent({
      enter: { keyframes: [{ opacity: 0 }, { opacity: 1 }], duration: 4000 },
      exit: { keyframes: [{ opacity: 1 }, { opacity: 0 }], duration: 4000 },
    });

    const TestComponent = () => {
      const [visible, setVisible] = React.useState(true);
      const [cancel, setCancel] = React.useState(0);

      return (
        <>
          <button id="toggle" onClick={() => setVisible(!visible)}>
            Toggle
          </button>
          <TestMotion
            visible={visible}
            onMotionCancel={(ev, data) => {
              setCancel(s => s + 1);
            }}
          >
            <div />
          </TestMotion>

          <div id="cancel">{cancel}</div>
        </>
      );
    };

    mount(<TestComponent />);

    // First toggle: start exit motion
    cy.get('#toggle').click();

    // Give React effect a couple of frames to start the animation rather than an arbitrary ms wait
    cy.window().then(
      win =>
        new Cypress.Promise<void>(resolve => {
          requestAnimationFrame(() => {
            win.requestAnimationFrame(() => resolve());
          });
        }),
    );

    // Second toggle: should cancel the in-flight exit animation and trigger onMotionCancel
    cy.get('#toggle').click();

    cy.get('#cancel').should('have.text', '1');
  });

  it('should disable motion with motion disable provider', () => {
    const TestMotion = createPresenceComponent({
      enter: { keyframes: [{ opacity: 0 }, { opacity: 0, offset: 0.9 }], duration: 60000 },
      exit: { keyframes: [{ opacity: 1 }, { opacity: 0 }], duration: 60000 },
    });

    const TestComponent = () => {
      const [visible, setVisible] = React.useState(true);

      return (
        <>
          <button id="toggle" onClick={() => setVisible(!visible)}>
            Toggle
          </button>
          <MotionBehaviourProvider value="skip">
            <TestMotion appear visible={visible}>
              <div>Hello World</div>
            </TestMotion>
          </MotionBehaviourProvider>
        </>
      );
    };

    mount(<TestComponent />);
    cy.contains('Hello World', { timeout: 100 }).should('be.visible');
  });
});
