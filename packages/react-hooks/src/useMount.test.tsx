import * as React from 'react';
import { mount } from 'enzyme';
import { useMount } from './useMount';

describe('useMount', () => {
  it('fires a callback', () => {
    const onMount = jest.fn();

    const TestComponent: React.FunctionComponent = () => {
      useMount(() => {
        onMount();
      });

      return <>Test Component</>;
    };

    expect(onMount).toBeCalledTimes(0);
    const wrapper = mount(<TestComponent />);
    expect(onMount).toBeCalledTimes(1);
    wrapper.unmount();
    expect(onMount).toBeCalledTimes(1);
  });
});
