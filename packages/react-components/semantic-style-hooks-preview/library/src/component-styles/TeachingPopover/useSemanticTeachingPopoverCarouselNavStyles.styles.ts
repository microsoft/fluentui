import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
  teachingPopoverCarouselNavClassNames,
  type TeachingPopoverCarouselNavState,
} from '@fluentui/react-teaching-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: semanticTokens.gapInsideCtrlSmDefault,
    alignItems: 'center',
    justifyContent: 'center',
    ...createCustomFocusIndicatorStyle({
      outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusInnerStroke}`,
      borderRadius: semanticTokens.cornerCtrlRest,
      ...shorthands.borderColor(semanticTokens.nullColor),
    }),
  },
});

/** Applies style classnames to slots */
export const useSemanticTeachingPopoverCarouselNavStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as TeachingPopoverCarouselNavState;

  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverCarouselNavClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
