import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import { setResponsiveMode, withResponsiveMode, ResponsiveMode } from './withResponsiveMode';
import { setSSR } from '../../Utilities';

@withResponsiveMode
class Example extends React.Component<any, any> {
  public render() {
    return <div />;
  }
}

describe('withResponsiveMode', () => {

  it('can be used in a server scenario', () => {
    setSSR(true);

    setResponsiveMode(ResponsiveMode.large);
    expect(() => ReactTestUtils.renderIntoDocument(<Example />)).toBeDefined();

    setSSR(false);
  });

  it('throws in server scenario when responsive mode is not specified', () => {
    setSSR(true);

    setResponsiveMode(undefined);
    expect(() => ReactTestUtils.renderIntoDocument(<Example />)).toThrow();

    setSSR(false);
  });

});