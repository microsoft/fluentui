import * as React from 'react';
import { render } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { isConformant } from '../../testing/isConformant';

describe('DatePicker', () => {
  isConformant({
    Component: DatePicker,
    displayName: 'DatePicker',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DatePicker>Default DatePicker</DatePicker>);
    expect(result.container).toMatchSnapshot();
  });
});
