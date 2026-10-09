import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { AvatarGroup } from '../AvatarGroup';
import type { AvatarGroupProps } from '../AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem';
import itemStyles from '../AvatarGroupItem/AvatarGroupItem.module.css';
import tooltipStyles from '../Tooltip/Tooltip.module.css';
import { AvatarGroupPopover } from './AvatarGroupPopover';
import { avatarGroupPopoverClassNames } from './useAvatarGroupPopoverStyles';

import styles from './AvatarGroupPopover.module.css';

// Frozen-state guard — see testing/freezeState.ts.
// The same mock records what AvatarGroupPopover hands the headless hook, which is where the resolved
// indicator and the materialised glyph land.
jest.mock('@fluentui/react-headless-components-preview/avatar-group', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/avatar-group');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useAvatarGroupPopover: (...args: Parameters<typeof actual.useAvatarGroupPopover>) => {
      hookProps.push(args[0] as HeadlessPopoverProps);

      return deepFreezeState(actual.useAvatarGroupPopover(...args));
    },
  };
});

type HeadlessPopoverProps = { indicator?: 'count' | 'icon'; triggerButton?: { children?: React.ReactNode } };
const hookProps: HeadlessPopoverProps[] = [];

beforeEach(() => {
  hookProps.length = 0;
});

type PopoverProps = React.ComponentProps<typeof AvatarGroupPopover>;

const members = ['Ada Lovelace', 'Grace Hopper'];

const renderPopover = (groupProps: AvatarGroupProps = {}, popoverProps: Partial<PopoverProps> = {}) => {
  const { container } = render(
    <AvatarGroup {...groupProps}>
      <AvatarGroupPopover {...popoverProps}>
        {members.map(name => (
          <AvatarGroupItem key={name} name={name} />
        ))}
      </AvatarGroupPopover>
    </AvatarGroup>,
  );

  return {
    container,
    trigger: container.querySelector<HTMLElement>('.fui-avatar-group-popover')!,
    surface: container.querySelector<HTMLElement>('[data-popover-surface]'),
  };
};

/** What AvatarGroupPopover handed the headless hook on its first render. */
const handedOver = () => hookProps[0];

