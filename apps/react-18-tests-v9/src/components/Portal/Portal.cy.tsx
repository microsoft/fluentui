import * as React from 'react';
import { Portal, teamsLightTheme, FluentProvider } from '@fluentui/react-components';
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
    <FluentProvider theme={teamsLightTheme}>
      <button id="trigger" onClick={() => setOpen(!open)}>
        Toggle Portal
      </button>
      {open && (
        <Portal>
          <div>
            <button id="focusTarget" ref={ref}>
              Test Button
            </button>
          </div>
        </Portal>
      )}
    </FluentProvider>
  );
};

it('should set focus visible attribute on content when focused', () => {
  mount(<TestComponent />);
  cy.realPress('Tab');
  cy.get('#trigger').focus().realPress('Enter');
  cy.get('#focusTarget').should('have.attr', 'data-fui-focus-visible');
});
