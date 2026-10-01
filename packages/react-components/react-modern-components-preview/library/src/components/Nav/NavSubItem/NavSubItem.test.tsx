import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Nav } from '../Nav';
import { NavCategory } from '../NavCategory';
import { NavSubItem, navSubItemClassNames } from './';

describe('NavSubItem', () => {
  isConformant({
    Component: NavSubItem,
    displayName: 'NavSubItem',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Item', value: 'item' },
  });

  it('inherits density and renders stable styling', () => {
    const { getByRole } = render(
      <Nav density="small">
        <NavCategory value="category">
          <NavSubItem className="consumer-class" value="child">
            Child
          </NavSubItem>
        </NavCategory>
      </Nav>,
    );
    const item = getByRole('button', { name: 'Child' });

    expect(item).toHaveAttribute('data-density', 'small');
    expect(item).toHaveClass(navSubItemClassNames.root, 'consumer-class');
  });
});
