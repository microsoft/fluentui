import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Nav } from '../Nav';
import { NavCategory } from '../NavCategory';
import { NavCategoryItem, navCategoryItemClassNames } from './';

describe('NavCategoryItem', () => {
  isConformant({
    Component: NavCategoryItem,
    displayName: 'NavCategoryItem',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Category' },
  });

  it('renders the default expand icon and visual state', () => {
    const { getByRole } = render(
      <Nav defaultOpenCategories={['category']} density="small">
        <NavCategory value="category">
          <NavCategoryItem className="consumer-class">Category</NavCategoryItem>
        </NavCategory>
      </Nav>,
    );
    const item = getByRole('button', { name: 'Category' });

    expect(item).toHaveAttribute('data-density', 'small');
    expect(item).toHaveAttribute('data-expanded');
    expect(item).toHaveClass(navCategoryItemClassNames.root, 'consumer-class');
    expect(item.querySelector(`.${navCategoryItemClassNames.expandIcon}`)).toBeInTheDocument();
  });

  it('supports custom and disabled expand icon motion', () => {
    const custom = render(
      <NavCategoryItem
        expandIconMotion={{
          children: (_, motionProps) => <span data-testid="custom-motion">{motionProps.children}</span>,
        }}
      >
        Category
      </NavCategoryItem>,
    );
    expect(custom.getByTestId('custom-motion')).toBeInTheDocument();
    custom.unmount();

    const disabled = render(<NavCategoryItem expandIconMotion={null}>Category</NavCategoryItem>);
    expect(disabled.getByRole('button', { name: 'Category' })).toBeInTheDocument();
  });
});
