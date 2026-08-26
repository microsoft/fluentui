import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { NavDivider } from './NavDivider';
import type { NavDividerState } from './NavDivider.types';
import { navDividerClassNames, useNavDividerStyles } from './useNavDividerStyles';

import styles from './NavDivider.module.css';
import dividerStyles from '../Divider/Divider.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavDivider: (...args: Parameters<typeof actual.useNavDivider>) => deepFreezeState(actual.useNavDivider(...args)),
  };
});

// The jest css-module proxy drops the component and hash segments, so Divider's `root` and
// NavDivider's `root` are the same string — only the occurrence count distinguishes them.
const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

describe('NavDivider', () => {
  isConformant({
    Component: NavDivider,
    displayName: 'NavDivider',
  });

  it('stamps its own marker pair and the composed Divider pair', () => {
    const { getByTestId } = render(<NavDivider data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-nav-divider');
    expect(root).toHaveClass('group/fui-nav-divider');
    expect(root).toHaveClass('fui-divider');
    expect(root).toHaveClass('group/fui-divider');
    expect(root.classList[0]).toBe('fui-nav-divider');
    expect(navDividerClassNames.root).toBe('fui-nav-divider group/fui-nav-divider');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(<NavDivider data-testid="root" />);

    expect(occurrences(getByTestId('root').className, styles.root)).toBe(2);
  });

  it('pins the three Divider look props', () => {
    const { getByTestId } = render(<NavDivider data-testid="root" />);

    const root = getByTestId('root');

    // Griffel's own useNavDivider_unstable supplies the strong appearance; the headless hook
    // drops it, so windmod restores it as a fixed look prop. The appearance reaches the DOM as
    // a class rather than an attribute, so it is asserted through Divider's own class map.
    expect(root).toHaveClass(dividerStyles.strong);
    expect(root).not.toHaveClass(dividerStyles.default);
    expect(root.getAttribute('data-align-content')).toBe('center');
    expect(root.hasAttribute('data-inset')).toBe(false);
    expect(root.getAttribute('role')).toBe('separator');
  });

  it('keeps the headless orientation stamp through the composition', () => {
    const { getByTestId } = render(<NavDivider data-testid="root" />);

    const root = getByTestId('root');

    expect(root.getAttribute('data-orientation')).toBe('horizontal');
    expect(root.getAttribute('aria-orientation')).toBe('horizontal');
    expect(root.hasAttribute('data-empty')).toBe(true);
  });

  it('renders the wrapper when children are supplied and leaves it undecorated', () => {
    const { getByTestId } = render(<NavDivider data-testid="root">Section</NavDivider>);

    const root = getByTestId('root');
    const wrapper = root.firstElementChild as HTMLElement;

    expect(root.hasAttribute('data-empty')).toBe(false);
    expect(wrapper.textContent).toBe('Section');
    expect(wrapper.className).not.toContain(styles.root);
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <NavDivider
        data-testid="root"
        id="sep"
        className="consumer"
        aria-label="Break"
        style={{ zIndex: 3 }}
        ref={ref}
      />,
    );

    const root = getByTestId('root');
    const classes = root.className.split(' ');

    expect(root.id).toBe('sep');
    expect(root.getAttribute('aria-label')).toBe('Break');
    expect(root.style.zIndex).toBe('3');
    expect(classes[classes.length - 1]).toBe('consumer');
    expect(occurrences(root.className, 'consumer')).toBe(1);
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      alignContent: 'center',
      appearance: 'strong',
      components: { root: 'div', wrapper: 'div' },
      inset: false,
      root: { as: 'div', className: 'consumer' },
      vertical: false,
    } as unknown as NavDividerState;

    const styled = useNavDividerStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(occurrences(styled.root.className!, styles.root)).toBe(2);
  });
});
