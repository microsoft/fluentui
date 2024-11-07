import * as React from 'react';
import { mount } from '@cypress/react';
import { createPresenceComponent } from './createPresenceComponent';
import { MotionBehaviourProvider } from '../contexts/MotionBehaviourContext';

describe('createPresenceComponent', () => {
  it('should call onMotionCancel', () => {
    const TestMotion = createPresenceComponent({
      enter: { keyframes: [{ opacity: 0 }, { opacity: 1 }], duration: 1000 },
      exit: { keyframes: [{ opacity: 1 }, { opacity: 0 }], duration: 1000 },
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

    cy.get('#toggle').click().wait(100).click().get('#cancel').should('have.text', '1');
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
