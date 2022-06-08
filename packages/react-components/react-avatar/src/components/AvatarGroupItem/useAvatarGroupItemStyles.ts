import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { AvatarGroupProps } from '../../AvatarGroup';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import type { AvatarSizes } from '../../Avatar';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  avatar: 'fui-AvatarGroupItem__avatar',
  overflowLabel: 'fui-AvatarGroupItem__overflowLabel',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
  },
  overflowItem: {
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingVerticalXS),
  },
  nonOverflowItem: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
});

/**
 * Styles for the label slot
 */
const useOverflowLabelStyles = makeStyles({
  overflowItem: {
    marginLeft: tokens.spacingHorizontalS,
  },
});

const useStackStyles = makeStyles({
  base: {
    outlineColor: tokens.colorNeutralBackground2,
    outlineStyle: 'solid',
  },
  thick: { outlineWidth: tokens.strokeWidthThick },
  thicker: { outlineWidth: tokens.strokeWidthThicker },
  thickest: { outlineWidth: tokens.strokeWidthThickest },
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
  const layout = useContextSelector(AvatarGroupContext, ctx => ctx.layout);
  const { isOverflowItem, size } = state;

  const rootStyles = useRootStyles();
  const overflowLabelStyles = useOverflowLabelStyles();

  const groupChildClassName = useGroupChildClassName(layout, size);

  state.root.className = mergeClasses(
    avatarGroupItemClassNames.root,
    rootStyles.base,
    isOverflowItem ? rootStyles.overflowItem : rootStyles.nonOverflowItem,
    !isOverflowItem && groupChildClassName,
    state.root.className,
  );

  state.avatar.className = mergeClasses(avatarGroupItemClassNames.avatar, state.avatar.className);

  if (state.overflowLabel) {
    state.overflowLabel.className = mergeClasses(
      avatarGroupItemClassNames.overflowLabel,
      isOverflowItem && overflowLabelStyles.overflowItem,
      state.overflowLabel.className,
    );
  }

  return state;
};

/**
 * Hook for getting the className for the children of AvatarGroup. This hook will provide the spacing and outlines
 * needed for each layout.
 */
export const useGroupChildClassName = (layout: AvatarGroupProps['layout'], size: AvatarSizes): string => {
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
