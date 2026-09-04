import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Nav } from '../Nav/Nav';
import { NavCategoryItem } from '../NavCategoryItem/NavCategoryItem';
import { NavSubItem } from '../NavSubItem/NavSubItem';
import { NavSubItemGroup } from '../NavSubItemGroup/NavSubItemGroup';
import { NavCategory } from './NavCategory';

describe('NavCategory', () => {
  isConformant({
    Component: NavCategory,
    displayName: 'NavCategory',
    requiredProps: { value: 'c1' },
    // NavCategory renders no element of its own, so there is no root to take a ref, a
    // className or native props.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('renders no element of its own', () => {
    const { container } = render(
      <Nav data-testid="nav">
        <NavCategory value="c1">text</NavCategory>
      </Nav>,
    );

    expect(container.querySelectorAll('*')).toHaveLength(1);
    expect(container.firstElementChild).toHaveClass('fui-nav');
    expect(container.textContent).toBe('text');
  });

  it('publishes its open state to the rows inside it', () => {
    const { getByTestId, queryByTestId } = render(
      <Nav defaultOpenCategories={['open']}>
        <NavCategory value="open">
          <NavCategoryItem data-testid="open-item">Open</NavCategoryItem>
          <NavSubItemGroup data-testid="open-group">
            <NavSubItem value="s1">Sub</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
        <NavCategory value="closed">
          <NavCategoryItem data-testid="closed-item">Closed</NavCategoryItem>
          <NavSubItemGroup data-testid="closed-group">
            <NavSubItem value="s2">Sub</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    expect(getByTestId('open-item').getAttribute('data-open')).toBe('');
    expect(getByTestId('open-item').getAttribute('aria-expanded')).toBe('true');
    expect(getByTestId('open-group')).not.toBeNull();

    expect(queryByTestId('closed-item')!.hasAttribute('data-open')).toBe(false);
    expect(queryByTestId('closed-item')!.getAttribute('aria-expanded')).toBe('false');
    expect(queryByTestId('closed-group')).toBeNull();
  });
});
