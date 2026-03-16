import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIds } from '@fluentui/utilities';
import { useId } from './useId';
import { validateHookValueNotChanged } from './testUtilities';

describe('useId', () => {
  afterEach(() => {
    resetIds();
  });

  it('uses prefix', () => {
    let id: string | undefined;
    const TestComponent: React.FunctionComponent = () => {
      id = useId('foo');
      return <div />;
    };
    render(<TestComponent />);
    expect(id).toBeDefined();
    expect(id).toMatch(/^foo/);
  });

  validateHookValueNotChanged('uses the same ID without prefix', () => [useId()]);

  validateHookValueNotChanged('uses the same ID with prefix', () => [useId('foo')]);
});
