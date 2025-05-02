import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';
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

    // Use React Testing Library instead of Enzyme
    const container = document.createElement('div');
    const { unmount } = render(<TestComponent />, { container });
    expect(onUnmount).toHaveBeenCalledTimes(0);

    ReactTestUtils.act(() => {
      unmount();
    });

    expect(onUnmount).toHaveBeenCalledTimes(1);
  });
});
