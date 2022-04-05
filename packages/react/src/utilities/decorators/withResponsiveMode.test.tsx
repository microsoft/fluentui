import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { setResponsiveMode, withResponsiveMode, ResponsiveMode } from './withResponsiveMode';
import { setSSR } from '../../Utilities';

// eslint-disable-next-line deprecation/deprecation
@withResponsiveMode
class Example extends React.Component<any, any> {
  public render(): JSX.Element {
    return <div />;
  }
}

describe('withResponsiveMode', () => {
  it('can be used in a server scenario', () => {
    setSSR(true);

    setResponsiveMode(ResponsiveMode.large);
    expect(() => ReactTestUtils.renderIntoDocument(<Example />)).toBeTruthy();

    setSSR(false);
  });
});
