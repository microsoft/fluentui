import * as React from 'react';
import { mount } from 'enzyme';
import { useUnmount } from './useUnmount';

describe('useUnmount', () => {
  it('fires a callback', () => {
    let value = false;

    const TestComponent: React.FunctionComponent = () => {
      useUnmount(() => {
        value = true;
      });

      return <>Test Component</>;
    };

    const wrapper = mount(<TestComponent />);
    expect(value).toBe(false);
    wrapper.unmount();
    expect(value).toBe(true);
  });
});
