import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingPopoverActionsSlots, TeachingPopoverActionsState } from './TeachingPopoverActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';

export const teachingPopoverActionsClassNames: SlotClassNames<TeachingPopoverActionsSlots> = {
  root: 'fui-TeachingPopoverActions',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.borderRadius('4px'),
    columnGap: '8px',
    rowGap: '8px',
    paddingTop: '12px',
  },
  rootCarousel: {
    justifyContent: 'space-between',
  },
  rootPage: {
    justifyContent: 'flex-end',
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverActionsStyles_unstable = (state: TeachingPopoverActionsState) => {
  const styles = useStyles();

  const totalPages = useTeachingPopoverContext_unstable(context => context.totalPages);
  const actionButtonStyles = totalPages > 1 ? styles.rootCarousel : styles.rootPage;

  state.root.className = mergeClasses(
    teachingPopoverActionsClassNames.root,
    styles.root,
    actionButtonStyles,
    state.root.className,
  );

  return state;
};
