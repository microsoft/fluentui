import 'cypress-real-events';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import {
  usePositioning,
  useSafeZoneArea,
  type PositioningProps,
  type UseSafeZoneOptions,
} from '@fluentui/react-positioning';
import { Portal } from '@fluentui/react-portal';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

const mount = (node: React.ReactElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{node}</FluentProvider>);
};

/**
 * Cypress doesn't display the cursor position in the viewport, this component shows a red dot at the mouse position.
 */
const DebugPointer: React.FC = () => {
  const pointerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (pointerRef.current) {
        pointerRef.current.style.left = `${event.x - 2}px`;
        pointerRef.current.style.top = `${event.y - 2}px`;
      }
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <Portal>
      <div
        style={{
          borderRadius: '4px',
          pointerEvents: 'none',
          background: 'red',
          height: '4px',
          width: '4px',
          position: 'fixed',
        }}
        ref={pointerRef}
      />
    </Portal>
  );
};

const Example = ({
  containerHeight = 400,

  popoverWidth = 150,
  popoverHeight = 300,

  onSafeZoneLeave,
  onSafeZoneEnter,
  onSafeZoneTimeout,
  timeout = 100000,

  positioning,
  triggerStyle,
}: {
  containerHeight?: number;

  popoverHeight?: number;
  popoverWidth?: number;

  positioning: Pick<PositioningProps, 'align' | 'position' | 'offset'>;
  triggerStyle?: React.CSSProperties;
} & Pick<UseSafeZoneOptions, 'onSafeZoneEnter' | 'onSafeZoneLeave' | 'onSafeZoneTimeout' | 'timeout'>) => {
  const safeZoneArea = useSafeZoneArea({
    debug: true,
    timeout,
    onSafeZoneLeave,
    onSafeZoneEnter,
    onSafeZoneTimeout,
  });
  const { containerRef, targetRef } = usePositioning(positioning);

  return (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: containerHeight,
        background: 'lightgray',
        border: '2px dashed black',
      }}
    >
      <DebugPointer />

      <button
        ref={useMergedRefs(targetRef, safeZoneArea.targetRef)}
        className="trigger"
        style={{
          left: 50,
          top: 150,
          width: 100,
          height: 80,
          ...triggerStyle,
          cursor: 'pointer',
          position: 'absolute',
        }}
      >
        TRIGGER
      </button>

      <Portal>
        <div
          data-popper-placement="right-top"
          className="popover"
          ref={useMergedRefs(containerRef, safeZoneArea.containerRef)}
          style={{
            backgroundColor: 'orange',
            border: '2px solid black',
            position: 'absolute',
            padding: '20px',
            width: popoverWidth,
            height: popoverHeight,
          }}
        >
          POPOVER
        </div>
        {safeZoneArea.elementToRender}
      </Portal>
    </div>
  );
};

describe('useSafeZoneArea', () => {
  it('SVG is visible on hover', () => {
    mount(<Example positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }} />);

    cy.get('.trigger').realHover({ position: 'center' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');
    cy.get('[data-safe-zone] svg').should('have.css', 'width', '314px');
    cy.get('[data-safe-zone] svg').should('have.css', 'height', '344px');
  });

  ['small-trigger', 'small-container'].forEach(layout => {
    it(`onSafeZoneEnter and onSafeZoneLeave are called (${layout})`, () => {
      const onSafeZoneEnter = cy.stub().as('onSafeZoneEnter');
      const onSafeZoneLeave = cy.stub().as('onSafeZoneLeave');

      mount(
        <Example
          positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }}
          onSafeZoneLeave={onSafeZoneLeave}
          onSafeZoneEnter={onSafeZoneEnter}
          {...(layout === 'small-container' && {
            positioning: { align: 'end', position: 'above' },
            popoverHeight: 30,
            popoverWidth: 100,
            triggerStyle: { width: 300, height: 100 },
          })}
        />,
      );

      if (layout === 'small-container') {
        cy.get('.trigger').realHover({ position: 'left' });
        cy.get('.trigger').realMouseMove(100, -10, { position: 'topLeft' });
      } else {
        cy.get('.trigger').realHover({ position: 'center' });
        cy.get('.trigger').realMouseMove(10, 10, { position: 'topRight' });
      }

      cy.get('@onSafeZoneEnter').should('be.called');

      // ---

      if (layout === 'small-container') {
        cy.get('.trigger').realMouseMove(10, -10, { position: 'topLeft' });
        cy.get('.trigger').should('be.visible');
      } else {
        cy.get('.trigger').realMouseMove(-50, -10, { position: 'topRight' });
        cy.get('.trigger').should('be.visible');
      }

      cy.get('@onSafeZoneLeave').should('be.called');
    });
  });

  it('safe zone is hidden once mouse is over the popover', () => {
    mount(
      <Example popoverHeight={300} positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }} />,
    );

    cy.get('.trigger').realHover({ position: 'center' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.get('.popover').realHover({ position: 'center' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'none');
  });

  it('safe zone is stays open as long as mouse keeps moving inside it', () => {
    const onSafeZoneTimeout = cy.stub().as('onSafeZoneTimeout');

    mount(
      <Example
        popoverHeight={300}
        onSafeZoneTimeout={onSafeZoneTimeout}
        positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }}
        timeout={300}
      />,
    );

    cy.get('.trigger').realHover({ position: 'right' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.clock(0).then(() => {
      // Move the mouse inside the safe zone area, it should stay visible

      for (let startX = 10, startY = 10; startX < 15; startX++, startY++) {
        cy.get('.trigger').realMouseMove(startX, startY, { position: 'topRight' });
        cy.tick(299);

        cy.get('[data-safe-zone]').should('have.css', 'display', 'block');
      }

      // After 300ms of no movement, the safe zone should be hidden
      cy.tick(301);

      cy.get('@onSafeZoneTimeout').should('be.called');
      cy.get('[data-safe-zone]').should('have.css', 'display', 'none');
    });
  });

  it('safe zone is hidden after timeout if mouse is not moving', () => {
    const onSafeZoneTimeout = cy.stub().as('onSafeZoneTimeout');

    mount(
      <Example
        popoverHeight={300}
        onSafeZoneTimeout={onSafeZoneTimeout}
        positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }}
        timeout={200}
      />,
    );

    cy.get('.trigger').realHover({ position: 'center' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    // Wait for the timeout to finish, safe zone should be hidden

    cy.get('[data-safe-zone]').should('have.css', 'display', 'none');

    // Move again, safe zone should be shown again

    cy.get('.trigger').realHover({ position: 'right' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    // "onSafeZoneTimeout" is not called again since the mouse is still over the target element

    cy.get('@onSafeZoneTimeout').should('not.be.called');
  });

  it('onSafeZoneTimeout is called after timeout on safe zone enter', () => {
    const onSafeZoneEnter = cy.stub().as('onSafeZoneEnter');
    const onSafeZoneTimeout = cy.stub().as('onSafeZoneTimeout');

    mount(
      <Example
        positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }}
        onSafeZoneEnter={onSafeZoneEnter}
        onSafeZoneTimeout={onSafeZoneTimeout}
        timeout={200}
      />,
    );

    // Activate the safe zone

    cy.get('.trigger').realHover({ position: 'center' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    // Move over the safe zone to start the timeout

    cy.get('.trigger').realMouseMove(10, 10, { position: 'topRight' });
    cy.get('@onSafeZoneEnter').should('be.called');

    // Wait for the timeout to finish

    cy.get('@onSafeZoneTimeout').should('be.called');
    cy.get('[data-safe-zone]').should('have.css', 'display', 'none');
  });
});
