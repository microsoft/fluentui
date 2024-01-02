import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RadioSwatch } from './RadioSwatch';

describe('RadioSwatch', () => {
  isConformant({
    Component: RadioSwatch,
    displayName: 'RadioSwatch',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<RadioSwatch>Default RadioSwatch</RadioSwatch>);
    expect(result.container).toMatchSnapshot();
  });
});
