import * as React from 'react';
import { render } from '@testing-library/react';
import { Toolbar } from './Toolbar';
import { isConformant } from '../../testing/isConformant';

describe('Toolbar', () => {
  isConformant({
    Component: Toolbar,
    displayName: 'Toolbar',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onCheckedValueChange'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Toolbar>Default Toolbar</Toolbar>);
    expect(result.container).toMatchSnapshot();
  });
});
