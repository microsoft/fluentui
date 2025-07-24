import { makeStyles, mergeClasses } from '@griffel/react';
import { teachingPopoverCarouselClassNames, type TeachingPopoverCarouselState } from '@fluentui/react-teaching-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

// Todo: Page change animation & styles
const useStyles = makeStyles({
  root: {},
});

/** Applies style classnames to slots */
export const useSemanticTeachingPopoverCarouselStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as TeachingPopoverCarouselState;

  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverCarouselClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
