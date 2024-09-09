import * as React from 'react';
import { mount } from '@cypress/react';
import { useObservedElement, useFocusObserved } from './hooks';

describe('useFocusObserved', () => {
  it('should focus observed element within timeout', () => {
    const Example = () => {
      const observedName = 'foo';
      const [mounted, setMounted] = React.useState(false);
      const focus = useFocusObserved(observedName);
      const attr = useObservedElement(observedName);

      const onClick = () => {
        focus();
        setTimeout(() => setMounted(true), 500);
      };

      return (
        <>
          <button onClick={onClick}>Focus</button>
          {mounted && <button {...attr}>Foo</button>}
        </>
      );
    };

    mount(<Example />);
    cy.contains('Focus').click().get('body').contains('Foo').should('be.focused');
  });

  it('should focus observed element with multiple names', () => {
    const Example = () => {
      const observedNames = ['foo', 'bar'];
      const [mounted, setMounted] = React.useState(false);
      const focus = useFocusObserved(observedNames[1]);
      const attr = useObservedElement(observedNames);

      const onClick = () => {
        focus();
        setTimeout(() => setMounted(true), 500);
      };

      return (
        <>
          <button onClick={onClick}>Focus</button>
          {mounted && <button {...attr}>Foo</button>}
        </>
      );
    };

    mount(<Example />);
    cy.contains('Focus').click().get('body').contains('Foo').should('be.focused');
  });

  it('should not focus after timeout', () => {
    const Example = () => {
      const observedNames = ['foo', 'bar'];
      const [mounted, setMounted] = React.useState(false);
      const focus = useFocusObserved(observedNames[1]);
      const attr = useObservedElement(observedNames);

      const onClick = () => {
        focus();
        setTimeout(() => setMounted(true), 2000);
      };

      return (
        <>
          <button onClick={onClick}>Focus</button>
          {mounted && <button {...attr}>Foo</button>}
        </>
      );
    };

    mount(<Example />);
    cy.contains('Focus').click().get('body').contains('Foo').should('not.be.focused');
  });
});
