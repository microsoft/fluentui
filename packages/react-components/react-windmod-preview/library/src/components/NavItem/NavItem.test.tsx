import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Nav } from '../Nav/Nav';
import { NavItem } from './NavItem';
import type { NavItemState } from './NavItem.types';
import { navItemClassNames, navRowClasses, useNavItemStyles } from './useNavItemStyles';

import styles from './NavItem.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavItem: (...args: Parameters<typeof actual.useNavItem>) => deepFreezeState(actual.useNavItem(...args)),
  };
});

// The styles hook widens the root with its data attribute internally but returns the declared
// state type, so the stamp is read back through this cast.
const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

describe('NavItem', () => {
  isConformant({
    Component: NavItem,
    displayName: 'NavItem',
    requiredProps: { value: '1' },
  });

  it('stamps its marker pair with the slash-free class first', () => {
    const { getByTestId } = render(
      <NavItem value="1" data-testid="root">
        Home
      </NavItem>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-nav-item');
    expect(root).toHaveClass('group/fui-nav-item');
    expect(root.classList[0]).toBe('fui-nav-item');
    expect(root).toHaveClass(styles.root);
    expect(navItemClassNames.root).toBe('fui-nav-item group/fui-nav-item');
  });

  it('renders a button by default and an anchor when href is given', () => {
    const { getByTestId } = render(
      <>
        <NavItem value="1" data-testid="button">
          Home
        </NavItem>
        <NavItem value="2" href="#a" data-testid="anchor">
          Away
        </NavItem>
      </>,
    );

    expect(getByTestId('button').tagName).toBe('BUTTON');
    expect(getByTestId('anchor').tagName).toBe('A');
    // The reset is the same on both roots — the anchor cell exists because `border: none`
    // behaves differently on the two elements.
    expect(getByTestId('anchor')).toHaveClass(styles.root);
  });

  it('keeps the headless selection stamps through the decoration', () => {
    const { getByTestId } = render(
      <Nav selectedValue="1">
        <NavItem value="1" data-testid="selected">
          Home
        </NavItem>
        <NavItem value="2" data-testid="resting">
          Away
        </NavItem>
      </Nav>,
    );

    expect(getByTestId('selected').getAttribute('data-selected')).toBe('');
    expect(getByTestId('selected').getAttribute('aria-current')).toBe('page');
    expect(getByTestId('resting').hasAttribute('data-selected')).toBe(false);
  });

  it('decorates the icon slot when one is supplied', () => {
    const { container } = render(
      <NavItem value="1" icon={{ children: <svg data-testid="glyph" /> }}>
        Home
      </NavItem>,
    );

    const icon = container.querySelector('span') as HTMLElement;

    expect(icon).toHaveClass(styles.icon);
    expect(icon.querySelector('svg')).not.toBeNull();
  });

  it('renders no icon element when the slot is omitted', () => {
    const { container } = render(<NavItem value="1">Home</NavItem>);

    expect(container.querySelector('span')).toBeNull();
  });

  it('merges the consumer className last on every slot', () => {
    const { container } = render(
      <NavItem value="1" className="consumer-root" icon={{ className: 'consumer-icon', children: <svg /> }}>
        Home
      </NavItem>,
    );

    const rootEl = container.querySelector('.fui-nav-item') as HTMLElement;
    const iconEl = container.querySelector('span') as HTMLElement;
    const rootClasses = rootEl.className.split(' ');
    const iconClasses = iconEl.className.split(' ');

    expect(rootClasses[rootClasses.length - 1]).toBe('consumer-root');
    expect(iconClasses[iconClasses.length - 1]).toBe('consumer-icon');
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByTestId } = render(
      <NavItem value="1" data-testid="root" id="home" aria-label="Home page" style={{ zIndex: 3 }} ref={ref}>
        Home
      </NavItem>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('home');
    expect(root.getAttribute('aria-label')).toBe('Home page');
    expect(root.style.zIndex).toBe('3');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'button', icon: 'span' },
      density: 'small',
      icon: { className: 'consumer-icon' },
      root: { className: 'consumer-root' },
      selected: false,
      value: '1',
    } as unknown as NavItemState;

    const styled = useNavItemStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.icon).not.toBe(state.icon);
    expect(state.root.className).toBe('consumer-root');
    expect(state.root).not.toHaveProperty('data-density');
    expect(stampsOf(styled.root)['data-density']).toBe('small');
    expect(styled.root.className).toContain(styles.root);
    expect(styled.icon?.className).toContain(styles.icon);
  });

  describe('navRowClasses', () => {
    // The shared row decoration is the family's one cross-component surface: NavCategoryItem
    // and NavSubItem consume it and must be indistinguishable from NavItem on the row look.
    // Asserted here on a row shape that is NOT a NavItem, so dropping the call from a sibling
    // cannot pass by way of NavItem's own coverage.
    const foreignRow = () =>
      ({
        density: 'medium',
        icon: { className: 'foreign-icon' },
        root: { className: 'foreign-root' },
        selected: true,
      }) as unknown as NavItemState;

    it('applies NavItem identity, the row class and the density stamp to any row shape', () => {
      const decorated = navRowClasses(foreignRow());

      expect(decorated.root.className).toContain('fui-nav-item');
      expect(decorated.root.className).toContain('group/fui-nav-item');
      expect(decorated.root.className).toContain(styles.root);
      expect(stampsOf(decorated.root)['data-density']).toBe('medium');
      expect(decorated.icon?.className).toContain(styles.icon);
    });

    it('keeps the caller className last so a composing sibling can layer over it', () => {
      const decorated = navRowClasses(foreignRow());
      const classes = decorated.root.className!.split(' ');

      expect(classes[classes.length - 1]).toBe('foreign-root');
    });

    it('leaves an absent icon slot absent', () => {
      const decorated = navRowClasses({
        density: 'medium',
        root: {},
        selected: false,
      } as unknown as NavItemState);

      expect(decorated.icon).toBeUndefined();
    });

    it('is what useNavItemStyles applies', () => {
      const state = foreignRow();

      expect(useNavItemStyles(state).root.className).toBe(navRowClasses(state).root.className);
    });
  });
});
