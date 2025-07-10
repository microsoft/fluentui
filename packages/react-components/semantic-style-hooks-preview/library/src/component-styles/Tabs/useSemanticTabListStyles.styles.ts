import { makeStyles, mergeClasses } from '@griffel/react';
import { tabListClassNames, type TabListState } from '@fluentui/react-tabs';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    flexWrap: 'nowrap',
    position: 'relative',
  },
  horizontal: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  vertical: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  roundedSmall: {
    gap: semanticTokens.gapInsideCtrlLgDefault,
  },
  rounded: {
    gap: semanticTokens.gapInsideCtrlDefault,
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useSemanticTabListStyles = (_state: unknown): TabListState => {
  'use no memo';

  const state = _state as TabListState;
  const { appearance, vertical, size } = state;

  const styles = useStyles();

  const isRounded = appearance === 'subtle-circular' || appearance === 'filled-circular';

  state.root.className = mergeClasses(
    state.root.className,
    tabListClassNames.root,
    styles.root,
    vertical ? styles.vertical : styles.horizontal,
    isRounded && (size === 'small' ? styles.roundedSmall : styles.rounded),
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
