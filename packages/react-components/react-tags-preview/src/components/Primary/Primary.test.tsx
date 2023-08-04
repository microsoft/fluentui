import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Primary } from './Primary';

describe('Primary', () => {
  isConformant({
    Component: Primary,
    displayName: 'Primary',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Primary>Default Primary</Primary>);
    expect(result.container).toMatchSnapshot();
  });
});
