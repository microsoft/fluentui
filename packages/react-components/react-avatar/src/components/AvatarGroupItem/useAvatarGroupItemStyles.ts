import { useSizeStyles } from '../../Avatar';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { AvatarSizes } from '../../Avatar';
import type { AvatarGroupProps } from '../../AvatarGroup';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  avatar: 'fui-AvatarGroupItem__avatar',
  overflowLabel: 'fui-AvatarGroupItem__overflowLabel',
};

const avatarGroupItemDividerWidthVar = '--fuiAvatarGroupItem__divier--width';

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
  overflowItem: {
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
  },
  nonOverflowItem: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
});

/**
 * Styles for the avatar slot
 */
const useAvatarStyles = makeStyles({
  nonOverflowItem: {
    position: 'absolute',
  },
  pie: {
    ...shorthands.borderRadius(0),
  },
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
 * Styles for the pie layout
 */
const usePieStyles = makeStyles({
  base: {
    position: 'absolute',
  },
  twoSlices: {
    '&:first-child': {
      clipPath: `inset(0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)) 0 25%)`,
      left: '-25%',
    },
    '&:nth-child(2)': {
      clipPath: `inset(0 25% 0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)))`,
      left: '25%',
    },
  },
  threeSlices: {
    '&:first-child': {
      clipPath: `inset(0 calc(25% + (var(${avatarGroupItemDividerWidthVar}) / 2)) 0 25%)`,
      left: '-25%',
    },
    '&:not(:first-child)': {
      // Since the two AvatarGroupItems on the right are scaled by 0.5, the divider width should not be halved.
      clipPath: `inset(0 0 var(${avatarGroupItemDividerWidthVar}) var(${avatarGroupItemDividerWidthVar}))`,
      left: '50%',
      transform: 'scale(0.5)',
      transformOrigin: '0 0',
    },
    '&:nth-child(3)': {
      clipPath: `inset(var(${avatarGroupItemDividerWidthVar}) 0 0 var(${avatarGroupItemDividerWidthVar}))`,
      top: '50%',
    },
  },
  thick: { [avatarGroupItemDividerWidthVar]: tokens.strokeWidthThick },
  thicker: { [avatarGroupItemDividerWidthVar]: tokens.strokeWidthThicker },
  thickest: { [avatarGroupItemDividerWidthVar]: tokens.strokeWidthThickest },
});

const useStackStyles = makeStyles({
  base: {
    '&::after': {
      content: "''",
      position: 'absolute',
      display: 'inline-flex',
      // Border is used instead of outline due to a bug in webkit browsers where border-radius is ignored in outline.
      ...shorthands.borderColor(tokens.colorNeutralBackground2),
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      ...shorthands.borderStyle('solid'),

      '@media (forced-colors: active)': {
        forcedColorAdjust: 'none',
      },
    },
  },
  overflowButton: {
    // border-color has to be set to transparent when there's focus due to the outline overlapping the focus ring.
    '&:focus': {
      '&::after': {
        ...shorthands.borderColor('transparent'),
      },
    },
    // hide inner border when using high contrast mode and use the outer (::after) to match Avatar's outline
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('Canvas'),
    },
  },
  thick: {
    '&::after': {
      width: '100%',
      height: '100%',
      left: `calc(-1 * ${tokens.strokeWidthThick})`,
      top: `calc(-1 * ${tokens.strokeWidthThick})`,
      ...shorthands.borderWidth(tokens.strokeWidthThick),
    },
  },
  thicker: {
    '&::after': {
      width: '100%',
      height: '100%',
      left: `calc(-1 * ${tokens.strokeWidthThicker})`,
      top: `calc(-1 * ${tokens.strokeWidthThicker})`,
      ...shorthands.borderWidth(tokens.strokeWidthThicker),
    },
  },
  thickest: {
    '&::after': {
      width: '100%',
      height: '100%',
      left: `calc(-1 * ${tokens.strokeWidthThickest})`,
      top: `calc(-1 * ${tokens.strokeWidthThickest})`,
      ...shorthands.borderWidth(tokens.strokeWidthThickest),
    },
  },
  borderThin: {
    '&::after': {
      width: `calc(100% + ${tokens.strokeWidthThin} * 2)`,
      height: `calc(100% + ${tokens.strokeWidthThin} * 2)`,
      left: `calc(-1 * (${tokens.strokeWidthThick} + ${tokens.strokeWidthThin}))`,
      top: `calc(-1 * (${tokens.strokeWidthThick} + ${tokens.strokeWidthThin}))`,
    },
  },
  borderThick: {
    '&::after': {
      width: `calc(100% + ${tokens.strokeWidthThick} * 2)`,
      height: `calc(100% + ${tokens.strokeWidthThick} * 2)`,
      left: `calc(-1 * ${tokens.strokeWidthThick} * 2)`,
      top: `calc(-1 * ${tokens.strokeWidthThick} * 2)`,
    },
  },
  borderThicker: {
    '&::after': {
      width: `calc(100% + ${tokens.strokeWidthThicker} * 2)`,
      height: `calc(100% + ${tokens.strokeWidthThicker} * 2)`,
      left: `calc(-1 * ${tokens.strokeWidthThicker} * 2)`,
      top: `calc(-1 * ${tokens.strokeWidthThicker} * 2)`,
    },
  },
  borderThickest: {
    '&::after': {
      width: `calc(100% + ${tokens.strokeWidthThickest} * 2)`,
      height: `calc(100% + ${tokens.strokeWidthThickest} * 2)`,
      left: `calc(-1 * ${tokens.strokeWidthThickest} * 2)`,
      top: `calc(-1 * ${tokens.strokeWidthThickest} * 2)`,
    },
  },
  xxs: { '&:not(:first-child)': { marginLeft: `calc(-1 * ${tokens.spacingHorizontalXXS})` } },
  xs: { '&:not(:first-child)': { marginLeft: `calc(-1 * ${tokens.spacingHorizontalXS})` } },
  s: { '&:not(:first-child)': { marginLeft: `calc(-1 * ${tokens.spacingHorizontalS})` } },
  l: { '&:not(:first-child)': { marginLeft: `calc(-1 * ${tokens.spacingHorizontalL})` } },
});

const useSpreadStyles = makeStyles({
  s: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalS } },
  mNudge: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalMNudge } },
  m: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalM } },
  l: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalL } },
  xl: { '&:not(:first-child)': { marginLeft: tokens.spacingHorizontalXL } },
});