describe('AvatarGroupPopover', () => {
  isConformant({
    Component: AvatarGroupPopover,
    displayName: 'AvatarGroupPopover',
    requiredProps: { children: <AvatarGroupItem name="Ada Lovelace" /> } as never,
    // AvatarGroupPopover renders no element of its own — the render's outermost node is the
    // headless Popover, which renders no DOM. The marker pair sits on the trigger button.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('stamps the marker pair on the trigger button, in order', () => {
    const { trigger } = renderPopover();

    expect(avatarGroupPopoverClassNames.triggerButton).toBe('fui-avatar-group-popover group/fui-avatar-group-popover');
    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger).toHaveClass('fui-avatar-group-popover');
    expect(trigger).toHaveClass('group/fui-avatar-group-popover');
    expect(trigger.classList[0]).toBe('fui-avatar-group-popover');
    expect(trigger.classList[1]).toBe('group/fui-avatar-group-popover');
  });

  it.each([16, 20, 24, 32] as const)('stamps data-size %s on the trigger button', size => {
    expect(renderPopover({ size }).trigger.getAttribute('data-size')).toBe(String(size));
  });

  describe('the size-keyed indicator default', () => {
    it.each([16, 20] as const)('resolves to the glyph below 24 (size %s)', size => {
      const { trigger } = renderPopover({ size });

      expect(handedOver().indicator).toBe('icon');
      expect(trigger.querySelector('svg[data-fui-icon]')).not.toBeNull();
      expect(trigger.textContent).toBe('');
    });

    it.each([24, 32] as const)('resolves to the count from 24 up (size %s)', size => {
      const { trigger } = renderPopover({ size });

      expect(handedOver().indicator).toBe('count');
      expect(trigger.textContent).toBe('+2');
      expect(trigger.querySelector('svg[data-fui-icon]')).toBeNull();
    });

    it('lets an explicit indicator override the default', () => {
      const { trigger } = renderPopover({ size: 72 }, { indicator: 'icon' });

      expect(trigger.querySelector('svg[data-fui-icon]')).not.toBeNull();
      expect(trigger.textContent).toBe('');
    });
  });

  describe('the default glyph', () => {
    it('never lets the headless ellipsis string reach the DOM', () => {
      // The headless hook assigns '...' when it finds the children nullish, so the glyph has to
      // be materialised before the hook rather than restored after it.
      const { trigger } = renderPopover({ size: 16 });

      expect(trigger.textContent).not.toContain('...');
      expect(trigger.childElementCount).toBe(1);
      expect(trigger.firstElementChild?.tagName.toLowerCase()).toBe('svg');
    });

    it('lets consumer children win', () => {
      const { trigger } = renderPopover({ size: 16 }, { triggerButton: { children: 'ZZZ' } });

      expect(trigger.textContent).toBe('ZZZ');
      expect(trigger.querySelector('svg[data-fui-icon]')).toBeNull();
    });

    it('renders an empty button under the pie layout', () => {
      const { trigger } = renderPopover({ layout: 'pie', size: 16 });

      expect(trigger.textContent).toBe('');
      expect(trigger.childElementCount).toBe(0);
      expect(trigger.classList).toContain(styles.triggerButtonPie);
    });

    it('leaves the count alone', () => {
      expect(renderPopover({ size: 32 }).trigger.querySelector('svg')).toBeNull();
    });
  });

  describe('the ladders', () => {
    it.each([
      [32, styles.borderThin],
      [36, styles.borderThick],
      [48, styles.borderThick],
      [56, styles.borderThicker],
      [72, styles.borderThickest],
    ] as const)('picks the border width for size %s', (size, expected) => {
      expect(renderPopover({ size }).trigger.classList).toContain(expected);
    });

    it.each([
      [24, styles.textCaption2Strong],
      [28, styles.textCaption1Strong],
      [40, styles.textBody1Strong],
      [56, styles.textSubtitle2],
      [96, styles.textSubtitle1],
      [120, styles.textTitle3],
    ] as const)('picks the count typography for size %s', (size, expected) => {
      expect(renderPopover({ size }).trigger.classList).toContain(expected);
    });

    it.each([
      [16, styles.icon12],
      [24, styles.icon16],
      [40, styles.icon20],
      [48, styles.icon24],
      [56, styles.icon28],
      [72, styles.icon32],
      [96, styles.icon48],
    ] as const)('picks the glyph size for size %s', (size, expected) => {
      expect(renderPopover({ size }, { indicator: 'icon' }).trigger.classList).toContain(expected);
    });

    it('takes the same group-child gap as a sibling item', () => {
      const { trigger } = renderPopover({ layout: 'stack', size: 32 });

      expect(trigger.classList).toContain(itemStyles.stackGapXs);
      expect(trigger.classList).toContain(itemStyles.stackThick);
    });
  });

  describe('the open surface', () => {
    it('renders the windmod PopoverSurface carrying the small look', () => {
      const { surface } = renderPopover({}, { open: true });

      expect(surface?.classList).toContain('fui-popover-surface');
      expect(surface?.getAttribute('data-size')).toBe('small');
      expect(surface?.classList).toContain(styles.popoverSurface);
    });

    it('renders the windmod PopoverSurface in production mode, where assertSlots does not run', () => {
      const previous = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      try {
        expect(renderPopover({}, { open: true }).surface?.classList).toContain('fui-popover-surface');
      } finally {
        process.env.NODE_ENV = previous;
      }
    });

    it('stamps data-selected on the trigger while open, and never under pie', () => {
      expect(renderPopover({}, { open: true }).trigger.hasAttribute('data-selected')).toBe(true);
      expect(renderPopover({}, { open: false }).trigger.hasAttribute('data-selected')).toBe(false);
      expect(renderPopover({ layout: 'pie' }, { open: true }).trigger.hasAttribute('data-selected')).toBe(false);
    });

    it('pins the overflowed items to their own size', () => {
      const { surface } = renderPopover({ size: 96 }, { open: true });

      expect(surface?.querySelector('.fui-avatar-group-item')?.getAttribute('data-size')).toBe('24');
    });

    it('carries the content class on the list', () => {
      const { surface } = renderPopover({}, { open: true });

      expect(surface?.querySelector('ul')?.classList).toContain(styles.content);
    });
  });

  describe('the tooltip slot', () => {
    // Compile-time guard: the props type is derived from windmod's own slots, so the tooltip
    // shorthand carries the look props the headless Tooltip omits. Aliasing the headless props
    // instead fails to compile at the `satisfies` below (TS2353), which no runtime assertion can
    // reach.
    it('accepts an appearance the headless tooltip slot type omits', () => {
      const popoverProps = {
        tooltip: { visible: true, content: 'View more people.', relationship: 'label', appearance: 'inverted' },
      } satisfies Partial<PopoverProps>;

      const { container } = renderPopover({}, popoverProps);

      expect(container.querySelector('.fui-tooltip')?.classList).toContain(tooltipStyles.inverted);
    });

    it('renders the windmod Tooltip', () => {
      const { container } = renderPopover(
        {},
        { tooltip: { visible: true, content: 'View more people.', relationship: 'label' } },
      );

      expect(container.querySelector('.fui-tooltip')).not.toBeNull();
    });

    it('renders the windmod Tooltip in production mode, where assertSlots does not run', () => {
      const previous = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      try {
        const { container } = renderPopover(
          {},
          { tooltip: { visible: true, content: 'View more people.', relationship: 'label' } },
        );

        expect(container.querySelector('.fui-tooltip')).not.toBeNull();
      } finally {
        process.env.NODE_ENV = previous;
      }
    });
  });

  it('warns nothing in development, so the components map and the element types agree', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    renderPopover({}, { open: true });

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('passes everything else through to the headless hook untouched', () => {
    const onOpenChange = jest.fn();

    renderPopover({}, { count: 7, openOnHover: true, onOpenChange });

    expect(handedOver()).toMatchObject({ count: 7, openOnHover: true, onOpenChange });
  });
});
