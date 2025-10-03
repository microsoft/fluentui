import { makeStyles, mergeClasses } from '@griffel/react';
import {
  teachingPopoverCarouselCardClassNames,
  type TeachingPopoverCarouselCardState,
} from '@fluentui/react-teaching-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {},
});

/** Applies style classnames to slots */
export const useSemanticTeachingPopoverCarouselCardStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as TeachingPopoverCarouselCardState;

  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverCarouselCardClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
