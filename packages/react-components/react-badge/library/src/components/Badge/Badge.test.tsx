import * as React from 'react';
import { Badge } from './Badge';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon' },
        },
      ],
    },
  });

  /**
   * Note: see more visual regression tests for Badge in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<Badge>Default Badge</Badge>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
