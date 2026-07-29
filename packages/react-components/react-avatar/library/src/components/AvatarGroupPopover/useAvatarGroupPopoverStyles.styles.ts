'use client';

import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useGroupChildClassName } from '../AvatarGroupItem/useAvatarGroupItemStyles.styles';
import { useSizeStyles } from '../Avatar/useAvatarStyles.styles';
import type { AvatarGroupPopoverState } from './AvatarGroupPopover.types';

/**
 * AvatarGroupPopover's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. The `fui-AvatarGroupPopover__<slot>` BEM
 * statics are gone (D16.1), and the type has narrowed from
 * `SlotClassNames<AvatarGroupPopoverSlots>` to `{ root: string }` so that a read of
 * `content`, `popoverSurface`, `tooltip` or `triggerButton` is a compile error on the exact
 * line that would otherwise have silently stopped matching.
 *
 * CAVEAT — `root` is not rendered, and was not rendered before D16 either. This component's
 * `root` slot is a `<Popover>`, which emits no DOM element of its own, so the old
 * `fui-AvatarGroupPopover` static never reached the DOM (its own conformance options said so
 * in as many words: _"root shouldn't be expected since the root is a Popover"_). D16.5
 * re-points `root` to the component's marker everywhere; this hook is still Griffel and so
 * stamps no marker yet (D15.1, unconverted siblings). The value below is therefore the name
 * the marker WILL take when the hook converts — until then `root` selects nothing, exactly as
 * it did before this phase.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + avatarGroupPopoverClassNames.root` is invalid CSS. Use
 * `fuiSelector(avatarGroupPopoverClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const avatarGroupPopoverClassNames: { root: string } = {
  root: 'group/fui-avatar-group-popover',
};

/**
 * Styles for the content slot.
 */
const useContentStyles = makeStyles({
  base: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
  },
});

/**
 * Styles for the popoverSurface slot.
 */
const usePopoverSurfaceStyles = makeStyles({
  base: {
    maxHeight: '220px',
    minHeight: '80px',
    overflow: 'hidden scroll',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    width: '220px',
  },
});

/**
 * Styles for the triggerButton slot.
 */
const useTriggerButtonStyles = makeStyles({
  base: {
    display: 'inline-flex',
    position: 'relative',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    borderRadius: tokens.borderRadiusCircular,
    ...shorthands.borderStyle('solid'),
    padding: '0',

    // Match color to Avatar's outline color.
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('CanvasText'),
    },
  },

  pie: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    color: 'transparent',
  },

  focusIndicator: createCustomFocusIndicatorStyle({
    border: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
    outlineStyle: 'none',
  }),

  states: {
    '&:hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    },
    '&:active': {
      color: tokens.colorNeutralForeground1Pressed,
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
    },
  },

  selected: {
    color: tokens.colorNeutralForeground1Selected,
    backgroundColor: tokens.colorNeutralBackground1Selected,
    ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
  },

  icon12: { fontSize: '12px' },
  icon16: { fontSize: '16px' },
  icon20: { fontSize: '20px' },
  icon24: { fontSize: '24px' },
  icon28: { fontSize: '28px' },
  icon32: { fontSize: '32px' },
  icon48: { fontSize: '48px' },
  caption2Strong: { ...typographyStyles.caption2Strong },
  caption1Strong: { ...typographyStyles.caption1Strong },
  body1Strong: { ...typographyStyles.body1Strong },
  subtitle2: { ...typographyStyles.subtitle2 },
  subtitle1: { ...typographyStyles.subtitle1 },
  title3: { ...typographyStyles.title3 },
  borderThin: { ...shorthands.borderWidth(tokens.strokeWidthThin) },
  borderThick: { ...shorthands.borderWidth(tokens.strokeWidthThick) },
  borderThicker: { ...shorthands.borderWidth(tokens.strokeWidthThicker) },
  borderThickest: { ...shorthands.borderWidth(tokens.strokeWidthThickest) },
});

/**
 * Apply styling to the AvatarGroupPopover slots based on the state
 */
export const useAvatarGroupPopoverStyles_unstable = (state: AvatarGroupPopoverState): AvatarGroupPopoverState => {
  const { indicator, size, layout, popoverOpen } = state;
  const sizeStyles = useSizeStyles();
  const triggerButtonStyles = useTriggerButtonStyles();
  const contentStyles = useContentStyles();
  const popoverSurfaceStyles = usePopoverSurfaceStyles();
  const groupChildClassName = useGroupChildClassName(layout, size);

  const triggerButtonClasses = [];

  if (size < 36) {
    triggerButtonClasses.push(triggerButtonStyles.borderThin);
  } else if (size < 56) {
    triggerButtonClasses.push(triggerButtonStyles.borderThick);
  } else if (size < 72) {
    triggerButtonClasses.push(triggerButtonStyles.borderThicker);
  } else {
    triggerButtonClasses.push(triggerButtonStyles.borderThickest);
  }

  if (indicator === 'count') {
    if (size <= 24) {
      triggerButtonClasses.push(triggerButtonStyles.caption2Strong);
    } else if (size <= 28) {
      triggerButtonClasses.push(triggerButtonStyles.caption1Strong);
    } else if (size <= 40) {
      triggerButtonClasses.push(triggerButtonStyles.body1Strong);
    } else if (size <= 56) {
      triggerButtonClasses.push(triggerButtonStyles.subtitle2);
    } else if (size <= 96) {
      triggerButtonClasses.push(triggerButtonStyles.subtitle1);
    } else {
      triggerButtonClasses.push(triggerButtonStyles.title3);
    }
  } else {
    if (size <= 16) {
      triggerButtonClasses.push(triggerButtonStyles.icon12);
    } else if (size <= 24) {
      triggerButtonClasses.push(triggerButtonStyles.icon16);
    } else if (size <= 40) {
      triggerButtonClasses.push(triggerButtonStyles.icon20);
    } else if (size <= 48) {
      triggerButtonClasses.push(triggerButtonStyles.icon24);
    } else if (size <= 56) {
      triggerButtonClasses.push(triggerButtonStyles.icon28);
    } else if (size <= 72) {
      triggerButtonClasses.push(triggerButtonStyles.icon32);
    } else {
      triggerButtonClasses.push(triggerButtonStyles.icon48);
    }
  }

  // eslint-disable-next-line react-hooks/immutability
  state.triggerButton.className = mergeClasses(
    groupChildClassName,
    sizeStyles[size],
    triggerButtonStyles.base,
    layout === 'pie' && triggerButtonStyles.pie,
    triggerButtonStyles.focusIndicator,
    layout !== 'pie' && triggerButtonStyles.states,
    layout !== 'pie' && popoverOpen && triggerButtonStyles.selected,
    ...triggerButtonClasses,
    state.triggerButton.className,
  );

  // eslint-disable-next-line react-hooks/immutability
  state.content.className = mergeClasses(contentStyles.base, state.content.className);

  // eslint-disable-next-line react-hooks/immutability
  state.popoverSurface.className = mergeClasses(popoverSurfaceStyles.base, state.popoverSurface.className);

  return state;
};
