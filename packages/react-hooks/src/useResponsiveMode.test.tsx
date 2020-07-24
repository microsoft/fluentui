import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { setResponsiveMode, ResponsiveMode } from './useResponsiveMode';
import { setSSR } from '@uifabric/Utilities';

describe('withResponsiveMode', () => {
  it('can be used in a server scenario', () => {
    const TestComponent: React.FunctionComponent = () => {
      return <div />;
    };

    setSSR(true);

    setResponsiveMode(ResponsiveMode.large);
    expect(() => ReactTestUtils.renderIntoDocument(<TestComponent />)).toBeDefined();

    setSSR(false);
  });
});
