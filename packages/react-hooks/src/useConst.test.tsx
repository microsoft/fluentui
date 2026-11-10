import * as React from 'react';
import { render } from '@testing-library/react';
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
    const wrapper = render(<TestComponent />);

    const firstValue = wrapper.container.textContent;
    // Re-render the component
    wrapper.rerender(<TestComponent />);
    // Text should be the same
    expect(wrapper.container.textContent).toBe(firstValue);
    // Function shouldn't have been called again
    expect(initializer).toHaveBeenCalledTimes(1);
  });

  it('works with a function initializer which returns undefined', () => {
    const initializer = jest.fn(() => undefined);
    const TestComponent: React.FunctionComponent = () => {
      const value = useConst(initializer);
      return <div>{value}</div>;
    };
    const wrapper = render(<TestComponent />);
    // Re-render the component
    wrapper.rerender(<TestComponent />);
    // Function shouldn't have been called again
    expect(initializer).toHaveBeenCalledTimes(1);
  });
});
