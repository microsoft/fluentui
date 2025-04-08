import * as React from 'react';
import { Badge } from './Badge';
import * as renderer from 'react-test-renderer';

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
    const component = renderer.create(<Badge>Default Badge</Badge>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
