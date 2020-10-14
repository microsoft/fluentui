import * as React from 'react';
import { mount } from 'enzyme';
import { useMountSync } from './useMountSync';

describe('useMountSync', () => {
  it('fires a callback', () => {
    let value = false;

    const TestComponent: React.FunctionComponent = () => {
      useMountSync(() => {
        value = true;
      });

      return <>Test Component</>;
    };

    mount(<TestComponent />);
    expect(value).toBe(true);
  });
});
