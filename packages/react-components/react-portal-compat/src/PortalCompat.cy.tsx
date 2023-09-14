import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { PortalCompatProvider } from '@fluentui/react-portal-compat';
import { usePortalCompat } from '@fluentui/react-portal-compat-context';

const mount = (element: JSX.Element) => {
  mountBase(
    <FluentProvider theme={teamsLightTheme}>
      <PortalCompatProvider>{element}</PortalCompatProvider>
    </FluentProvider>,
  );
};

describe('PortalCompat', () => {
  const Example = () => {
    const registerPortal = usePortalCompat();
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (ref.current) {
        return registerPortal(ref.current);
      }
    }, [registerPortal]);

    return (
      <div ref={ref}>
        <button>First</button>
        <button>Second</button>
      </div>
    );
  };

  it('should apply focus visible ponyfill', () => {
    mount(<Example />);
    cy.contains('First').focus().realPress('Tab');
    cy.contains('Second').should('have.attr', 'data-fui-focus-visible');
  });
});
