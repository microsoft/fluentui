import * as React from 'react';
import { render } from '@testing-library/react';
import { Calendar } from './Calendar';
import { isConformant } from '../../testing/isConformant';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
    disabledTests: [
      // compat components that are closer to their v8 counterparts do not adhere to this test
      'consistent-callback-args',
      // Calendar is not exported at the top level since it's an internal component
      'exported-top-level',
      // Calendar classnames are not exported since they are internal and are used differently compared to how v9
      // uses classnames
      'component-has-static-classnames-object',
    ],
  });

  it('should render without crashing when value is undefined', () => {
    expect(() => render(<Calendar value={undefined} />)).not.toThrow();
  });

  it('should render correctly when value is undefined', () => {
    const { container } = render(<Calendar value={undefined} />);
    expect(container.querySelector('[role="grid"]')).not.toBeNull();
  });
});
