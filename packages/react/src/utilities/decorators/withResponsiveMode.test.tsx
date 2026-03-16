import * as React from 'react';
import { render } from '@testing-library/react';
import { setResponsiveMode, withResponsiveMode, ResponsiveMode } from './withResponsiveMode';

import type { JSXElement } from '@fluentui/utilities';

@withResponsiveMode
class Example extends React.Component<any, any> {
  public render(): JSXElement {
    return <div />;
  }
}

describe('withResponsiveMode', () => {
  it('can be used in a server scenario', () => {
    setResponsiveMode(ResponsiveMode.large);
    expect(() => render(<Example />)).toBeTruthy();
  });
});
