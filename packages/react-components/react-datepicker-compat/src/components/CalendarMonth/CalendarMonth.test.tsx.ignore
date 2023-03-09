import * as React from 'react';
import { render } from '@testing-library/react';
import { CalendarMonth } from './CalendarMonth';
import { isConformant } from '../../testing/isConformant';

describe('CalendarMonth', () => {
  isConformant({
    Component: CalendarMonth,
    displayName: 'CalendarMonth',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CalendarMonth>Default CalendarMonth</CalendarMonth>);
    expect(result.container).toMatchSnapshot();
  });
});
