import * as React from 'react';
import { render } from '@testing-library/react';
import { CalendarPicker } from './CalendarPicker';
import { isConformant } from '../../testing/isConformant';

describe('CalendarPicker', () => {
  isConformant({
    Component: CalendarPicker,
    displayName: 'CalendarPicker',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CalendarPicker>Default CalendarPicker</CalendarPicker>);
    expect(result.container).toMatchSnapshot();
  });
});
