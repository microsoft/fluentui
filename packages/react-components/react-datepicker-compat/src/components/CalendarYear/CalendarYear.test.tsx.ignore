import * as React from 'react';
import { render } from '@testing-library/react';
import { CalendarYear } from './CalendarYear';
import { isConformant } from '../../testing/isConformant';

describe('CalendarYear', () => {
  isConformant({
    Component: CalendarYear,
    displayName: 'CalendarYear',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CalendarYear>Default CalendarYear</CalendarYear>);
    expect(result.container).toMatchSnapshot();
  });
});
