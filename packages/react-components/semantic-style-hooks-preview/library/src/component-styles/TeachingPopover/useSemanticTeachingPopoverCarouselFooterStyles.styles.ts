import { makeStyles, mergeClasses } from '@griffel/react';
import {
  teachingPopoverCarouselFooterClassNames,
  type TeachingPopoverCarouselFooterState,
} from '@fluentui/react-teaching-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

// Todo: Page change animation & styles
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  rootCentered: {
    justifyContent: 'space-between',
    gap: '8px',
  },
  rootRightAligned: {
    gap: '8px',
    '& :first-child': {
      marginInlineEnd: 'auto',
    },
  },
});

/** Applies style classnames to slots */
export const useSemanticTeachingPopoverCarouselFooterStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as TeachingPopoverCarouselFooterState;

  const styles = useStyles();
  const { layout } = state;

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverCarouselFooterClassNames.root,
    styles.root,
    layout === 'centered' ? styles.rootCentered : styles.rootRightAligned,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.previous) {
    state.previous.className = mergeClasses(
      state.previous.className,
      teachingPopoverCarouselFooterClassNames.previous,
      getSlotClassNameProp_unstable(state.previous),
    );
  }

  state.next.className = mergeClasses(
    state.next.className,
    teachingPopoverCarouselFooterClassNames.next,
    getSlotClassNameProp_unstable(state.next),
  );

  return state;
};
