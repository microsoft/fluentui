import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Nav } from '../Nav/Nav';
import { NavCategory } from '../NavCategory/NavCategory';
import { NavCategoryItem } from './NavCategoryItem';
import type { NavCategoryItemState } from './NavCategoryItem.types';
import { navCategoryItemClassNames, useNavCategoryItemStyles } from './useNavCategoryItemStyles';

import styles from './NavCategoryItem.module.css';
import navItemStyles from '../NavItem/NavItem.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavCategoryItem: (...args: Parameters<typeof actual.useNavCategoryItem>) =>
      deepFreezeState(actual.useNavCategoryItem(...args)),
  };
});

// The styles hook widens the root with its data attribute internally but returns the declared
// state type, so the stamp is read back through this cast.
const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

const expandIconOf = (container: HTMLElement): HTMLElement | null => container.querySelector(`.${styles.expandIcon}`);

describe('NavCategoryItem', () => {
  isConformant({
    Component: NavCategoryItem,
    displayName: 'NavCategoryItem',
  });

  it('stamps its own marker pair and the shared row pair', () => {
    const { getByTestId } = render(<NavCategoryItem data-testid="root">Cat</NavCategoryItem>);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-nav-category-item');
    expect(root).toHaveClass('group/fui-nav-category-item');
    expect(root).toHaveClass('fui-nav-item');
    expect(root).toHaveClass('group/fui-nav-item');
    expect(root.classList[0]).toBe('fui-nav-category-item');
    expect(root).toHaveClass(navItemStyles.root);
    expect(navCategoryItemClassNames.root).toBe('fui-nav-category-item group/fui-nav-category-item');
  });

  it('resolves density from the nav context onto the row', () => {
    const { getByTestId } = render(
      <>
        <Nav density="small">
          <NavCategoryItem data-testid="small">Cat</NavCategoryItem>
        </Nav>
        <Nav>
          <NavCategoryItem data-testid="medium">Cat</NavCategoryItem>
        </Nav>
        <NavCategoryItem data-testid="orphan">Cat</NavCategoryItem>
      </>,
    );

    expect(getByTestId('small').getAttribute('data-density')).toBe('small');
    expect(getByTestId('medium').getAttribute('data-density')).toBe('medium');
    expect(getByTestId('orphan').getAttribute('data-density')).toBe('medium');
  });

  describe('the expand chevron', () => {
    // The headless surface ships no default glyph; the styled layer restores one after the hook
    // and never mutates the state it was given. `undefined` restores the chevron, `null` removes
    // the slot, and any children a consumer supplies win.
    it('restores the chevron when the slot is omitted', () => {
      const { container } = render(<NavCategoryItem>Cat</NavCategoryItem>);

      const expandIcon = expandIconOf(container)!;

      expect(expandIcon.tagName).toBe('SPAN');
      expect(expandIcon.getAttribute('aria-hidden')).toBe('true');
      expect(expandIcon.querySelectorAll('svg')).toHaveLength(1);
    });

    it('restores the chevron for a shorthand that supplies no children', () => {
      const { container } = render(<NavCategoryItem expandIcon={{ className: 'consumer' }}>Cat</NavCategoryItem>);

      const expandIcon = expandIconOf(container)!;

      expect(expandIcon).toHaveClass('consumer');
      expect(expandIcon.querySelectorAll('svg')).toHaveLength(1);
    });

    it('restores the chevron for a shorthand whose children are null', () => {
      const { container } = render(<NavCategoryItem expandIcon={{ children: null }}>Cat</NavCategoryItem>);

      expect(expandIconOf(container)!.querySelectorAll('svg')).toHaveLength(1);
    });

    it('restores the chevron for a shorthand whose children are undefined', () => {
      const { container } = render(<NavCategoryItem expandIcon={{ children: undefined }}>Cat</NavCategoryItem>);

      expect(expandIconOf(container)!.querySelectorAll('svg')).toHaveLength(1);
    });

    it('removes the slot when it is null', () => {
      const { container } = render(<NavCategoryItem expandIcon={null}>Cat</NavCategoryItem>);

      expect(expandIconOf(container)).toBeNull();
      expect(container.querySelectorAll('svg')).toHaveLength(0);
    });

    it('honours consumer children given as a shorthand', () => {
      const { container, getByTestId } = render(
        <NavCategoryItem expandIcon={{ children: <b data-testid="consumer-glyph" /> }}>Cat</NavCategoryItem>,
      );

      expect(getByTestId('consumer-glyph')).not.toBeNull();
      expect(container.querySelectorAll('svg')).toHaveLength(0);
      expect(expandIconOf(container)).not.toBeNull();
    });

    it('honours consumer children given as an element', () => {
      const { container, getByTestId } = render(
        <NavCategoryItem expandIcon={<b data-testid="consumer-glyph" />}>Cat</NavCategoryItem>,
      );

      expect(getByTestId('consumer-glyph')).not.toBeNull();
      expect(container.querySelectorAll('svg')).toHaveLength(0);
    });

    it('rotates through the open state the headless hook stamps, not through JS', () => {
      const { getByTestId } = render(
        <Nav defaultOpenCategories={['c1']}>
          <NavCategory value="c1">
            <NavCategoryItem data-testid="open">Cat</NavCategoryItem>
          </NavCategory>
          <NavCategory value="c2">
            <NavCategoryItem data-testid="closed">Cat</NavCategoryItem>
          </NavCategory>
        </Nav>,
      );

      // The rotation is a group variant on the row's own open stamp; both chevrons carry the
      // same class and differ only by that attribute.
      expect(getByTestId('open').getAttribute('data-open')).toBe('');
      expect(getByTestId('closed').hasAttribute('data-open')).toBe(false);
      expect(getByTestId('open').querySelector(`.${styles.expandIcon}`)).not.toBeNull();
      expect(getByTestId('closed').querySelector(`.${styles.expandIcon}`)).not.toBeNull();
    });
  });

  it('decorates the icon slot with the shared row class', () => {
    const { container } = render(
      <NavCategoryItem icon={{ children: <svg data-testid="glyph" /> }}>Cat</NavCategoryItem>,
    );

    const icon = container.querySelector(`.${navItemStyles.icon}`) as HTMLElement;

    expect(icon.querySelector('svg')).not.toBeNull();
    expect(icon).not.toHaveClass(styles.expandIcon);
  });

  it('keeps the headless stamps through the decoration', () => {
    const { getByTestId } = render(
      <Nav defaultOpenCategories={['c1']} selectedCategoryValue="c2">
        <NavCategory value="c1">
          <NavCategoryItem data-testid="open">Open</NavCategoryItem>
        </NavCategory>
        <NavCategory value="c2">
          <NavCategoryItem data-testid="selected">Selected</NavCategoryItem>
        </NavCategory>
      </Nav>,
    );

    expect(getByTestId('open').getAttribute('aria-expanded')).toBe('true');
    expect(getByTestId('open').hasAttribute('data-selected')).toBe(false);
    expect(getByTestId('selected').getAttribute('data-selected')).toBe('');
    expect(getByTestId('selected').getAttribute('aria-current')).toBe('page');
  });

  it('toggles its category on click', () => {
    const { getByTestId } = render(
      <Nav>
        <NavCategory value="c1">
          <NavCategoryItem data-testid="root">Cat</NavCategoryItem>
        </NavCategory>
      </Nav>,
    );

    const root = getByTestId('root');

    expect(root.hasAttribute('data-open')).toBe(false);
    fireEvent.click(root);
    expect(root.getAttribute('data-open')).toBe('');
    fireEvent.click(root);
    expect(root.hasAttribute('data-open')).toBe(false);
  });

  it('merges the consumer className last on every slot', () => {
    const { container } = render(
      <NavCategoryItem
        className="consumer-root"
        icon={{ className: 'consumer-icon', children: <svg /> }}
        expandIcon={{ className: 'consumer-expand' }}
      >
        Cat
      </NavCategoryItem>,
    );

    const last = (element: Element): string => {
      const classes = element.className.split(' ');

      return classes[classes.length - 1];
    };

    expect(last(container.querySelector('.fui-nav-category-item')!)).toBe('consumer-root');
    expect(last(container.querySelector(`.${navItemStyles.icon}`)!)).toBe('consumer-icon');
    expect(last(expandIconOf(container)!)).toBe('consumer-expand');
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByTestId } = render(
      <NavCategoryItem data-testid="root" id="cat" aria-label="Category" style={{ zIndex: 3 }} ref={ref}>
        Cat
      </NavCategoryItem>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('cat');
    expect(root.getAttribute('aria-label')).toBe('Category');
    expect(root.style.zIndex).toBe('3');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'button', icon: 'span', expandIcon: 'span' },
      density: 'small',
      expandIcon: { className: 'consumer-expand' },
      icon: { className: 'consumer-icon' },
      open: false,
      root: { className: 'consumer-root' },
      selected: false,
      value: 'c1',
    } as unknown as NavCategoryItemState;

    const styled = useNavCategoryItemStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.icon).not.toBe(state.icon);
    expect(styled.expandIcon).not.toBe(state.expandIcon);
    expect(state.root.className).toBe('consumer-root');
    expect(state.root).not.toHaveProperty('data-density');
    expect(stampsOf(styled.root)['data-density']).toBe('small');
    expect(styled.root.className).toContain(navItemStyles.root);
    expect(styled.icon?.className).toContain(navItemStyles.icon);
    expect(styled.expandIcon?.className).toContain(styles.expandIcon);
  });
});
