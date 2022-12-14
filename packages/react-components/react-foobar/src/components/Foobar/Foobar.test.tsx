import * as React from 'react';
import { render } from '@testing-library/react';
import { Foobar } from './Foobar';
import { isConformant } from '../../testing/isConformant';

describe('Foobar', () => {
  isConformant({
    Component: Foobar,
    displayName: 'Foobar',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Foobar>Default Foobar</Foobar>);
    expect(result.container).toMatchSnapshot();
  });
});
