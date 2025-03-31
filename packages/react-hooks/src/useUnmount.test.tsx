import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useUnmount } from './useUnmount';

describe('useUnmount', () => {
  it('fires a callback', () => {
    const onUnmount = jest.fn();

    const TestComponent: React.FunctionComponent = () => {
      useUnmount(() => {
        onUnmount();
      });

      return <>Test Component</>;
    };

    expect(onUnmount).toHaveBeenCalledTimes(0);
    const wrapper = mount(<TestComponent />);
    expect(onUnmount).toHaveBeenCalledTimes(0);
    ReactTestUtils.act(() => {
      wrapper.unmount();
    });
    expect(onUnmount).toHaveBeenCalledTimes(1);
  });
});
