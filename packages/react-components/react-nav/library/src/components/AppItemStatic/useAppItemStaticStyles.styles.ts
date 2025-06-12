import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AppItemStaticSlots, AppItemStaticState } from './AppItemStatic.types';
import { useAppItemStyles } from '../AppItem/useAppItemStyles.styles';
import { useIconStyles, useRootDefaultClassName } from '../sharedNavStyles.styles';

export const appItemStaticClassNames: SlotClassNames<AppItemStaticSlots> = {
  root: 'fui-AppItemStatic',
  icon: 'fui-AppItemStatic__icon',
};

const useAppItemStaticStyles = makeStyles({
  root: {
    cursor: 'default',
    ':hover': {
      backgroundColor: 'unset',
    },
    ':active': {
      backgroundColor: 'unset',
    },
  },
});

/**
 * Apply styling to the AppItemStatic slots based on the state
 */
export const useAppItemStaticStyles_unstable = (state: AppItemStaticState): AppItemStaticState => {
  'use no memo';

  const rootDefaultClassName = useRootDefaultClassName();
  const iconStyles = useIconStyles();
  const appItemSpecificStyles = useAppItemStyles();
  const appItemStaticStyles = useAppItemStaticStyles();

  const { density, icon } = state;

  state.root.className = mergeClasses(
    rootDefaultClassName,
    appItemStaticClassNames.root,
    appItemSpecificStyles.root,
    appItemStaticStyles.root,
    density === 'small' && appItemSpecificStyles.small,
    !icon && appItemSpecificStyles.absentIconRootAdjustment,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(appItemStaticClassNames.icon, iconStyles.base, state.icon.className);
  }

  return state;
};
