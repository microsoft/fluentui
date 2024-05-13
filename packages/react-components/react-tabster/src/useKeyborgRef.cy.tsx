import * as React from 'react';
import { useKeyborgRef } from './hooks/useKeyborgRef';
import { mount } from '@cypress/react';

describe('Keyborg', () => {
  const Example = () => {
    const keyborgRef = useKeyborgRef();
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (elementRef.current) {
        elementRef.current.innerHTML = keyborgRef.current ? 'pass' : 'fail';
      }
    });

    return <div id="result" ref={elementRef} />;
  };

  it('should create keyborg instance', () => {
    mount(<Example />);
    cy.contains('pass');
  });

  it('should dispose keyborg instance on unmount', () => {
    mount(<Example />);
    cy.window().then(win => {
      // @ts-expect-error - Only way to definitively check if keyborg is disposed
      expect(win.__keyborg).not.equals(undefined);
    });
    mount(<div>Unmounted</div>);
    cy.window().then(win => {
      // @ts-expect-error - Only way to definitively check if keyborg is disposed
      expect(win.__keyborg).equals(undefined);
    });
  });
});
