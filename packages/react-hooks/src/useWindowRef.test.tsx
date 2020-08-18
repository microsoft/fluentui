import * as React from 'react';
import { mount } from 'enzyme';
import { useWindowRef } from './useWindowRef';

describe('useWindowRef', () => {
  it('returns window ref', () => {
    let lastRef: React.RefObject<Window> = React.createRef();
    const TestComponent: React.FunctionComponent = () => {
      const rootRef = React.useRef(null);
      lastRef = useWindowRef(rootRef);
      return <div ref={rootRef} />;
    };

    const wrapper = mount(<TestComponent />);
    expect(lastRef).toBeDefined();
    expect(lastRef.current).toBe(window);
    wrapper.unmount();
    expect(lastRef.current).toBe(null);
  });
});
