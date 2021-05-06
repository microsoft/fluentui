import * as React from 'react';
import { mount } from 'enzyme';
import { useConst } from './useConst';
import { validateHookValueNotChanged } from './testUtilities';

describe('useConst', () => {
  validateHookValueNotChanged('returns the same value with value initializer', () => [useConst(Math.random())]);

  validateHookValueNotChanged('returns the same value with function initializer', () => [
    useConst(() => Math.random()),
  ]);

  it('calls the function initializer only once', () => {
    const initializer = jest.fn(() => Math.random());
    const TestComponent: React.FunctionComponent = () => {
      const value = useConst(initializer);
      return <div>{value}</div>;
    };
    const wrapper = mount(<TestComponent />);
    const firstValue = wrapper.text();
    // Re-render the component
    wrapper.update();
    // Text should be the same
    expect(wrapper.text()).toBe(firstValue);
    // Function shouldn't have been called again
    expect(initializer).toHaveBeenCalledTimes(1);
  });

  it('works with a function initializer which returns undefined', () => {
    const initializer = jest.fn(() => undefined);
    const TestComponent: React.FunctionComponent = () => {
      const value = useConst(initializer);
      return <div>{value}</div>;
    };
    const wrapper = mount(<TestComponent />);
    // Re-render the component
    wrapper.update();
    // Function shouldn't have been called again
    expect(initializer).toHaveBeenCalledTimes(1);
  });
});
