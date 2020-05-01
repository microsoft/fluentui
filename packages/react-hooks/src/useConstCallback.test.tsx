import * as React from 'react';
import { mount } from 'enzyme';
import { useConstCallback } from './useConstCallback';

describe('useConstCallback', () => {
  it('returns the same callback', () => {
    let lastCallback: () => string;
    const TestComponent: React.FunctionComponent = () => {
      const callback = useConstCallback(() => 'hi');
      lastCallback = callback;
      return <div>{callback()}</div>;
    };

    const wrapper = mount(<TestComponent />);
    const initialCallback = lastCallback!;
    // Re-render the component
    wrapper.update();
    // Callback should be the same
    expect(lastCallback!).toBe(initialCallback);
  });

  it('does not call the callback', () => {
    const callback = jest.fn(() => 'hi');
    const TestComponent: React.FunctionComponent = () => {
      const cb = useConstCallback(callback);
      expect(cb).toHaveBeenCalledTimes(0);
      return <div>{cb()}</div>;
    };
    mount(<TestComponent />);
  });
});
