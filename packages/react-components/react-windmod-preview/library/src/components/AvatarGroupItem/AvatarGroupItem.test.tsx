import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroupProvider } from '@fluentui/react-headless-components-preview/avatar-group';

import { isConformant } from '../../testing/isConformant';
import { AvatarGroup } from '../AvatarGroup';
import type { AvatarGroupProps } from '../AvatarGroup';
import { AvatarGroupItem } from './AvatarGroupItem';
import { avatarGroupItemClassNames } from './useAvatarGroupItemStyles';

import styles from './AvatarGroupItem.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/avatar-group', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/avatar-group');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useAvatarGroupItem: (...args: Parameters<typeof actual.useAvatarGroupItem>) =>
      deepFreezeState(actual.useAvatarGroupItem(...args)),
  };
});

type ItemProps = React.ComponentProps<typeof AvatarGroupItem>;

// Queried by the marker class, never by a module ident: this module's `root` and AvatarGroup's
// `root` are the same string under the jest ident proxy while the built idents differ.
const renderItem = (groupProps: AvatarGroupProps = {}, itemProps: ItemProps = {}) => {
  const { container } = render(
    <AvatarGroup {...groupProps}>
      <AvatarGroupItem name="Ada Lovelace" {...itemProps} />
    </AvatarGroup>,
  );
  const root = container.querySelector<HTMLElement>(`.${avatarGroupItemClassNames.root.split(' ')[0]}`)!;

  return { root, coin: root.querySelector<HTMLElement>('.fui-avatar')! };
};

const renderOverflowItem = (itemProps: ItemProps = {}) => {
  const { container } = render(
    <AvatarGroupProvider value={{ isOverflow: true, size: 24 }}>
      <AvatarGroupItem name="Ada Lovelace" {...itemProps} />
    </AvatarGroupProvider>,
  );

  return container.firstElementChild as HTMLElement;
};

describe('AvatarGroupItem', () => {
  isConformant({
    Component: AvatarGroupItem,
    displayName: 'AvatarGroupItem',
    requiredProps: { name: 'Ada Lovelace' },
    // The ref lands on the avatar, which is the primary slot on both libraries — the root exists
    // only to carry the layout ladder.
    primarySlot: 'avatar',
  });

  it('stamps the marker pair on the root, in order', () => {
    const { root } = renderItem();

    expect(avatarGroupItemClassNames.root).toBe('fui-avatar-group-item group/fui-avatar-group-item');
    expect(root).toHaveClass('fui-avatar-group-item');
    expect(root).toHaveClass('group/fui-avatar-group-item');
    expect(root.classList[0]).toBe('fui-avatar-group-item');
    expect(root.classList[1]).toBe('group/fui-avatar-group-item');
  });

  it('reads size off the group context and reaches both the root and the avatar', () => {
    const { root, coin } = renderItem({ size: 72 });

    expect(root.getAttribute('data-size')).toBe('72');
    expect(coin.getAttribute('data-size')).toBe('72');
  });

  describe('the avatar slot', () => {
    it('renders the windmod Avatar rather than the headless one', () => {
      // The swap is only real when the slot's elementType changes too — a `components` swap is
      // read at render by assertSlots alone, inside a development-only guard.
      expect(renderItem().coin).not.toBeNull();
    });

    it('renders the windmod Avatar in production mode, where assertSlots does not run', () => {
      const previous = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      try {
        expect(renderItem().coin).not.toBeNull();
      } finally {
        process.env.NODE_ENV = previous;
      }
    });

    it('warns nothing in development, so the components map and the element type agree', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

      renderItem();

      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });

    it('defaults color to colorful, hashing distinct names to distinct classes', () => {
      const ada = renderItem({}, { name: 'Ada Lovelace' }).coin.className;
      const grace = renderItem({}, { name: 'Grace Hopper' }).coin.className;

      expect(ada).not.toBe(grace);
    });

    it('lets an explicit color win over the colorful default', () => {
      const brand = renderItem({}, { color: 'brand' }).coin.className;
      const colorful = renderItem({}, { name: 'Ada Lovelace' }).coin.className;

      expect(brand).not.toBe(colorful);
    });

    it('seeds the colorful hash from idForColor when supplied', () => {
      const seeded = renderItem({}, { name: 'Ada Lovelace', idForColor: 'Grace Hopper' }).coin.className;
      const byName = renderItem({}, { name: 'Grace Hopper' }).coin.className;

      expect(seeded).toBe(byName);
    });
  });

  describe('the overflow form', () => {
    it('renders an li carrying the name label', () => {
      const root = renderOverflowItem();

      expect(root.tagName).toBe('LI');
      expect(root.classList).toContain(styles.overflowItem);
      expect(root.querySelector(`.${styles.overflowLabel}`)?.textContent).toBe('Ada Lovelace');
    });

    it('renders a div without the label when inline', () => {
      const { root } = renderItem();

      expect(root.tagName).toBe('DIV');
      expect(root.classList).toContain(styles.nonOverflowItem);
      expect(root.querySelector(`.${styles.overflowLabel}`)).toBeNull();
    });
  });

  describe('the stack ladders', () => {
    it.each([
      [48, styles.stackThick],
      [56, styles.stackThicker],
      [64, styles.stackThicker],
      [72, styles.stackThickest],
    ] as const)('picks the ring for size %s', (size, expected) => {
      expect(renderItem({ layout: 'stack', size }).root.classList).toContain(expected);
    });

    it.each([
      [20, styles.stackGapXxs],
      [24, styles.stackGapXs],
      [48, styles.stackGapS],
      [96, styles.stackGapL],
    ] as const)('picks the gap for size %s', (size, expected) => {
      expect(renderItem({ layout: 'stack', size }).root.classList).toContain(expected);
    });
  });

  describe('the spread ladder', () => {
    it.each([
      [16, styles.spreadGapS],
      [20, styles.spreadGapMNudge],
      [24, styles.spreadGapMNudge],
      [32, styles.spreadGapL],
      [64, styles.spreadGapXl],
    ] as const)('picks the gap for size %s', (size, expected) => {
      expect(renderItem({ layout: 'spread', size }).root.classList).toContain(expected);
    });
  });

  describe('the pie layout', () => {
    it.each([
      [48, styles.pieDividerThick],
      [56, styles.pieDividerThicker],
      [72, styles.pieDividerThickest],
    ] as const)('picks the divider width for size %s', (size, expected) => {
      expect(renderItem({ layout: 'pie', size }).root.classList).toContain(expected);
    });

    it('applies the slice geometry and the pie avatar class', () => {
      const { root, coin } = renderItem({ layout: 'pie' });

      expect(root.classList).toContain(styles.pieSlices);
      expect(root.classList).toContain(styles.pie);
      expect(coin.classList).toContain(styles.avatarPie);
    });

    it('takes no gap class from the shared ladder', () => {
      const { root } = renderItem({ layout: 'pie', size: 32 });

      expect(root.classList).not.toContain(styles.spreadGapL);
      expect(root.classList).not.toContain(styles.stackGapXs);
    });
  });

  it('warns exactly once when rendered outside a group', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(<AvatarGroupItem name="Ada Lovelace" />);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith('AvatarGroupItem must only be used inside an AvatarGroup component.');
    warn.mockRestore();
  });
});