/**
 * Apply styling to the AvatarGroupItem slots based on the state
 */
export const useAvatarGroupItemStyles_unstable = (state: AvatarGroupItemState): AvatarGroupItemState => {
  const { nonOverflowAvatarsCount, isOverflowItem, layout, size } = state;

  const rootStyles = useRootStyles();
  const pieStyles = usePieStyles();
  const sizeStyles = useSizeStyles();
  const overflowLabelStyles = useOverflowLabelStyles();
  const avatarStyles = useAvatarStyles();

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

      if (nonOverflowAvatarsCount === 2) {
        rootClasses.push(pieStyles.twoSlices);
      } else if (nonOverflowAvatarsCount === 3) {
        rootClasses.push(pieStyles.threeSlices);
      }
    }
  } else {
    rootClasses.push(rootStyles.overflowItem);
  }

  state.root.className = mergeClasses(avatarGroupItemClassNames.root, ...rootClasses, state.root.className);

  state.avatar.className = mergeClasses(
    avatarGroupItemClassNames.avatar,
    !isOverflowItem && avatarStyles.nonOverflowItem,
    !isOverflowItem && layout === 'pie' && avatarStyles.pie,
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
export const useGroupChildClassName = (
  layout: AvatarGroupProps['layout'],
  size: AvatarSizes,
  isOverflowButton?: boolean,
): string => {
  const stackStyles = useStackStyles();
  const spreadStyles = useSpreadStyles();
  const layoutClasses = [];

  if (size) {
    if (layout === 'stack') {
      layoutClasses.push(stackStyles.base);

      if (size < 56) {
        layoutClasses.push(stackStyles.thick);
      } else if (size < 72) {
        layoutClasses.push(stackStyles.thicker);
      } else {
        layoutClasses.push(stackStyles.thickest);
      }

      // When the child is an overflowButton, we have to calculate the overflowButton's border + width + outline width
      // since the ::after pseudo-element doesn't take the overflowButton's border for its size.
      if (isOverflowButton) {
        layoutClasses.push(stackStyles.overflowButton);

        if (size < 36) {
          layoutClasses.push(stackStyles.borderThin);
        } else if (size < 56) {
          layoutClasses.push(stackStyles.borderThick);
        } else if (size < 72) {
          layoutClasses.push(stackStyles.borderThicker);
        } else {
          layoutClasses.push(stackStyles.borderThickest);
        }
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
