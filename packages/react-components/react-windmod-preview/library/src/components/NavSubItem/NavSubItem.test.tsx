import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Nav } from '../Nav/Nav';
import { NavSubItem } from './NavSubItem';
import type { NavSubItemState } from './NavSubItem.types';
import { navSubItemClassNames, useNavSubItemStyles } from './useNavSubItemStyles';

import styles from './NavSubItem.module.css';
import navItemStyles from '../NavItem/NavItem.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavSubItem: (...args: Parameters<typeof actual.useNavSubItem>) => deepFreezeState(actual.useNavSubItem(...args)),
  };
});

// The styles hook widens the root with its data attribute internally but returns the declared
// state type, so the stamp is read back through this cast.
const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

// The jest css-module proxy drops the component and hash segments, so NavItem's `root` and
// NavSubItem's `root` are the same string — only the occurrence count distinguishes them.
const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

describe('NavSubItem', () => {
  isConformant({
    Component: NavSubItem,
    displayName: 'NavSubItem',
    requiredProps: { value: 's1' },
  });

  it('stamps its own marker pair and the shared row pair', () => {
    const { getByTestId } = render(
      <NavSubItem value="s1" data-testid="root">
        Sub
      </NavSubItem>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-nav-sub-item');
    expect(root).toHaveClass('group/fui-nav-sub-item');
    expect(root).toHaveClass('fui-nav-item');
    expect(root).toHaveClass('group/fui-nav-item');
    expect(root.classList[0]).toBe('fui-nav-sub-item');
    expect(navSubItemClassNames.root).toBe('fui-nav-sub-item group/fui-nav-sub-item');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(
      <NavSubItem value="s1" data-testid="root">
        Sub
      </NavSubItem>,
    );

    expect(occurrences(getByTestId('root').className, styles.root)).toBe(2);
  });

  it('renders a button by default and an anchor when href is given', () => {
    const { getByTestId } = render(
      <>
        <NavSubItem value="s1" data-testid="button">
          Sub
        </NavSubItem>
        <NavSubItem value="s2" href="#a" data-testid="anchor">
          Away
        </NavSubItem>
      </>,
    );

    expect(getByTestId('button').tagName).toBe('BUTTON');
    expect(getByTestId('anchor').tagName).toBe('A');
    expect(getByTestId('anchor')).toHaveClass(navItemStyles.root);
  });

  it('resolves density from the nav context onto the row', () => {
    const { getByTestId } = render(
      <>
        <Nav density="small">
          <NavSubItem value="s1" data-testid="small">
            Sub
          </NavSubItem>
        </Nav>
        <Nav>
          <NavSubItem value="s2" data-testid="medium">
            Sub
          </NavSubItem>
        </Nav>
        <NavSubItem value="s3" data-testid="orphan">
          Sub
        </NavSubItem>
      </>,
    );

    expect(getByTestId('small').getAttribute('data-density')).toBe('small');
    expect(getByTestId('medium').getAttribute('data-density')).toBe('medium');
    expect(getByTestId('orphan').getAttribute('data-density')).toBe('medium');
  });

  it('keeps the headless selection stamps through the composition', () => {
    const { getByTestId } = render(
      <Nav selectedValue="s1">
        <NavSubItem value="s1" data-testid="selected">
          Sub
        </NavSubItem>
        <NavSubItem value="s2" data-testid="resting">
          Sub
        </NavSubItem>
      </Nav>,
    );

    expect(getByTestId('selected').getAttribute('data-selected')).toBe('');
    expect(getByTestId('selected').getAttribute('aria-current')).toBe('page');
    expect(getByTestId('resting').hasAttribute('data-selected')).toBe(false);
  });

  it('has no icon slot to decorate', () => {
    const { getByTestId } = render(
      <NavSubItem value="s1" data-testid="root">
        Sub
      </NavSubItem>,
    );

    expect(getByTestId('root').querySelector(`.${navItemStyles.icon}`)).toBeNull();
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByTestId } = render(
      <NavSubItem
        value="s1"
        data-testid="root"
        id="sub"
        className="consumer"
        aria-label="Sub page"
        style={{ zIndex: 3 }}
        ref={ref}
      >
        Sub
      </NavSubItem>,
    );

    const root = getByTestId('root');
    const classes = root.className.split(' ');

    expect(root.id).toBe('sub');
    expect(root.getAttribute('aria-label')).toBe('Sub page');
    expect(root.style.zIndex).toBe('3');
    expect(classes[classes.length - 1]).toBe('consumer');
    expect(occurrences(root.className, 'consumer')).toBe(1);
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'button' },
      density: 'small',
      root: { className: 'consumer' },
      selected: false,
      value: 's1',
    } as unknown as NavSubItemState;

    const styled = useNavSubItemStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-density');
    expect(stampsOf(styled.root)['data-density']).toBe('small');
    expect(occurrences(styled.root.className!, styles.root)).toBe(2);
  });
});
