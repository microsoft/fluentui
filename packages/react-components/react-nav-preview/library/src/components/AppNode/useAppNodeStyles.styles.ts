import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AppNodeSlots, AppNodeState } from './AppNode.types';
import { useRootDefaultClassName } from '../sharedNavStyles.styles';
import { typographyStyles } from '@fluentui/react-theme';

export const appNodeClassNames: SlotClassNames<AppNodeSlots> = {
  root: 'fui-AppNode',
  icon: 'fui-AppNode__icon',
};

/**
 * Styles for the root slot
 */
const useAppNodeSpecificStyles = makeStyles({
  root: {
    ...typographyStyles.subtitle2,
    gap: '12px',
    paddingInlineStart: '3px',
    alignItems: 'center',
    ':hover': {
      backgroundColor: 'unset',
    },
    ':active': {
      backgroundColor: 'unset',
    },
  },
  icon: {
    height: '32px',
    width: '32px',
  },
  smallRoot: {
    paddingBlock: 'unset',
  },
});

/**
 * Apply styling to the AppNode slots based on the state
 */
export const useAppNodeStyles_unstable = (state: AppNodeState): AppNodeState => {
  'use no memo';

  const styles = useAppNodeSpecificStyles();

  const rootDefaultClassName = useRootDefaultClassName();

  state.root.className = mergeClasses(
    appNodeClassNames.root,
    rootDefaultClassName,
    styles.root,
    state.size === 'small' && styles.smallRoot,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(appNodeClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
