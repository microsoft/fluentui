import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Nav } from '../Nav';
import { NavCategory } from '../NavCategory';
import { NavSubItemGroup, navSubItemGroupClassNames } from './';

const NavSubItemGroupWrapper = ({ children }: { children?: React.ReactNode }) => (
  <Nav defaultOpenCategories={['category']}>
    <NavCategory value="category">{children}</NavCategory>
  </Nav>
);

describe('NavSubItemGroup', () => {
  isConformant({
    Component: NavSubItemGroup,
    displayName: 'NavSubItemGroup',
    disableTypeTests: true,
    disabledTests: [
      'component-handles-classname',
      'component-has-root-ref',
      'exported-top-level',
      'has-top-level-file',
      'has-top-level-file-extra',
    ],
    requiredProps: { children: 'Items' },
    renderOptions: { wrapper: NavSubItemGroupWrapper },
  });

  it('renders stable styling while its category is open', () => {
    const { getByRole } = render(
      <Nav defaultOpenCategories={['category']}>
        <NavCategory value="category">
          <NavSubItemGroup className="consumer-class">Items</NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    expect(getByRole('group')).toHaveClass(navSubItemGroupClassNames.root, 'consumer-class');
  });

  it('supports custom and disabled collapse motion', () => {
    const custom = render(
      <Nav defaultOpenCategories={['category']}>
        <NavCategory value="category">
          <NavSubItemGroup
            collapseMotion={{
              children: (_, motionProps) => <div data-testid="custom-motion">{motionProps.children}</div>,
            }}
          >
            Items
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );
    expect(custom.getByTestId('custom-motion')).toHaveTextContent('Items');
    custom.unmount();

    const disabled = render(
      <NavCategory value="category">
        <NavSubItemGroup collapseMotion={null}>Items</NavSubItemGroup>
      </NavCategory>,
    );
    expect(disabled.queryByText('Items')).not.toBeInTheDocument();
  });
});
