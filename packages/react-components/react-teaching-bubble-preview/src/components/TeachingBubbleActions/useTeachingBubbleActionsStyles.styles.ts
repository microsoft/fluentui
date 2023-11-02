import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingBubbleActionsSlots, TeachingBubbleActionsState } from './TeachingBubbleActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTeachingBubbleContext_unstable } from '../../teachingBubbleContext';

export const TeachingBubbleActionsClassNames: SlotClassNames<TeachingBubbleActionsSlots> = {
  root: 'fui-TeachingBubbleActions',
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
export const useTeachingBubbleActionsStyles_unstable = (state: TeachingBubbleActionsState) => {
  const styles = useStyles();

  const totalPages = useTeachingBubbleContext_unstable(context => context.totalPages);
  const actionButtonStyles = totalPages > 1 ? styles.rootCarousel : styles.rootPage;

  state.root.className = mergeClasses(
    TeachingBubbleActionsClassNames.root,
    styles.root,
    actionButtonStyles,
    state.root.className,
  );

  return state;
};
