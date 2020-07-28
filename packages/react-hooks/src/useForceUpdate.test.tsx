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

  it('returns the same callback each time', () => {
    let latestForceUpdate: (() => void) | undefined;
    let renderCount = 0;

    const TestComponent: React.FunctionComponent = props => {
      latestForceUpdate = useForceUpdate();
      renderCount++;
      return <div />;
    };

    const wrapper = mount(<TestComponent />);
    const firstForceUpate = latestForceUpdate;
    latestForceUpdate = undefined;

    wrapper.setProps({});
    expect(renderCount).toBe(2);
    expect(latestForceUpdate).toBe(firstForceUpate);
  });
});
