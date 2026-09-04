import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { NavSectionHeader } from './NavSectionHeader';
import type { NavSectionHeaderState } from './NavSectionHeader.types';
import { navSectionHeaderClassNames, useNavSectionHeaderStyles } from './useNavSectionHeaderStyles';

import styles from './NavSectionHeader.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavSectionHeader: (...args: Parameters<typeof actual.useNavSectionHeader>) =>
      deepFreezeState(actual.useNavSectionHeader(...args)),
  };
});

describe('NavSectionHeader', () => {
  isConformant({
    Component: NavSectionHeader,
    displayName: 'NavSectionHeader',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { getByTestId } = render(<NavSectionHeader data-testid="root">Section</NavSectionHeader>);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-nav-section-header');
    expect(root).toHaveClass('group/fui-nav-section-header');
    expect(root.classList[0]).toBe('fui-nav-section-header');
    expect(root).toHaveClass(styles.root);
    expect(navSectionHeaderClassNames.root).toBe('fui-nav-section-header group/fui-nav-section-header');
  });

  it('renders the headless h3 root', () => {
    const { getByTestId } = render(<NavSectionHeader data-testid="root">Section</NavSectionHeader>);

    expect(getByTestId('root').tagName).toBe('H3');
    expect(getByTestId('root').textContent).toBe('Section');
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const { getByTestId } = render(
      <NavSectionHeader
        data-testid="root"
        id="section-1"
        className="consumer"
        aria-label="Section one"
        style={{ zIndex: 3 }}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        Section
      </NavSectionHeader>,
    );

    const root = getByTestId('root');
    const classes = root.className.split(' ');

    expect(root.id).toBe('section-1');
    expect(root.getAttribute('aria-label')).toBe('Section one');
    expect(root.style.zIndex).toBe('3');
    expect(classes[classes.length - 1]).toBe('consumer');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'h3' },
      root: { className: 'consumer' },
    } as unknown as NavSectionHeaderState;

    const styled = useNavSectionHeaderStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(styles.root);
  });
});
