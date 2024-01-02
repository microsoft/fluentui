import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RadioPicker } from './RadioPicker';

describe('RadioPicker', () => {
  isConformant({
    Component: RadioPicker,
    displayName: 'RadioPicker',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<RadioPicker>Default RadioPicker</RadioPicker>);
    expect(result.container).toMatchSnapshot();
  });
});
