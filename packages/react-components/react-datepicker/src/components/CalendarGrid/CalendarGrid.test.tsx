import * as React from 'react';
import { render } from '@testing-library/react';
import { CalendarGrid } from './CalendarGrid';
import { isConformant } from '../../testing/isConformant';

describe('CalendarGrid', () => {
  isConformant({
    Component: CalendarGrid,
    displayName: 'CalendarGrid',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CalendarGrid>Default CalendarGrid</CalendarGrid>);
    expect(result.container).toMatchSnapshot();
  });
});
