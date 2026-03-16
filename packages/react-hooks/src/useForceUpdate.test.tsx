import * as React from 'react';
import { render } from '@testing-library/react';
import { useForceUpdate } from './useForceUpdate';
import { validateHookValueNotChanged } from './testUtilities';

describe('useForceUpdate', () => {
  it('updates component when called', () => {
    let renderCount = 0;
    const TestComponent: React.FunctionComponent = () => {
      const forceUpdate = useForceUpdate();
      React.useEffect(() => forceUpdate(), [forceUpdate]);

      renderCount++;
      return <>Test Component</>;
    };

    render(<TestComponent />);
    expect(renderCount).toBe(2);
  });

  validateHookValueNotChanged('returns the same callback each time', () => [useForceUpdate()]);
});
