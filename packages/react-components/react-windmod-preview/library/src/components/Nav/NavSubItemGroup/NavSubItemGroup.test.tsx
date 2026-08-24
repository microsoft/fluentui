import * as React from 'react';
import { render } from '@testing-library/react';
import { NavCategoryProvider } from '@fluentui/react-headless-components-preview/nav';

import { isConformant } from '../../../testing/isConformant';
import { Nav } from '../Nav';
import { NavCategory } from '../NavCategory';
import { NavSubItem } from '../NavSubItem';
import { NavSubItemGroup } from './NavSubItemGroup';
import type { NavSubItemGroupState } from './NavSubItemGroup.types';
import { navSubItemGroupClassNames, useNavSubItemGroupStyles } from './useNavSubItemGroupStyles';

import styles from './NavSubItemGroup.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../../testing/freezeState');

  return {
    ...actual,
    useNavSubItemGroup: (...args: Parameters<typeof actual.useNavSubItemGroup>) =>
      deepFreezeState(actual.useNavSubItemGroup(...args)),
  };
});

// A group renders nothing while its category is closed, so every case that needs a root has to
// be inside an open one.
const OpenCategory: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <NavCategoryProvider value={{ open: true, value: 'c1' }}>{children}</NavCategoryProvider>
);

describe('NavSubItemGroup', () => {
  isConformant({
    Component: NavSubItemGroup,
    displayName: 'NavSubItemGroup',
    renderOptions: { wrapper: OpenCategory },
  });

  it('stamps its marker pair with the slash-free class first', () => {
    const { getByTestId } = render(
      <OpenCategory>
        <NavSubItemGroup data-testid="root" />
      </OpenCategory>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-nav-sub-item-group');
    expect(root).toHaveClass('group/fui-nav-sub-item-group');
    expect(root.classList[0]).toBe('fui-nav-sub-item-group');
    expect(root).toHaveClass(styles.root);
    expect(navSubItemGroupClassNames.root).toBe('fui-nav-sub-item-group group/fui-nav-sub-item-group');
  });

  it('keeps the headless group role', () => {
    const { getByTestId } = render(
      <OpenCategory>
        <NavSubItemGroup data-testid="root" />
      </OpenCategory>,
    );

    expect(getByTestId('root').getAttribute('role')).toBe('group');
  });

  it('renders its children when the category is open and nothing when it is closed', () => {
    const { queryByTestId } = render(
      <Nav defaultOpenCategories={['open']}>
        <NavCategory value="open">
          <NavSubItemGroup data-testid="open-group">
            <NavSubItem value="s1">Sub</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
        <NavCategory value="closed">
          <NavSubItemGroup data-testid="closed-group">
            <NavSubItem value="s2">Sub</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    expect(queryByTestId('open-group')!.textContent).toBe('Sub');
    expect(queryByTestId('closed-group')).toBeNull();
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <OpenCategory>
        <NavSubItemGroup
          data-testid="root"
          id="group"
          className="consumer"
          aria-label="Sub items"
          style={{ zIndex: 3 }}
          ref={ref}
        />
      </OpenCategory>,
    );

    const root = getByTestId('root');
    const classes = root.className.split(' ');

    expect(root.id).toBe('group');
    expect(root.getAttribute('aria-label')).toBe('Sub items');
    expect(root.style.zIndex).toBe('3');
    expect(classes[classes.length - 1]).toBe('consumer');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      open: true,
      root: { className: 'consumer' },
    } as unknown as NavSubItemGroupState;

    const styled = useNavSubItemGroupStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain(styles.root);
    expect(styled.root.className).toContain('consumer');
  });
});
