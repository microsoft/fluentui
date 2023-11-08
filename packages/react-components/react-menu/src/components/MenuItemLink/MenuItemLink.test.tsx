import * as React from 'react';
import { render } from '@testing-library/react';
import { MenuItemLink } from './MenuItemLink';
import { isConformant } from '../../testing/isConformant';

describe('MenuItemLink', () => {
  isConformant({
    Component: MenuItemLink,
    displayName: 'MenuItemLink',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            checkmark: 'Test Checkmark',
            submenuIndicator: 'Test Submenu Indicator',
            content: 'Test Content',
            secondaryContent: 'Test Secondary Content',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MenuItemLink href="#">Default MenuItemLink</MenuItemLink>);
    expect(result.container).toMatchSnapshot();
  });
});
