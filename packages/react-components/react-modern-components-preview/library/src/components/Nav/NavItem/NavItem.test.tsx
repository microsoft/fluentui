import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Nav } from '../Nav';
import { NavItem, navItemClassNames } from './';

describe('NavItem', () => {
  isConformant({
    Component: NavItem,
    displayName: 'NavItem',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Item', value: 'item' },
  });

  it('inherits density and renders selected styling', () => {
    const { getByRole } = render(
      <Nav defaultSelectedValue="home" density="small">
        <NavItem className="consumer-class" value="home">
          Home
        </NavItem>
      </Nav>,
    );
    const item = getByRole('button', { name: 'Home' });

    expect(item).toHaveAttribute('data-density', 'small');
    expect(item).toHaveAttribute('data-selected');
    expect(item).toHaveClass(navItemClassNames.root, 'consumer-class');
  });
});
