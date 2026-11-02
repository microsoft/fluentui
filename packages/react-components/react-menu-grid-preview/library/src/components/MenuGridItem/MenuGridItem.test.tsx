import * as React from 'react';
import { MenuGridItem } from './MenuGridItem';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('MenuGridItem', () => {
  isConformant({
    Component: MenuGridItem,
    displayName: 'MenuGridItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            content: 'Test Content',
            subText: 'Test Sub Text',
            firstSubAction: 'Test First Sub Action',
            secondSubAction: 'Test Second Sub Action',
          },
        },
      ],
    },
  });

  /**
   * Note: see more visual regression tests for MenuGridItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridItem>Default MenuGridItem</MenuGridItem>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
