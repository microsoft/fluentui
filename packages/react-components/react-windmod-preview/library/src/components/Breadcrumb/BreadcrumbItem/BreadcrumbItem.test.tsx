import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../../testing/isConformant';
import { Breadcrumb } from '../Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import type { BreadcrumbItemState } from './BreadcrumbItem.types';
import { breadcrumbItemClassNames, useBreadcrumbItemStyles } from './useBreadcrumbItemStyles';

import styles from './BreadcrumbItem.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/breadcrumb', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/breadcrumb');
  const { deepFreezeState } = require('../../../testing/freezeState');

  return {
    ...actual,
    useBreadcrumbItem: (...args: Parameters<typeof actual.useBreadcrumbItem>) =>
      deepFreezeState(actual.useBreadcrumbItem(...args)),
  };
});

describe('BreadcrumbItem', () => {
  isConformant({
    Component: BreadcrumbItem,
    displayName: 'BreadcrumbItem',
  });

  it('stamps its marker pair and module class, slash-free first', () => {
    const { getByTestId } = render(<BreadcrumbItem data-testid="root">Home</BreadcrumbItem>);

    const root = getByTestId('root');

    expect(root.tagName).toBe('LI');
    expect(root).toHaveClass('fui-breadcrumb-item');
    expect(root).toHaveClass('group/fui-breadcrumb-item');
    expect(root).toHaveClass(styles.root);
    expect(root.classList[0]).toBe('fui-breadcrumb-item');
    expect(breadcrumbItemClassNames.root).toBe('fui-breadcrumb-item group/fui-breadcrumb-item');
  });

  it('takes no size of its own at any breadcrumb size', () => {
    const { getByTestId } = render(
      <Breadcrumb size="large">
        <BreadcrumbItem data-testid="item">Home</BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(getByTestId('item').hasAttribute('data-size')).toBe(false);
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLLIElement>();
    const { getByTestId } = render(
      <BreadcrumbItem ref={ref} data-testid="root" id="item" className="consumer" style={{ margin: 2 }}>
        Home
      </BreadcrumbItem>,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('item');
    expect(root).toHaveClass('consumer');
    expect(root.style.margin).toBe('2px');
    expect(root.textContent).toBe('Home');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'li' },
      root: { className: 'consumer' },
    } as unknown as BreadcrumbItemState;

    const styled = useBreadcrumbItemStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
  });
});
