import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingPopoverActionsSlots, TeachingPopoverActionsState } from './TeachingPopoverActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverActionsClassNames: SlotClassNames<TeachingPopoverActionsSlots> = {
  root: 'fui-TeachingPopoverActions',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.borderRadius('4px'),
    ...shorthands.gap('8px'),
    paddingTop: '12px',
    justifyContent: 'flex-end',
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverActionsStyles_unstable = (state: TeachingPopoverActionsState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(teachingPopoverActionsClassNames.root, styles.root, state.root.className);

  return state;
};
