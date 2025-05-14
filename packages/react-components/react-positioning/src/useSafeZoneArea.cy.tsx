import 'cypress-real-events';
import { mount as mountBase } from '@cypress/react';
import {
  usePositioning,
  useSafeZoneArea,
  type PositioningProps,
  type SafeBufferAreaOptions,
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
  );
};

const Example = ({
  containerHeight = 400,

  popoverWidth = 150,
  popoverHeight = 300,

  onSafeZoneLeave,
  onSafeZoneEnter,

  positioning,
  triggerStyle,
}: {
  containerHeight?: number;

  popoverHeight?: number;
  popoverWidth?: number;

  positioning: Pick<PositioningProps, 'align' | 'position' | 'offset'>;
  triggerStyle?: React.CSSProperties;
} & Pick<SafeBufferAreaOptions, 'onSafeZoneEnter' | 'onSafeZoneLeave'>) => {
  const safeZoneArea = useSafeZoneArea({
    debug: true,
    timeout: 100000,
    onSafeZoneLeave,
    onSafeZoneEnter,
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
          ...triggerStyle,
          cursor: 'pointer',
          position: 'absolute',
          width: '100px',
          height: '80px',
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
    mount(
      <Example
        triggerStyle={{ left: 50, top: 150 }}
        popoverHeight={300}
        positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }}
      />,
    );

    cy.get('.trigger').realHover({ position: 'center' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');
    cy.get('[data-safe-zone] svg').should('have.css', 'width', '120px');
    cy.get('[data-safe-zone] svg').should('have.css', 'height', '344px');
  });

  it('onSafeZoneEnter and onSafeZoneLeave are called', () => {
    const onSafeZoneEnter = cy.stub().as('onSafeZoneEnter');
    const onSafeZoneLeave = cy.stub().as('onSafeZoneLeave');

    mount(
      <Example
        triggerStyle={{ left: 50, top: 150 }}
        popoverHeight={300}
        positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }}
        onSafeZoneLeave={onSafeZoneLeave}
        onSafeZoneEnter={onSafeZoneEnter}
      />,
    );

    cy.get('.trigger').realHover({ position: 'center' });
    cy.get('.trigger').realMouseMove(10, 10, { position: 'topRight' });

    cy.get('@onSafeZoneEnter').should('be.called');

    // ---

    cy.get('.trigger').realMouseMove(-50, -10, { position: 'topRight' });
    cy.get('.trigger').should('be.visible');

    cy.get('@onSafeZoneLeave').should('be.called');
  });

  it('safe zone is hidden once mouse is over the popover', () => {
    mount(
      <Example
        triggerStyle={{ left: 50, top: 150 }}
        popoverHeight={300}
        positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }}
      />,
    );

    cy.get('.trigger').realHover({ position: 'center' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.get('.popover').realHover({ position: 'center' });
    cy.get('[data-safe-zone]').should('have.css', 'display', 'none');
  });
});
