import * as React from 'react';
import { render } from '@testing-library/react';
import { Switch } from './Switch';
import { isConformant } from '../../common/isConformant';

describe('Switch', () => {
  isConformant({
    Component: Switch,
    displayName: 'Switch',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Switch>Default Switch</Switch>);
    expect(result.container).toMatchSnapshot();
  });
});
