import * as React from 'react';
import { mount } from 'enzyme';
import { useForceUpdate } from './useForceUpdate';

describe('useForceUpdate', () => {
  it('component updates when force update is called', () => {
    let renderCount = 0;
    const TestComponent: React.FunctionComponent = () => {
      const forceUpdate = useForceUpdate();
      React.useEffect(() => forceUpdate(), [forceUpdate]);

      renderCount++;
      return <>Test Component</>;
    };

    mount(<TestComponent />);
    expect(renderCount).toBe(2);
  });
});
