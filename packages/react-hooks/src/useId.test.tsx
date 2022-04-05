import * as React from 'react';
import { mount } from 'enzyme';
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
    mount(<TestComponent />);
    expect(id).toBeDefined();
    expect(id).toMatch(/^foo/);
  });

  validateHookValueNotChanged('uses the same ID without prefix', () => [useId()]);

  validateHookValueNotChanged('uses the same ID with prefix', () => [useId('foo')]);
});
