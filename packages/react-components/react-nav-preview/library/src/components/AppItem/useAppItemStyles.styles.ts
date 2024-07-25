import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AppItemSlots, AppItemState } from './AppItem.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useIconStyles, useRootDefaultClassName } from '../sharedNavStyles.styles';

export const appItemClassNames: SlotClassNames<AppItemSlots> = {
  root: 'fui-AppItem',
  icon: 'fui-AppItem__icon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    marginInline: '4px',
    width: 'revert',
    alignItems: 'center',
    gap: '10px',
    marginInlineStart: '-6px',
    marginInlineEnd: '0px',
    ...typographyStyles.subtitle2,
  },
  small: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalXS} 14px`,
    gap: '14px',
  },
  absentIconRootAdjustment: {
    paddingInlineStart: '16px',
  },
});

/**
 * Apply styling to the AppItem slots based on the state
 */
export const useAppItemStyles_unstable = (state: AppItemState): AppItemState => {
  'use no memo';

  const rootDefaultClassName = useRootDefaultClassName();
  const iconStyles = useIconStyles();
  const appItemSpecificStyles = useStyles();

  const { size, isIconPresent } = state;

  state.root.className = mergeClasses(
    appItemClassNames.root,
    rootDefaultClassName,
    appItemSpecificStyles.root,
    size === 'small' && appItemSpecificStyles.small,
    !isIconPresent && appItemSpecificStyles.absentIconRootAdjustment,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(appItemClassNames.icon, iconStyles.base, state.icon.className);
  }

  return state;
};
