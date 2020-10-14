import * as React from 'react';
import { mount } from 'enzyme';
import { useMount } from './useMount';

describe('useMount', () => {
  it('fires a callback', () => {
    let value = false;

    const TestComponent: React.FunctionComponent = () => {
      useMount(() => {
        value = true;
      });

      return <>Test Component</>;
    };

    mount(<TestComponent />);
    expect(value).toBe(true);
  });
});
