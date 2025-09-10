import * as React from 'react';
import { render } from '@testing-library/react';
import { useMountSync } from './useMountSync';

describe('useMountSync', () => {
  it('fires a callback', () => {
    const onMount = jest.fn();

    const TestComponent: React.FunctionComponent = () => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      useMountSync(() => {
        onMount();
      });

      return <>Test Component</>;
    };

    expect(onMount).toHaveBeenCalledTimes(0);
    const { unmount } = render(<TestComponent />);
    expect(onMount).toHaveBeenCalledTimes(1);
    unmount();
    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
