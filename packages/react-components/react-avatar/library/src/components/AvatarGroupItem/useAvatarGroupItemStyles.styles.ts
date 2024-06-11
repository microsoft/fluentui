import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useSizeStyles } from '../../Avatar';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import type { AvatarGroupProps } from '../../AvatarGroup';
import type { AvatarSize } from '../../Avatar';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  avatar: 'fui-AvatarGroupItem__avatar',
  overflowLabel: 'fui-AvatarGroupItem__overflowLabel',
};

const avatarGroupItemDividerWidthVar = '--fuiAvatarGroupItem__divider--width';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    flexShrink: 0,
    position: 'relative',
  },
  overflowItem: { padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}` },
  nonOverflowItem: { borderRadius: tokens.borderRadiusCircular },
});

/**
 * Styles for the avatar slot
 */
const useAvatarStyles = makeStyles({
  nonOverflowItem: {
    position: 'absolute',
  },
  pie: { borderRadius: '0' },
});

/**
 * Styles for the label slot
 */
const useOverflowLabelStyles = makeStyles({
  base: {
    marginLeft: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground1,
    ...typographyStyles.body1,
  },
});

/**
 * Styles for the stack layout
 */
const useStackStyles = makeStyles({
  thick: {
    boxShadow: `0 0 0 ${tokens.strokeWidthThick} ${tokens.colorNeutralBackground2}`,
  },
  thicker: {
    boxShadow: `0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorNeutralBackground2}`,
  },
  thickest: {
    boxShadow: `0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorNeutralBackground2}`,
  },
  xxs: { '&:not(:first-child)': { marginLeft: `calc(-1 * ${tokens.spacingHorizontalXXS})` } },
  xs: { '&:not(:first-child)': { marginLeft: `calc(-1 * ${tokens.spacingHorizontalXS})` } },
  s: { '&:not(:first-child)': { marginLeft: `calc(-1 * ${tokens.spacingHorizontalS})` } },
  l: { '&:not(:first-child)': { marginLeft: `calc(-1 * ${tokens.spacingHorizontalL})` } },
});

/**
 * Styles for the spread layout
 */
const useSpreadStyles = makeStyles({
  s: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalS } },
  mNudge: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalMNudge } },
  m: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalM } },
  l: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalL } },
  xl: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalXL } },
});

/**
 * Styles for the pie layout
 */
const usePieStyles = makeStyles({
  base: {
    position: 'absolute',
  },
  slices: {
    // Two slices
    // 1st of 2 items
    '&:nth-of-type(1):nth-last-of-type(2)': {
      clipPath: `inset(0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)) 0 25%)`,
      left: '-25%',
    },
    // 2nd of 2 items
    '&:nth-of-type(2):nth-last-of-type(1)': {
      clipPath: `inset(0 25% 0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)))`,
      left: '25%',
    },

    // Three slices
    // 1st of 3 items
    '&:nth-of-type(1):nth-last-of-type(3)': {
      clipPath: `inset(0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)) 0 25%)`,
      left: '-25%',
    },
    // 2nd of 3 items
    '&:nth-of-type(2):nth-last-of-type(2)': {
      // Since the two AvatarGroupItems on the right are scaled by 0.5, the divider width should not be halved.
      clipPath: `inset(0 0 var(${avatarGroupItemDividerWidthVar}) var(${avatarGroupItemDividerWidthVar}))`,
      left: '50%',
      transform: 'scale(0.5)',
      transformOrigin: '0 0',
    },
    // 3rd of 3 items
    '&:nth-of-type(3):nth-last-of-type(1)': {
      clipPath: `inset(var(${avatarGroupItemDividerWidthVar}) 0 0 var(${avatarGroupItemDividerWidthVar}))`,
      left: '50%',
      top: '50%',
      transform: 'scale(0.5)',
      transformOrigin: '0 0',
    },
  },
  rtlSlices: {
    // Two slices
    // 1st of 2 items
    '&:nth-of-type(1):nth-last-of-type(2)': {
      clipPath: `inset(0 25% 0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)))`,
    },
    // 2nd of 2 items
    '&:nth-of-type(2):nth-last-of-type(1)': {
      clipPath: `inset(0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)) 0 25%)`,
    },

    // Three slices
    // 1st of 3 items
    '&:nth-of-type(1):nth-last-of-type(3)': {
      clipPath: `inset(0 25% 0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)))`,
    },
    // 2nd of 3 items
    '&:nth-of-type(2):nth-last-of-type(2)': {
      clipPath: `inset(0 var(${avatarGroupItemDividerWidthVar}) var(${avatarGroupItemDividerWidthVar}) 0)`,
      left: '0',
    },
    // 3rd of 3 items
    '&:nth-of-type(3):nth-last-of-type(1)': {
      clipPath: `inset(var(${avatarGroupItemDividerWidthVar}) var(${avatarGroupItemDividerWidthVar}) 0 0)`,
      left: '0',
    },
  },
  thick: { [avatarGroupItemDividerWidthVar]: tokens.strokeWidthThick },
  thicker: { [avatarGroupItemDividerWidthVar]: tokens.strokeWidthThicker },
  thickest: { [avatarGroupItemDividerWidthVar]: tokens.strokeWidthThickest },
});

/**
 * Apply styling to the AvatarGroupItem slots based on the state
 */
export const useAvatarGroupItemStyles_unstable = (state: AvatarGroupItemState): AvatarGroupItemState => {
  'use no memo';

  const { isOverflowItem, layout, size } = state;
  const { dir } = useFluent();

  const avatarStyles = useAvatarStyles();
  const overflowLabelStyles = useOverflowLabelStyles();
  const pieStyles = usePieStyles();
  const rootStyles = useRootStyles();
  const sizeStyles = useSizeStyles();

  const groupChildClassName = useGroupChildClassName(layout, size);

  const rootClasses = [rootStyles.base];

  if (!isOverflowItem) {
    rootClasses.push(rootStyles.nonOverflowItem);
    rootClasses.push(groupChildClassName);
    rootClasses.push(sizeStyles[size]);

    if (layout === 'pie') {
      rootClasses.push(pieStyles.base);

      if (size < 56) {
        rootClasses.push(pieStyles.thick);
      } else if (size < 72) {
        rootClasses.push(pieStyles.thicker);
      } else {
        rootClasses.push(pieStyles.thickest);
      }

      rootClasses.push(pieStyles.slices);

      if (dir === 'rtl') {
        rootClasses.push(pieStyles.rtlSlices);
      }
    }
  } else {
    rootClasses.push(rootStyles.overflowItem);
  }

  state.root.className = mergeClasses(avatarGroupItemClassNames.root, ...rootClasses, state.root.className);

  state.avatar.className = mergeClasses(
    avatarGroupItemClassNames.avatar,
    !isOverflowItem && avatarStyles.nonOverflowItem,
    layout === 'pie' && avatarStyles.pie,
    state.avatar.className,
  );

  if (state.overflowLabel) {
    state.overflowLabel.className = mergeClasses(
      avatarGroupItemClassNames.overflowLabel,
      overflowLabelStyles.base,
      state.overflowLabel.className,
    );
  }

  return state;
};

/**
 * Hook for getting the className for the children of AvatarGroup. This hook will provide the spacing and outlines
 * needed for each layout.
 */
export const useGroupChildClassName = (layout: AvatarGroupProps['layout'], size: AvatarSize): string => {
  const stackStyles = useStackStyles();
  const spreadStyles = useSpreadStyles();
  const layoutClasses = [];

  if (size) {
    if (layout === 'stack') {
      if (size < 56) {
        layoutClasses.push(stackStyles.thick);
      } else if (size < 72) {
        layoutClasses.push(stackStyles.thicker);
      } else {
        layoutClasses.push(stackStyles.thickest);
      }

      if (size < 24) {
        layoutClasses.push(stackStyles.xxs);
      } else if (size < 48) {
        layoutClasses.push(stackStyles.xs);
      } else if (size < 96) {
        layoutClasses.push(stackStyles.s);
      } else {
        layoutClasses.push(stackStyles.l);
      }
    } else if (layout === 'spread') {
      if (size < 20) {
        layoutClasses.push(spreadStyles.s);
      } else if (size < 32) {
        layoutClasses.push(spreadStyles.mNudge);
      } else if (size < 64) {
        layoutClasses.push(spreadStyles.l);
      } else {
        layoutClasses.push(spreadStyles.xl);
      }
    }
  }

  return mergeClasses(...layoutClasses);
};
