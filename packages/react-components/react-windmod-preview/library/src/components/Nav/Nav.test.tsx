import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Nav } from './Nav';
import { NavItem } from '../NavItem/NavItem';
import type { NavState } from './Nav.types';
import { navClassNames, useNavStyles } from './useNavStyles';

import styles from './Nav.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNav: (...args: Parameters<typeof actual.useNav>) => deepFreezeState(actual.useNav(...args)),
  };
});

// `fuicm-root` is the same jest ident for every module in this family, so every root is
// identified by its marker class, never by the hashed class alone.
const rowOf = (container: HTMLElement) => container.querySelector('.fui-nav-item') as HTMLElement;

describe('Nav', () => {
  isConformant({
    Component: Nav,
    displayName: 'Nav',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { getByTestId } = render(<Nav data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-nav');
    expect(root).toHaveClass('group/fui-nav');
    expect(root.classList[0]).toBe('fui-nav');
    expect(root).toHaveClass(styles.root);
    expect(navClassNames.root).toBe('fui-nav group/fui-nav');
  });

  it('keeps the headless stamps through the decoration', () => {
    const { getByTestId } = render(<Nav data-testid="root" />);

    const root = getByTestId('root');

    expect(root.getAttribute('role')).toBe('navigation');
    // Nav rows are reached with Tab, not the arrow keys: the headless hook stopped stamping
    // `focusgroup` and our layer must not put one back. Toolbar, TabList, TagGroup and
    // SwatchPicker still carry theirs — this is Nav-only.
    expect(root.hasAttribute('focusgroup')).toBe(false);
  });

  it('does not stamp data-density on itself', () => {
    const { getByTestId } = render(<Nav data-testid="root" density="small" />);

    expect(getByTestId('root').hasAttribute('data-density')).toBe(false);
  });

  it.each([
    ['small', 'small'],
    ['medium', 'medium'],
    [undefined, 'medium'],
  ] as const)('publishes density %s to its rows as %s', (density, expected) => {
    const { container } = render(
      <Nav density={density}>
        <NavItem value="1">Home</NavItem>
      </Nav>,
    );

    expect(rowOf(container).getAttribute('data-density')).toBe(expected);
  });

  it('gives a row outside any Nav the medium default', () => {
    const { container } = render(<NavItem value="1">Home</NavItem>);

    expect(rowOf(container).getAttribute('data-density')).toBe('medium');
  });

  it('lets an inner Nav override an outer one for its own rows', () => {
    const { getByTestId } = render(
      <Nav density="medium">
        <NavItem value="outer" data-testid="outer">
          Outer
        </NavItem>
        <Nav density="small">
          <NavItem value="inner" data-testid="inner">
            Inner
          </NavItem>
        </Nav>
      </Nav>,
    );

    expect(getByTestId('outer').getAttribute('data-density')).toBe('medium');
    expect(getByTestId('inner').getAttribute('data-density')).toBe('small');
  });

  it('moves the selection when an item is clicked', () => {
    const { getByTestId } = render(
      <Nav>
        <NavItem value="1" data-testid="one">
          One
        </NavItem>
        <NavItem value="2" data-testid="two">
          Two
        </NavItem>
      </Nav>,
    );

    expect(getByTestId('one').hasAttribute('data-selected')).toBe(false);

    fireEvent.click(getByTestId('two'));

    expect(getByTestId('two').getAttribute('data-selected')).toBe('');
    expect(getByTestId('two').getAttribute('aria-current')).toBe('page');
    expect(getByTestId('one').hasAttribute('data-selected')).toBe(false);
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Nav data-testid="root" id="site-nav" className="consumer" aria-label="Site" style={{ zIndex: 3 }} ref={ref} />,
    );

    const root = getByTestId('root');
    const classes = root.className.split(' ');

    expect(root.id).toBe('site-nav');
    expect(root.getAttribute('aria-label')).toBe('Site');
    expect(root.style.zIndex).toBe('3');
    expect(classes[classes.length - 1]).toBe('consumer');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      density: 'small',
      root: { className: 'consumer' },
    } as unknown as NavState;

    const styled = useNavStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(styles.root);
  });
});
