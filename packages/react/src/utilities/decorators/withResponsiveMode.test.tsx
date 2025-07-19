import * as React from 'react';
import { render } from '@testing-library/react';
import { setResponsiveMode, withResponsiveMode, ResponsiveMode } from './withResponsiveMode';

// eslint-disable-next-line @typescript-eslint/no-deprecated
@withResponsiveMode
class Example extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
    return <div />;
  }
}

describe('withResponsiveMode', () => {
  it('can be used in a server scenario', () => {
    setResponsiveMode(ResponsiveMode.large);
    expect(() => render(<Example />)).toBeTruthy();
  });
});
