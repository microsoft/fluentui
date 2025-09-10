import * as React from 'react';
import { Portal } from '@fluentui/react-components';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../../components/Provider/Provider';

const mount = (element: JSXElement) => {
  mountBase(<Provider>{element}</Provider>);
};

const TestComponent: React.FC<{ focusTargetId?: string; triggerId?: string; children?: React.ReactNode }> = ({
  children,
  focusTargetId = 'focusTarget',
  triggerId = 'trigger',
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [open]);

  return (
    <>
      <button id={triggerId} onClick={() => setOpen(!open)}>
        Toggle Portal
      </button>
      {open && (
        <Portal>
          <div style={{ position: 'fixed', top: 200, left: 100, padding: 20, background: '#ccc' }}>
            {children}
            <button id={focusTargetId} ref={ref}>
              Test Button
            </button>
          </div>
        </Portal>
      )}
    </>
  );
};

describe('Portal', () => {
  it('should set focus visible attribute on content when focused', () => {
    mount(<TestComponent />);

    cy.realPress('Tab');
    cy.get('#trigger').focus().realPress('Enter');
    cy.get('#focusTarget').should('have.attr', 'data-fui-focus-visible');
  });

  it('should create an element in the body', () => {
    mount(<TestComponent />);

    cy.get('#trigger').realClick();
    cy.get('body > [data-portal-node="true"]').should('have.length', 1);
    cy.get('body > [data-portal-node="true"]').first().should('contain.text', 'Test Button');
  });

  it('should remove the element from the body when closed', () => {
    mount(<TestComponent />);

    // Open the portal
    cy.get('#trigger').realClick();
    cy.get('body').children().should('have.length', 2); // One for the [data-cy-root], one for the portal

    // Close the portal
    cy.get('#trigger').realClick();
    cy.get('body').children().should('have.length', 1);
    cy.get('body').children().first().should('have.attr', 'data-cy-root');
  });

  it('empty portal renders as expected', () => {
    mount(<Portal />);

    cy.get('body > [data-portal-node="true"]').should('exist');
    // Check that the portal is empty (has no children except the <span hidden /> element)
    cy.get('body > [data-portal-node="true"]')
      .children()
      .should('have.length', 1)
      .first()
      .should('match', 'span[hidden]');
  });

  it('remounting the portal should not cause issues', () => {
    mount(<TestComponent />);

    // Open the portal
    cy.get('#trigger').realClick();
    cy.get('body > [data-portal-node="true"]').should('exist');

    // Close the portal
    cy.get('#trigger').realClick();
    cy.get('body > [data-portal-node="true"]').should('not.exist');

    // Open the portal again
    cy.get('#trigger').realClick();
    cy.get('body > [data-portal-node="true"]').should('exist');
  });

  it('should handle multiple portals independently', () => {
    mount(
      <>
        <TestComponent triggerId="triggerA" focusTargetId="focusTargetA">
          <div id="portalA">Portal A Content</div>
        </TestComponent>
        <TestComponent triggerId="triggerB" focusTargetId="focusTargetB">
          <div id="portalB">Portal B Content</div>
        </TestComponent>
      </>,
    );

    // Initially no portals
    cy.get('body > [data-portal-node="true"]').should('not.exist');

    // Open Portal A
    cy.get('#triggerA').realClick();
    cy.get('body > [data-portal-node="true"]').should('have.length', 1);
    cy.get('#portalA').should('exist').and('contain.text', 'Portal A Content');

    // Open Portal B
    cy.get('#triggerB').realClick();
    cy.get('body > [data-portal-node="true"]').should('have.length', 2);
    cy.get('#portalA').should('exist');
    cy.get('#portalB').should('exist').and('contain.text', 'Portal B Content');

    // Close Portal A, Portal B should remain
    cy.get('#triggerA').realClick();
    cy.get('body > [data-portal-node="true"]').should('have.length', 1);
    cy.get('#portalA').should('not.exist');
    cy.get('#portalB').should('exist');

    // Close Portal B
    cy.get('#triggerB').realClick();
    cy.get('body > [data-portal-node="true"]').should('not.exist');
    cy.get('#portalB').should('not.exist');
  });
});
