import * as React from 'react';
import { mount } from 'enzyme';
import { useMountSync } from './useMountSync';

describe('useMountSync', () => {
  it('fires a callback', () => {
    const onMount = jest.fn();

    const TestComponent: React.FunctionComponent = () => {
      // eslint-disable-next-line deprecation/deprecation
      useMountSync(() => {
        onMount();
      });

      return <>Test Component</>;
    };

    expect(onMount).toHaveBeenCalledTimes(0);
    const wrapper = mount(<TestComponent />);
    expect(onMount).toHaveBeenCalledTimes(1);
    wrapper.unmount();
    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
