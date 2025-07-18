import * as React from 'react';
import { Portal } from '@fluentui/react-components';
import { mount as mountBase } from '@cypress/react';

import { Provider } from '../../components/Provider/Provider';

const mount = (element: React.JSX.Element) => {
  mountBase(<Provider>{element}</Provider>);
};

const TestComponent: React.FC = () => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [open]);

  return (
    <>
      <button id="trigger" onClick={() => setOpen(!open)}>
        Toggle Portal
      </button>
      {open && (
        <Portal>
          <div style={{ position: 'fixed', top: 200, left: 100, padding: 20, background: '#ccc' }}>
            <button id="focusTarget" ref={ref}>
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

    cy.get('#trigger').focus().realClick();
    cy.get('body > [data-portal-node="true"]').should('have.length', 1);
    cy.get('body > [data-portal-node="true"]').first().should('contain.text', 'Test Button');
  });

  it('should remove the element from the body when closed', () => {
    mount(<TestComponent />);

    // Open the portal
    cy.get('#trigger').focus().realClick();
    cy.get('body').children().should('have.length', 2); // One for the [data-cy-root], one for the portal

    // Close the portal
    cy.get('#trigger').focus().realClick();
    cy.get('body').children().should('have.length', 1);
    cy.get('body').children().first().should('have.attr', 'data-cy-root');
  });
});
